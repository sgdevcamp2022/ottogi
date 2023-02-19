const fs = require('fs');
const URL = require('url');
const qs = require('querystring');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const mediasoup = require('mediasoup')
// const { AwaitQueue } = require('awaitqueue');

const config = require('./config');
const { listenIp, listenPort } = config.https;
const listenIps = config.mediasoup.webRtcTransportOptions.listenIps[0];
const ip = listenIps.announcedIp || listenIps.ip;

// const Room = require('./lib/Room');
const Logger = require('./lib/Logger');
const utils = require('./lib/utils');
const cnt = require('./lib/connect_')
const manage = require('./lib/manageItem')
const _room = require('./lib/room_');
const interactiveServer = require('./lib/interactiveServer');
const interactiveClient = require('./lib/interactiveClient');

let room
const Server = require('socket.io')  // server side

const logger = new Logger();
// const queue = new AwaitQueue();
const rooms = new Map();

let worker
// let rooms = {}          // { roomName1: { Router, peers: [ socketId1, ... ] }, ...}
let peers = {}          // { socketId1: { roomName1, socket, transports = [id1, id2,], producers = [id1, id2,] , consumers = [id1, id2,], peerDetails }, ...}
let transports = []     // [ { socketId1, roomName1, transport, consumer }, ... ]
let producers = []      // [ { socketId1, roomName1, producer, }, ... ]
let consumers = []      // [ { socketId1, roomName1, consumer, }, ... ]

let httpsServer;
let socketServer;
let expressApp;


run();
async function run() {
    try {
        await createMediasoupWorker();

        await runExpressApp();

        await runWebServer();

        await runSocketServer();
        // Log rooms status every X seconds.
    } catch (err) {
        console.error(err);
    }
};

//=====================================================================================================
//=====================================================================================================
async function createMediasoupWorker(){
    worker = await mediasoup.createWorker({
        logLevel   : config.mediasoup.workerSettings.logLevel,
        logTags    : config.mediasoup.workerSettings.logTags,
        rtcMinPort : Number(config.mediasoup.workerSettings.rtcMinPort),
        rtcMaxPort : Number(config.mediasoup.workerSettings.rtcMaxPort)
    })
    console.log(`worker pid ${worker.pid}`)
    worker.on('died', error=> {
        console.error('mediasoup worker has died')
        setTimeout(()=>process.exit(1),2000) //2초 안에 탈출
    })
    return worker
}
//=====================================================================================================
async function runExpressApp() {
    expressApp = express();
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({ extended: false }));
    // expressApp.use('/rooms/:roomId',express.static(__dirname + '/public'));
    expressApp.get('/test', (req, res)=>{
        res.send('연결성공')
    })
    
    expressApp.use((error, req, res, next) => {
        console.log(req)
        if (error) {
        console.warn('Express app error,', error.message);

        error.status = error.status || (error.name === 'TypeError' ? 400 : 500);

        res.statusMessage = error.message;
        res.status(error.status).send(String(error));
        } else {
        next();
        }
    });
}

//=====================================================================================================
async function runWebServer(){
    const { key, cert } = config.https.tls;
    if (!fs.existsSync(key) || !fs.existsSync(cert)) {
        console.error('SSL files are not found. check your config.js file');
        process.exit(0);
    }
    const tls =
    {
        cert : fs.readFileSync(config.https.tls.cert,'utf-8'),
        key  : fs.readFileSync(config.https.tls.key,'utf-8')
    };

    httpsServer = https.createServer(tls,expressApp)
    httpsServer.on('error', (err) => {
        console.error('starting web server failed:', err.message);
    });
    await new Promise((resolve) => {
        httpsServer.listen(listenPort, () => {
            console.log('server is running');
            console.log(`open https://${ip}:${listenPort} in your web browser`);
            resolve();
        });
    });
}
//=====================================================================================================


async function runSocketServer() {
    socketServer = Server(httpsServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    connections = socketServer.of('/video-broadcast')
    socketServer.on('connection', async (socket) => {
        console.log('client connected');
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

    // socket.on('exitRoom', async({rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId}, callback) =>{
    //     // producers.forEach(producerData => console.log("아이디",producerData.producer.id, "종류", producerData.producer.kind))
    //     // 접속한producer데이터 삭제
    //     closeProducer(socket.id, rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId)
        
    //     let producerTransport = manage.getTransport(transports, socket.id, false)
    //     producerTransport.close([])

    //     let item_consumers = manage.removeItems(consumers, socket.id, 'consumer')
    //     consumers = item_consumers;
    //     let item_producers = manage.removeItems(producers, socket.id, 'producer')
    //     producers = item_producers;
    //     let item_transports = manage.removeItems(transports, socket.id, 'transport')
    //     transports = item_transports
    //     if(peers[socket.id]){
    //         const {roomName} = peers[socket.id]
    //         delete peers[socket.id]
    //         let room_ = rooms.get(roomName)
    //         console.log(room_.peers)
    //         room_.peers = room_.peers.filter(socketId => socketId !== socket.id)
    //     }
    //     callback()
    // })

    // socket.on('produceClose', async({rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId}, callback) =>{
    //     let producer_kind;
    //     closeProducer(socket.id, rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId, producer_kind)
    //     let item_producers = manage.removeItems(producers, socket.id, 'producer', producer_kind)
    //     producers = item_producers;
    //     if(peers[socket.id]){
    //         peers[socket.id].producers.filter(producerId => producerId !== remoteProducerId)
    //         // remove socket from room
    //     }
    //     callback()
    // })