const config = require('../config')
const _room = require('../lib/room_')
const manage = require('./lib/manageItem')

const rooms = new Map();
let nextMediasoupWorkerIdx = 0;
let room;
let peers = {}

function consoleLog(data) {
    console.log(data);
}


function socketMain(io, _workers) {

    const connections = io.of('/video-broadcast');
    const MODE_STREAM = 'stream';
    const MODE_SHARE_SCREEN = 'share_screen';

    connections.on('connection', (socket) => {
        consoleLog('peer connected!');
        console.log("안녕하세요!", getId(socket))

        socket.on('disconnect', function () {
            //   close user connection
            console.log(
                'client disconnected. socket id=' +
                    getId(socket) +
                    '  , total clients=' +
                    getClientCount()
            );
            // 변경해야할 부분 1 - clear 변경 해야함
            cleanUpPeer(socket);
        });

        socket.on('getRouterRtpCapabilities', async (data, callback) => {
            const roomName = data.roomName;
            if (!rooms.has(roomName))
            {
                room = await getOrCreateRoom({roomName})
            }
            else{
                room = await rooms.get(roomName)
            }

            let peer = getPeer(socket, roomName, peerDetails)
            peers[socket.id] = peer
            /*
            peers[socket.id] = {
                socket,
                roomName,
                peerDetails : {
                    name : '',
                    isAdmin : false, // Not update NOw
                }
            }
            */
            rooms.get(roomName).peers = {
                ...rooms.get(roomName).peers,
                peer
            }

            let router1 = room.mediasoupRouter;

            if (router1) {
                consoleLog(
                    'getRouterRtpCapabilities: ',
                    router1.getRouterRtpCapabilities
                    //room.getRouterRtpCapabilities()
                );
                sendResponse(router1.rtpCapabilities, callback);
            } else {
                sendReject({ text: 'ERROR- router NOT READY' }, callback);
            }
        });

        // --- producer ----
        socket.on('createProducerTransport', async (data, callback) => {
            consoleLog('-- createProducerTransport ---');
            const mode = data.mode;
            const { roomName } = peers[socket.id]
            const { transport, params } = await createTransport(socket.id);
            addProducerTrasport(roomName, getId(socket), transport);
            transport.observer.on('close', () => {
                const id = getId(socket);
                const videoProducer = getProducer(id, 'video', mode);
                if (videoProducer) {
                    videoProducer.close();
                    removeProducer(id, 'video', mode);
                }
                const audioProducer = getProducer(id, 'audio', mode);
                if (audioProducer) {
                    audioProducer.close();
                    removeProducer(id, 'audio', mode);
                }
                removeProducerTransport(id);
            });
            //consoleLog('-- createProducerTransport params:', params);
            sendResponse(params, callback);
        });

        socket.on('connectProducerTransport', async (data, callback) => {
            const {transport, room4Producer} = getProducerTrasnport(getId(socket));
            const {roomName} = peers[socket.id]
            if (roomName === room4Producer){
                await transport.connect({ dtlsParameters: data.dtlsParameters });
                sendResponse({}, callback);
            }
        });

        socket.on('produce', async (data, callback) => {
            const { kind, rtpParameters, mode } = data;
            consoleLog('-- produce --- kind=' + kind);
            const id = getId(socket);
            const {roomName} = peers[id]
            const {transport, room4Producer} = getProducerTrasnport(id);
            if (roomName === room4Producer){
                if (!transport) {
                    console.error('transport NOT EXIST for id=' + id);
                    return;
                }
                const producer = await transport.produce({ kind, rtpParameters });
                addProducer(id, producer, kind, mode);
                producer.observer.on('close', () => {
                    consoleLog('producer closed --- kind=' + kind);
                });
                sendResponse({ id: producer.id }, callback);
    
                // inform clients about new producer
                consoleLog('--broadcast newProducer ---');
                socket.broadcast.emit('newProducer', { // 나 빼고 다
                    socketId: id,
                    producerId: producer.id,
                    kind: producer.kind,
                    mode: mode,
                });
            }
        });

        // --- consumer ----
        socket.on('createConsumerTransport', async (data, callback) => {
            consoleLog('-- createConsumerTransport -- id=' + getId(socket));
            const { roomName } = peers[socket.id]
            const { transport, params } = await createTransport(socket.id);
            addConsumerTrasport(roomName, getId(socket), transport);
            transport.observer.on('close', () => {
                const localId = getId(socket);
                removeConsumerSetDeep(localId, MODE_STREAM);
                removeConsumerSetDeep(localId, MODE_SHARE_SCREEN);
                /*
                let consumer = getConsumer(getId(socket));
                if (consumer) {
                consumer.close();
                removeConsumer(id);
                }
                */
                removeConsumerTransport(id);
            });
            //consoleLog('-- createTransport params:', params);
            sendResponse(params, callback);
        });

        socket.on('connectConsumerTransport', async (data, callback) => {
            consoleLog('-- connectConsumerTransport -- id=' + getId(socket));
            let {transport, room4Consumer} = getConsumerTrasnport(getId(socket));
            if (!transport) {
                console.error('transport NOT EXIST for id=' + getId(socket));
                return;
            }
            await transport.connect({ dtlsParameters: data.dtlsParameters });
            sendResponse({}, callback);
        });

        socket.on('consume', async (data, callback) => {
            console.error('-- ERROR: consume NOT SUPPORTED ---');
            return;
        });

        socket.on('resume', async (data, callback) => {
            console.error('-- ERROR: resume NOT SUPPORTED ---');
            return;
        });


        socket.on('getCurrentProducers', async (data, callback) => {
            const clientId = data.localId;
            consoleLog('-- getCurrentProducers for Id=' + clientId);
            const remoteVideoIds = getRemoteIds(clientId, 'video');
            consoleLog('-- remoteVideoIds:', remoteVideoIds);
            const remoteAudioIds = getRemoteIds(clientId, 'audio');
            consoleLog('-- remoteAudioIds:', remoteAudioIds);

            sendResponse(
                {
                    remoteVideoIds: remoteVideoIds,
                    remoteAudioIds: remoteAudioIds,
                },
                callback
            );
        });

            /// 방 생성시 발생하는 문제를 빠르게 Fix 하기 위해서 해결을 위해서 문제를 알고있는 부분을 try except로 채워버렸음... bug fix 진행 해야함 {다른 router에 있는 producer까지 탐색하는 문제가 있음..!} 
        socket.on('consumeAdd', async (data, callback) => {

            const localId = getId(socket);
            const kind = data.kind;
            const mode = data.mode;
            const {roomName} = peers[socket.id]
            consoleLog('-- consumeAdd -- localId=%s kind=%s', localId, kind);

            let {transport, room4Consumer} = getConsumerTrasnport(localId);

            if (room4Consumer !== roomName){
                return
            }

            if (!transport) {
                console.error('transport NOT EXIST for id=' + localId);
                return;
            }
            const rtpCapabilities = data.rtpCapabilities;
            const remoteId = data.remoteId;
            consoleLog(
                '-- consumeAdd - localId=' +
                    localId +
                    ' remoteId=' +
                    remoteId +
                    ' kind=' +
                    kind
            );
            const producer = getProducer(remoteId, kind, mode);
            if (!producer) {
                console.error(
                    'producer NOT EXIST for remoteId=%s kind=%s',
                    remoteId,
                    kind,
                    mode
                );
                return;
            }

            const { consumer, params } = await createConsumer(     
                socket.id,
                transport,
                producer,
                rtpCapabilities
            ); // producer must exist before consume
            //subscribeConsumer = consumer;
            addConsumer(localId, remoteId, consumer, kind, mode); // TODO: MUST comination of  local/remote id
            consoleLog(
                'addConsumer localId=%s, remoteId=%s, kind=%s',
                localId,
                remoteId,
                kind
            );
            consumer.observer.on('close', () => {
                consoleLog('consumer closed ---');
            });
            consumer.on('producerclose', () => {
                consoleLog('consumer -- on.producerclose');
                consumer.close();
                removeConsumer(localId, remoteId, kind, mode);

                // -- notify to client ---
                socket.emit('producerClosed', {
                    localId: localId,
                    remoteId: remoteId,
                    kind: kind,
                    mode: mode,
                });
            });

            consoleLog('-- consumer ready ---');
            sendResponse(params, callback);
        });

        socket.on('resumeAdd', async (data, callback) => {
            const localId = getId(socket);
            const remoteId = data.remoteId;
            const kind = data.kind;
            const mode = data.mode;
            consoleLog(
                '-- resumeAdd localId=%s remoteId=%s kind=%s',
                localId,
                remoteId,
                kind
            );
            let consumer = getConsumer(localId, remoteId, kind, mode);
            if (!consumer) {
                console.error('consumer NOT EXIST for remoteId=' + remoteId);
                return;
            }
            await consumer.resume();
            sendResponse({}, callback);
        });

        socket.on('producerStopShareScreen', async (data, callback) => {
            const id = getId(socket);

            removeConsumerSetDeep(id, MODE_SHARE_SCREEN);
            {
                const videoProducer = getProducer(
                    id,
                    'video',
                    MODE_SHARE_SCREEN
                );
                if (videoProducer) {
                    videoProducer.close();
                    removeProducer(id, 'video', MODE_SHARE_SCREEN);
                }
            }

            {
                const audioProducer = getProducer(
                    id,
                    'audio',
                    MODE_SHARE_SCREEN
                );
                if (audioProducer) {
                    audioProducer.close();
                    removeProducer(id, 'audio', MODE_SHARE_SCREEN);
                }
            }

            // socket.broadcast.emit('shareScreenClosed', {
            //     callerID: id,
            // });
        });

        // ---- sendback welcome message with on connected ---
        const newId = getId(socket);
        sendback(socket, { type: 'welcome', id: newId });

        // --- send response to client ---
        function sendResponse(response, callback) {
            //consoleLog('sendResponse() callback:', callback);
            callback(null, response);
        }

        // --- send error to client ---
        function sendReject(error, callback) {
            callback(error.toString(), null);
        }

        function sendback(socket, message) {
            socket.emit('message', message);
        }

        function getId(socket) {
            return socket.id;
        }

        function getPeer(socket, room_name){
            return {
                socket,
                room_name
            }

        }

        const getClientCount = async () => {
            // WARN: undocumented method to get clients number
            var nspSockets = await connections.allSockets();
            consoleLog('nspSockets');
            consoleLog(nspSockets);
        };

        function cleanUpPeer(socket) {
            const id = getId(socket);
            removeConsumerSetDeep(id, MODE_STREAM);
            removeConsumerSetDeep(id, MODE_SHARE_SCREEN);
            /*
            const consumer = getConsumer(id);
            if (consumer) {
                consumer.close();
                removeConsumer(id);
            }
            */

            const {transport, room4Consumer} = getConsumerTrasnport(id);
            if (transport) {
                transport.close();
                removeConsumerTransport(id);
            }

            {
                const videoProducer = getProducer(id, 'video', MODE_STREAM);
                if (videoProducer) {
                    videoProducer.close();
                    removeProducer(id, 'video', MODE_STREAM);
                }
            }
            {
                const videoProducer = getProducer(
                    id,
                    'video',
                    MODE_SHARE_SCREEN
                );
                if (videoProducer) {
                    videoProducer.close();
                    removeProducer(id, 'video', MODE_SHARE_SCREEN);
                }
            }
            {
                const audioProducer = getProducer(id, 'audio', MODE_STREAM);
                if (audioProducer) {
                    audioProducer.close();
                    removeProducer(id, 'audio', MODE_STREAM);
                }
            }
            {
                const audioProducer = getProducer(
                    id,
                    'audio',
                    MODE_SHARE_SCREEN
                );
                if (audioProducer) {
                    audioProducer.close();
                    removeProducer(id, 'audio', MODE_SHARE_SCREEN);
                }
            }

            const {producerTransport, room4Producer} = getProducerTrasnport(id);
            if (producerTransport) {
                producerTransport.close();
                removeProducerTransport(id);
            }
        }
    });

    // ========= mediasoup ===========

    //
    // Room {
    //   id,
    //   transports[],
    //   consumers[],
    //   producers[],
    // }
    //

    // --- multi-producers --
    let producerTransports = {};
    let videoProducers = {};
    let audioProducers = {};

    function getProducerTrasnport(id) {
        return producerTransports[id];
    }

    function addProducerTrasport(roomName, id, transport) {
        producerTransports[id] = {
            transport : transport,
            room : roomName
        };
        consoleLog(
            'producerTransports count=' + Object.keys(producerTransports).length
        );
    }

    function removeProducerTransport(id) {
        delete producerTransports[id];
        consoleLog(
            'producerTransports count=' + Object.keys(producerTransports).length
        );
    }

    function getProducer(id, kind, mode) {
        if (mode == undefined) {
            return;
        }
        if (kind === 'video') {
            return videoProducers[id] && videoProducers[id][mode];
        } else if (kind === 'audio') {
            return audioProducers[id] && audioProducers[id][mode];
        } else {
            console.warn('UNKNOWN producer kind=' + kind);
        }
    }

    function getRemoteIds(clientId, kind) {
        let remoteIds = [];
        if (kind === 'video') {
            for (const key in videoProducers) {
                if (key !== clientId) {
                    remoteIds.push(key);
                }
            }
        } else if (kind === 'audio') {
            for (const key in audioProducers) {
                if (key !== clientId) {
                    remoteIds.push(key);
                }
            }
        }
        return remoteIds;
    }

    function addProducer(id, producer, kind, mode) {
        if (mode == undefined) {
            return;
        }
        if (kind === 'video') {
            if (videoProducers[id] == undefined) {
                videoProducers[id] = {};
            }
            videoProducers[id][mode] = producer;
            consoleLog('addProducer');

            consoleLog(videoProducers);
            consoleLog(
                'videoProducers count=' + Object.keys(videoProducers).length
            );
        } else if (kind === 'audio') {
            if (audioProducers[id] == undefined) {
                audioProducers[id] = {};
            }
            audioProducers[id][mode] = producer;
            consoleLog(
                'audioProducers count=' + Object.keys(audioProducers).length
            );
        } else {
            console.warn('UNKNOWN producer kind=' + kind);
        }
    }

    function removeProducer(id, kind, mode) {
        if (mode == undefined) {
            return false;
        }
        if (kind === 'video') {
            if (videoProducers[id] && videoProducers[id][mode]) {
                if (mode == MODE_STREAM) {
                    delete videoProducers[id];
                } else {
                    delete videoProducers[id][mode];
                }
            }
            console.log(videoProducers);
            console.log(
                'videoProducers count=' + Object.keys(videoProducers).length
            );
        } else if (kind === 'audio') {
            if (audioProducers[id] && audioProducers[id][mode]) {
                if (mode == MODE_STREAM) {
                    delete audioProducers[id];
                } else {
                    delete audioProducers[id][mode];
                }
            }
            console.log(audioProducers);
            console.log(
                'audioProducers count=' + Object.keys(audioProducers).length
            );

            // console.log(
            //     'audioProducers count=' + Object.keys(audioProducers).length
            // );
        } else {
            console.warn('UNKNOWN producer kind=' + kind);
        }
    }

    // --- multi-consumers --
    let consumerTransports = {};
    let videoConsumers = {};
    let audioConsumers = {};

    function getConsumerTrasnport(id) {
        return consumerTransports[id];
    }

    function addConsumerTrasport(roomName, id, transport) {
        consumerTransports[id] = {
            transport : transport,
            room : roomName
        };
        consoleLog(
            'consumerTransports count=' + Object.keys(consumerTransports).length
        );
    }

    function removeConsumerTransport(id) {
        delete consumerTransports[id];
        consoleLog(
            'consumerTransports count=' + Object.keys(consumerTransports).length
        );
    }

    function getConsumerSet(localId, kind, mode) {
        if (mode == undefined) {
            return;
        }
        if (kind === 'video') {
            return videoConsumers[localId] && videoConsumers[localId][mode];
        } else if (kind === 'audio') {
            return audioConsumers[localId] && audioConsumers[localId][mode];
        } else {
            console.warn('WARN: getConsumerSet() UNKNWON kind=%s', kind);
        }
    }
    function getConsumer(localId, remoteId, kind, mode) {
        if (mode == undefined) {
            return;
        }
        const set = getConsumerSet(localId, kind, mode);
        if (set) {
            return set[remoteId];
        } else {
            return null;
        }
    }

    function addConsumer(localId, remoteId, consumer, kind, mode) {
        if (mode == undefined) {
            return;
        }
        const set = getConsumerSet(localId, kind, mode);
        if (set) {
            set[remoteId] = consumer;
            consoleLog(
                'consumers kind=%s count=%d',
                kind,
                Object.keys(set).length
            );
        } else {
            consoleLog('new set for kind=%s, localId=%s', kind, localId);
            const newSet = {};
            newSet[remoteId] = consumer;
            addConsumerSet(localId, newSet, kind, mode);
            consoleLog(
                'consumers kind=%s count=%d',
                kind,
                Object.keys(newSet).length
            );
        }
    }

    function removeConsumer(localId, remoteId, kind, mode) {
        if (mode == undefined) {
            return;
        }
        const set = getConsumerSet(localId, kind, mode);
        if (set) {
            if (mode == MODE_STREAM) {
                delete set[remoteId];
            } else {
                delete set[remoteId][mode];
            }

            consoleLog(
                'consumers kind=%s count=%d',
                kind,
                Object.keys(set).length
            );
        } else {
            consoleLog('NO set for kind=%s, localId=%s', kind, localId);
        }
    }

    function removeConsumerSetDeep(localId, mode) {
        if (mode == undefined) {
            return;
        }
        const set = getConsumerSet(localId, 'video', mode);
        if (videoConsumers[localId] && videoConsumers[localId][mode]) {
            if (mode == MODE_STREAM) {
                delete videoConsumers[localId];
            } else {
                delete videoConsumers[localId][mode];
            }
        }

        if (set) {
            for (const key in set) {
                const consumer = set[key];
                consumer?.close();
                delete set[key];
            }

            consoleLog(
                'removeConsumerSetDeep video consumers count=' +
                    Object.keys(set).length
            );
        }

        const audioSet = getConsumerSet(localId, 'audio', mode);

        if (audioConsumers[localId] && audioConsumers[localId][mode]) {
            if (mode == MODE_STREAM) {
                delete audioConsumers[localId];
            } else {
                delete audioConsumers[localId][mode];
            }
        }
        if (audioSet) {
            for (const key in audioSet) {
                const consumer = audioSet[key];
                consumer?.close();
                delete audioSet[key];
            }

            consoleLog(
                'removeConsumerSetDeep audio consumers count=' +
                    Object.keys(audioSet).length
            );
        }
    }

    function addConsumerSet(localId, set, kind, mode) {
        if (kind === 'video') {
            if (videoConsumers[localId] == undefined) {
                videoConsumers[localId] = {};
            }
            videoConsumers[localId][mode] = set;
        } else if (kind === 'audio') {
            if (audioConsumers[localId] == undefined) {
                audioConsumers[localId] = {};
            }
            audioConsumers[localId][mode] = set;
        } else {
            console.warn('WARN: addConsumerSet() UNKNWON kind=%s', kind);
        }
    }

    async function createTransport(socketId) {
        const { roomName } = peers[socketId]
        const router = rooms.get(roomName).mediasoupRouter
        const transport = await router.createWebRtcTransport(
            config.mediasoup.webRtcTransportOptions
        );
        consoleLog('-- create transport id=' + transport.id);

        return {
            transport: transport,
            params: {
                id: transport.id,
                iceParameters: transport.iceParameters,
                iceCandidates: transport.iceCandidates,
                dtlsParameters: transport.dtlsParameters,
            },
        };
    }


    async function createConsumer(socketId, transport, producer, rtpCapabilities) {
        let consumer = null;
        const {roomName} = peers[socketId]
        console.log(roomName, socketId)
        const router = rooms.get(roomName).mediasoupRouter
        console.log("ee",router.id)
        if (
            !router.canConsume({
                producerId: producer.id,
                rtpCapabilities,
            })
        ) {
            console.error('can not consume');
            return;
        }
        //consumer = await producerTransport.consume({ // NG: try use same trasport as producer (for loopback)
        consumer = await transport
            .consume({
                // OK
                producerId: producer.id,
                rtpCapabilities,
                paused: producer.kind === 'video',
            })
            .catch((err) => {
                console.error('consume failed', err);
                return;
            });

        //if (consumer.type === 'simulcast') {
        //  await consumer.setPreferredLayers({ spatialLayer: 2, temporalLayer: 2 });
        //}

        return {
            consumer: consumer,
            params: {
                producerId: producer.id,
                id: consumer.id,
                kind: consumer.kind,
                rtpParameters: consumer.rtpParameters,
                type: consumer.type,
                producerPaused: consumer.producerPaused,
            },
        };
    }

    async function getOrCreateRoom({ roomName })
    {
        let room = rooms.get(roomName);
        // If the Room does not exist create a new one.
        if (!room)
        {
            // logger.info('creating a new Room [roomName:%s]', roomName);
            console.log('creating a new Room [roomName:%s]', roomName);
            console.log(roomName)
            const mediasoupWorker =  getMediasoupWorker();
            room = await _room.create({mediasoupWorker, roomName});
            rooms.set(roomName, room);
            // console.log(room)
        }
        return room; // room 에 있는 mediassoup worker를 통해 Router 제작 후 실행
    }

    function getMediasoupWorker()
    {
        console.log(_workers)
        const worker = _workers[nextMediasoupWorkerIdx];
        if (++nextMediasoupWorkerIdx === _workers.length){
            nextMediasoupWorkerIdx = 0;
        }
            
        return worker;
    }
}
module.exports = socketMain;