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
let producer;

let producerTransport;
let consumerTransport;
let mediasoupRouter;
const mediasoupWorkers = [ ];
let nextMediasoupWorkerIdx = 0;


run();
async function run() {
    try {
        // await interactiveServer();

        // if (process.env.INTERACTIVE === 'true' || process.env.INTERACTIVE === '1')
        //     {await interactiveClient();}
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
//=====================================================================================================
async function runExpressApp(){
    expressApp = express();
    expressApp.use(bodyParser.json());
    expressApp.get('*',(req, res, next)=>{
        // you should provide path by your roomname
        const path = '/rooms/'
        if (req.path.indexOf(path)==0 && req.path.length > path.length) return next()
        res.send(`You need to specify a room name in the path e.q.
            https://${ip}:${listenPort}/rooms/room_name in your web browser`);
    })

    expressApp.param('roomId', (req, res, next, roomId) =>{
        // console.log("hello world")
        // if (!rooms.has(roomId))
        // {
        //     const error = new Error(`room with id "${roomId}" not found`);
        //     error.status = 404;
        //     throw error;
        // }
        // req.room = rooms.get(roomId);
        console.log("hello world")
        if (!rooms.has(roomId))
        {
            const room = getOrCreateRoom({ roomName : roomId })
            req.room = room
        }
        req.room = rooms.get(roomId);
        next();
    });
    expressApp.use('/rooms/:room', express.static(__dirname + '/public'));
    // expressApp.get(
    //     '/rooms/:roomId', (req, res) =>
    //     {
    //         let url = req.url;
    //         const data = {
    //             Room : req.room,
    //             Peers : peers,
    //             Producers : producers,
    //             Consumers : consumers,
    //             Transports : transports,
    //         }
    //         res.status(200).send(data)
    // });

}
//=====================================================================================================
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
//=====================================================================================================

async function runSocketServer() {
    console.log('running WebSocketServer...');
    // logger.info('running WebSocketServer...');
    socketServer = Server(httpsServer, {
        serveClient: false,
        path: '/socket.io',
        log: false,
    });

    const connection = socketServer.of('/mediasoup')
    // console.log(connection)
    connection.on('connection', async (socket) => {
        console.log('client connected');
        
        socket.emit('connection-success', {
            socketId: socket.id,
        })

        socket.on('joinRoom', async({roomName}, callback) => {
            // create router if room is note exist
            console.log('socketID : ', socket.id) // socket.conn.id
            const roomId = socket.handshake.headers.referer.split('/')[4];
            if (!rooms.has(roomId))
            {
                room = await getOrCreateRoom({ roomName : roomName })
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

    socket.on('createWebRTCTransport',async({consumer}, callback)=>{
        // have to get room name from peer's properties
        const {roomName} = peers[socket.id] // 첫 producer를 통해 peers를 타고타고 roomName을 가져오는 방식
        const router = rooms.get(roomName).mediasoupRouter
        try{
            let {transport, params} = await createWebRTCTransport(router)
            callback(params)
            let informs = manage.addTransport(socket.id, transports, transport, roomName, consumer, peers)
            transports = informs.transports
            peers = informs.peers

        }catch(err){
            console.error(err);
            callback({ params: err.message });
        }
    })

    //about producers
    socket.on('transport-connect', ({ dtlsParameters}) =>{
        console.log('DTLS PARAMS...', {dtlsParameters})
        manage.getTransport(transports, socket.id).connect({dtlsParameters})
    })

    socket.on('transport-produce',async({kind, rtpParameters, appData}, callback) =>{
        const producer = await manage.getTransport(transports, socket.id).produce({
            kind,
            rtpParameters
        })
        // add producer to the prodcer array
        const {roomName} = peers[socket.id];
        let informs = manage.addProducer(socket.id, producers, producer, roomName, peers)
        producers = informs.producers;
        peers = informs.peers;
        
        const params = informConsumer(roomName, socket.id, producer.id, producer.kind, producer.length) // 다른 producer에게 새로들어온 producer를 소개
        // get log for producer
        console.log('Producer ID : ', producer.id, producer.kind)
        producer.on('transportclose', ()=>{
            console.log('transport for this producer closed')
            producer.close()
        })
        callback(params)
    })

    socket.on('getProducers', callback => {
        //return all producer transports
        const { roomName } = peers[socket.id]
        let producerList = []
        producers.forEach(producerData => {
            if ((producerData.socketId !== socket.id) && (producerData.roomName === roomName)) {
            producerList = [...producerList, producerData.producer.id]
            }
        })
        console.log([producerList])
        callback(producerList)
    })

    socket.on('transport-recv-connect', async({dtlsParameters, serverside_ConsumerTransportId})=> {
        console.log('DTLS PARAMS... for recv', {dtlsParameters})
        const consumerTransport = transports.find(transportData =>(
            transportData.consumer && (transportData.transport.id === serverside_ConsumerTransportId)
        )).transport
        await consumerTransport.connect({dtlsParameters})
    })

    socket.on('consume', async({rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId}, callback) =>{
        const {consumer, params} = await createConsumer(socket.id, remoteProducerId, rtpCapabilities, serverside_ConsumerTransportId)

        consumer.on('transportclose',()=>{
            console.log('transport close from consumer')
        })
        consumer.on('producerclose',()=>{
            console.log('transport close from producer')
            socket.emit('producer-closed', {remoteProducerId})
            consumerTransport.close([])
            transports = transports.filter(transportData => transportData.transport.id !== consumerTransport.id)
            consumer.close()
            consumers = consumers.filter(consumerData => consumerData.consumer.id !== consumer.id)                
        })

        callback({ params })
    })

    socket.on('consumer-resume', async({serverside_ConsumerId})=>{
        console.log(consumers)
        const { consumer } = consumers.find(consumerData => consumerData.consumer.id === serverside_ConsumerId)
        await consumer.resume()
    })

    socket.on('exitRoom', async({rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId}, callback) =>{
        // producers.forEach(producerData => console.log("아이디",producerData.producer.id, "종류", producerData.producer.kind))
        // 접속한producer데이터 삭제
        closeProducer(socket.id, rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId)
        
        let producerTransport = manage.getTransport(transports, socket.id)
        producerTransport.close([])

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
        callback()
    })

    socket.on('produceClose', async({rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId}, callback) =>{
        let producer_kind;
        closeProducer(socket.id, rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId, producer_kind)
        let item_producers = manage.removeItems(producers, socket.id, 'producer', producer_kind)
        producers = item_producers;
        if(peers[socket.id]){
            peers[socket.id].producers.filter(producerId => producerId !== remoteProducerId)
            // remove socket from room
        }
        callback()
    })



    const informConsumer =(roomName, socketId, id, kind, exist) =>{
        // console.log("프로두셔",producers)
        producers.forEach(producerData => {
            // console.log("피어",peers[producerData.socketId])
            if (producerData.socketId !== socketId && producerData.roomName === roomName) {
                const producerSocket = peers[producerData.socketId].socket
                // use socket to send producer id to producer
                // new producer will send his Id to all other consumers(producers)
                // console.log("피어간 아이디",id)
                producerSocket.emit('new-producer', {producerId: id})
            }
        })    
        const params = {
            id : id,
            producerExist : exist >= 1 ? true : false 
        }
        return params
    }
    });
}







//=====================================================================================================
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
    

async function closeProducer(socketId, rtpCapabilities, remoteProducerId, serverside_ConsumerTransportId, producer_kind){
    const {roomName} = peers[socketId]
    const router = rooms.get(roomName).mediasoupRouter
    if(!router.canConsume({
        producerId : remoteProducerId,
        rtpCapabilities,
    })){
        console.error('can not consume');
        return 
    }

    const producer = producers.find(producerData => (producerData.producer && (producerData.producer.id === remoteProducerId))).producer
    producer_kind = producer.kind
    producer.close([])
    producer.on('transportclose', ()=>{
        console.log('producer exit')
        producer.close([])
    })
    console.log('peer disconnected')
}

async function createConsumer(socketId, remoteProducerId, rtpCapabilities, serverside_ConsumerTransportId) {

    const {roomName} = peers[socketId]
    const router = rooms.get(roomName).mediasoupRouter

    if(!router.canConsume({
        producerId : remoteProducerId,
        rtpCapabilities,
    })){
        console.error('can not consume');
        return ;
    }
    let consumer
    let consumerTransport = transports.find(transportData => (
        transportData.consumer && (transportData.transport.id === serverside_ConsumerTransportId)
    )).transport

    try {
        consumer = await consumerTransport.consume({
            producerId : remoteProducerId,
            rtpCapabilities,
            paused : true,  //have to resume this play back
        });
    } catch (error) {
        console.error('consume failed', error);
        return {params : error.message};
    }

        let informs = manage.addConsumer(socketId, consumers, consumer, roomName, peers)
        consumers = informs.consumers
        peers = informs.peers 

        const params = {
            id : consumer.id,
            producerId : remoteProducerId,
            kind: consumer.kind,
            rtpParameters : consumer.rtpParameters,
            serverside_ConsumerId : consumer.id
        }
        return {consumer, params}
}