
function socketMain(io) {
    const broadcastIO = io.of('/video-broadcast');

    broadcastIO.on('connection', async (socket) => {
        consoleLog('conference');
        if (await manage.getTransport(transports, socket.id).produce({
            kind,
            rtpParameters
        })) {
            socket.emit('newProducer');
        }

        socket.on('disconnect', () => {
            console.log('client disconnected');
            let item_consumers = manage.removeItems(consumers, socket.id, 'consumer')
            consumers = item_consumers;
            let item_producers = manage.removeItems(producers, socket.id, 'producer')
            producers = item_producers;
            let item_transports = manage.removeItems(transports, socket.id, 'transport')
            transports = item_transports

            if(peers[socket.id]){
                const {roomName} = peers[socket.id]
                delete peers[socket.id]
                let room_ = rooms.get(roomName)
                console.log(room_.peers)
                room_.peers = room_.peers.filter(socketId => socketId !== socket.id)
            }
        });

        socket.on('connect_error', (err) => {
            console.error('client connection error', err);
        });

        
        socket.on('getRouterRtpCapabilities', async(data, callback) => {
            // create router if room is note exist
            console.log('socketID : ', socket.id) // socket.conn.id
            const roomId = socket.handshake.headers.referer.split('/')[4];
            if (!rooms.has(roomId))
            {
                room = await getOrCreateRoom({ roomName : roomId })
            }
            else{
                room = await rooms.get(roomId)
            }
            const router1 = room.mediasoupRouter
            room.peers = manage.get_peers(room.peers, socket.id)
            // console.log(room)
            peers[socket.id] = {
                socket,
                roomName,
                transports : [],
                producers : [],
                consumers : [],
                peerDetails : {
                    name : '',
                    data : '',
                    isAdmin : false, // Not update NOw
                }
            }
            // get Router RTP capabilities
            const rtpCapabilities = router1.rtpCapabilities
            // send to client
            callback({rtpCapabilities})
        })

    socket.on('createProducerTransport',async(data, callback)=>{
        // have to get room name from peer's properties
        const {roomName} = peers[socket.id] // 첫 producer를 통해 peers를 타고타고 roomName을 가져오는 방식
        const router = rooms.get(roomName).mediasoupRouter
        try{
            let {transport, params} = await createWebRTCTransport(router)
            callback(params)
            let informs = manage.addTransport(socket.id, transports, transport, roomName, false, peers)
            transports = informs.transports
            peers = informs.peers

        }catch(err){
            console.error(err);
            callback({ params: err.message });
        }
    })

    socket.on('createConsumerTransport',async(data, callback)=>{
        // have to get room name from peer's properties
        const {roomName} = peers[socket.id] // 첫 producer를 통해 peers를 타고타고 roomName을 가져오는 방식
        const router = rooms.get(roomName).mediasoupRouter
        try{
            let {transport, params} = await createWebRTCTransport(router)
            callback(params)
            let informs = manage.addTransport(socket.id, transports, transport, roomName, true, peers)
            transports = informs.transports
            peers = informs.peers

        }catch(err){
            console.error(err);
            callback({ params: err.message });
        }
    })

    socket.on('connectProducerTransport', async (data, callback) => {
        // getTransport(transports, socket.id, is_consumer = F)
        await manage.getTransport(transports, socket.id, false).connect({ dtlsParameters: data.dtlsParameters })
        callback();
    });

    socket.on('connectConsumerTransport', async (data, callback) => {
        // getTransport(transports, socket.id, is_consumer = T)
        await manage.getTransport(transports, socket.id, true).connect({ dtlsParameters: data.dtlsParameters })
        callback();
    });

    socket.on('produce', async (data, callback) => {
        const {kind, rtpParameters} = data;
        const {roomName} = peers[socket.id];
        const producer = await manage.getTransport(transports, socket.id).produce({
            kind,
            rtpParameters
        })
        let informs = manage.addProducer(socket.id, producers, producer, roomName, peers)
        producers = informs.producers;
        peers = informs.peers;
        
        console.log('Producer ID : ', producer.id, producer.kind)
        callback({ id: producer.id });
        // inform clients about new producer
        socket.broadcast.emit('newProducer');
    });
    
    socket.on('consume', async (data, callback) => {
        const {kind, rtpParameters} = data;
        const producer = await manage.getTransport(transports, socket.id).produce({
            kind,
            rtpParameters
        })
        
        callback(await createConsumer(producer, data.rtpCapabilities, socket.id));
    });

    socket.on('resume', async (data, callback) => {
        const { consumer } = consumers.find(consumerData => consumerData.consumer.id === data.consumerId)
        await consumer.resume()
        callback();
    });
    });
}

//=====================================================================================================




const createWebRTCTransport = async(router)=>{
    return new Promise(async (resolve, reject) =>{
        try{
            const webRTCTransport_options = config.mediasoup.webRtcTransportOptions
            const transport = await router.createWebRtcTransport(webRTCTransport_options)
            console.log(`transport id : ${transport.id}`)
            transport.on('dtls_statechange', dtlsState =>{
                if (dtlsState === 'closed'){
                    transport.close()
                }
            })
            transport.on('close',()=>{
                console.log('transport closed');
            })
            
            resolve({transport,
                params: {
                    id: transport.id,
                    iceParameters: transport.iceParameters,
                    iceCandidates: transport.iceCandidates,
                    dtlsParameters: transport.dtlsParameters
                },})
        }
        catch(error){
            console.log(error)
            reject(error)
        }
    })
}

// 서버에 대한 정보가 rooms.room에 형태로 들어가있음
/*
params = {
    roomId,
    webRtcServer : mediasoupWorker.appData.webRtcServer,
    mediasoupRouter,
    audioLevelObserver,
    activeSpeakerObserver,
    bot
}
 */

async function getOrCreateRoom({ roomName })
{
    let room = rooms.get(roomName);
    // If the Room does not exist create a new one.
    if (!room)
    {
        // logger.info('creating a new Room [roomName:%s]', roomName);
        console.log('creating a new Room [roomName:%s]', roomName);
        const mediasoupWorker = worker;
        room = await _room.create({mediasoupWorker, roomName});
        rooms.set(roomName, room);
        // console.log(room)
    }
    return room; // room 에 있는 mediassoup worker를 통해 Router 제작 후 실행
}
    


async function createConsumer(producer, rtpCapabilities, socketId) {
    const {roomName} = peers[socketId]
    const router = rooms.get(roomName).mediasoupRouter
    let consumer
    if (!router.canConsume(
        {
        producerId: producer.id,
        rtpCapabilities,
        })
    ) {
        console.error('can not consume');
        return;
    }
    try {
        const consumerTransport = transports.find(transportData =>(
            transportData.consumer && (transportData.transport.id === producer.id)
        )).transport

        consumer = await consumerTransport.consume({
        producerId: producer.id,
        rtpCapabilities,
        paused: producer.kind === 'video',
        });

    } catch (error) {
        console.error('consume failed', error);
        return;
    }

    if (consumer.type === 'simulcast') {
        await consumer.setPreferredLayers({ spatialLayer: 2, temporalLayer: 2 });
    }

    let informs = manage.addConsumer(socketId, consumers, consumer, roomName, peers)
    consumers = informs.consumers
    peers = informs.peers 

    return {
        producerId: producer.id,
        id: consumer.id,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
        type: consumer.type,
        producerPaused: consumer.producerPaused
    };
}

module.exports = socketMain;