const cnt = require('../lib/connect_')
const process = require('process/')
const config = require('../config')
const params = require('./mediasoupParams');

// let socketServer;

// runSocketServer();
// // TCP/IP 통신은 일반적으로 sokect통신 이라고 부른다. 
// async function runSocketServer() {
  //   socketServer = io({
    //       serveClient: true,
    //       path: '/mediasoup',
    //       log: true,
    //   })
    // }
    

const io = require('socket.io-client') // client-side
const mediasoupClient = require('mediasoup-client')
const socket = io('/mediasoup')
console.log(socket)
socket.on('connection-success', ({socketId, existProducer}) => {
  console.log('--', socketId, 'Enters the room.', existProducer);
  // config.sockets = [...config.sockets, socketId]
  getLocalStream()
})


// if we don't supply it will be null
const room = '127.0.0.1:4443/rooms/room_name/'
const roomName = room.split('/')[2]
console.log(roomName)
// const roomName = window.location.pathname.split('/')[2]
// API 형식으로 변경을 해둬야 Front 및 Back 이랑 분리를 하여 사용을 할 수 있다. 

let Streaming;
let isStreaming = false;
let isVideoON = false;

let device;
let rtpCapabilities;
let producerTransport;
let audioProducer;
let videoProducer;
let screenProducer; // 아직 업데이트 안됨
let consumerTransports = [];

let audioParams;
let videoParams = { params };
let consumingTransports = [];


const streamSuccess = (stream) => {
  localVideo.srcObject = stream

  audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
  videoParams = { track: stream.getVideoTracks()[0], ...videoParams };

  joinRoom()
}

const joinRoom = () => {
  socket.emit('joinRoom', { roomName }, (data) => {
    console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
    // we assign to local variable and will be used when
    // loading the client Device (see createDevice above)
    rtpCapabilities = data.rtpCapabilities

    // once we have rtpCapabilities from the Router, create Device
    createDevice()
  })
}

const getLocalStream = () => {
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: {
        min: 640,
        max: 1920,
      },
      height: {
        min: 400,
        max: 1080,
      }
    }
  })
  .then(streamSuccess)
  .catch(error => {
    console.log(error.message)
  })
}

// A device is an endpoint connecting to a Router on the
// server side to send/recive media
const createDevice = async () => {
  try {
    device = new mediasoupClient.Device()

    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
    // Loads the device with RTP capabilities of the Router (server side)
    await device.load({
      // see getRtpCapabilities() below
      routerRtpCapabilities: rtpCapabilities
    })

    console.log('Device RTP Capabilities', device.rtpCapabilities)

    // once the device loads, create transport
    createSendTransport()

  } catch (error) {
    console.log(error)
    if (error.name === 'UnsupportedError')
      console.warn('browser not supported')
  }
}

//============================================================================================
//========================== For create Send Transport =======================================
//============================================================================================
const createSendTransport = async ()=>{
  await socket.emit('createWebRTCTransport',{consumer : false}, ({params})=>{
    if (params.error){
      console.log(params.error)
      return
    }

    console.log(producerTransport)
    producerTransport = device.createSendTransport(params) // ready for send streaming data
    producerTransport.on('connect', async({dtlsParameters}, callback, errback) =>{
      try{
        // signal of local DTLS parameters to the serverside transport
        await socket.emit('transport-connect',{
          // transportId : producerTransport.id,
          dtlsParameters,
        })
        // tell the transport that parameters were transmitted
        callback()
      }catch(error){
        console.log(error)
        errback(error)
      }
    })

    producerTransport.on('produce', async(parameters, callback, errback) =>{
      try{
        await socket.emit('transport-produce',{
          // transportId : producerTransport.id,
          kind : parameters.kind,
          rtpParameters : parameters.rtpParameters,
          appData : parameters.appData          
        }, ({id, producerExist}) => {
          // tell the transport that parameters were transmitted and provide
          // give producer's id for serverside
          callback({id, producerExist})
          if(producerExist){
            getProducers()
          }
        })
      }catch(error){
        errback(error)
      }
    })
    connectSendTransport()
  })
}

// for connect [Send transport & produce]
const connectSendTransport = async()=>{
  try{
    if (isVideoON === false){
      audioProducer = await cnt.Producer(producerTransport, audioParams)
    }
  }catch(error){
    console.warn('audio is missing')
  }
  
  try{
    videoProducer = await cnt.Producer(producerTransport, videoParams)
  }catch(error){
    console.warn('video is missing')
  }
}




const signalNewConsumerTransport = async (remoteProducerId) => {
  //check if we are already consuming the remoteProducerId
  if (consumingTransports.includes(remoteProducerId)) return;
  consumingTransports.push(remoteProducerId);

  await socket.emit('createWebRTCTransport', { consumer: true }, ({ params }) => {
    // The server sends back params needed 
    // to create Send Transport on the client side
    if (params.error) {
      console.log(params.error)
      return
    }
    console.log(`PARAMS... ${params}`)

    let consumerTransport
    try {
      consumerTransport = device.createRecvTransport(params)
    } catch (error) {
      // exceptions: 
      // {InvalidStateError} if not loaded
      // {TypeError} if wrong arguments.
      console.log(error)
      return
    }

    consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      try {
        // Signal local DTLS parameters to the server side transport
        // see server's socket.on('transport-recv-connect', ...)
        await socket.emit('transport-recv-connect', {
          dtlsParameters,
          serverside_ConsumerTransportId: params.id,
        })

        // Tell the transport that parameters were transmitted.
        callback()
      } catch (error) {
        // Tell the transport that something was wrong
        errback(error)
      }
    })

    connectRecvTransport(consumerTransport, remoteProducerId, params.id)
  })
}

// server informs the client of a new producer just joined
socket.on('new-producer',({producerId}) => signalNewConsumerTransport(producerId))
const getProducers = () => {
  socket.emit('getProducers', (producerIds) =>{
    console.log("producer Ids", producerIds)
    producerIds.forEach(id => signalNewConsumerTransport(id))
    // producerIds.forEach(signalNewConsumerTransport)
  })
}
const connectRecvTransport = async(consumerTransport, remoteProducerId, serverside_ConsumerTransportId)=>{
  
  await socket.emit('consume',{
    rtpCapabilities : device.rtpCapabilities,
    remoteProducerId,
    serverside_ConsumerTransportId,
  },
  async({params}) =>{
    if (params.error){
      console.log('Cannot consume')
      return
    }
    
    console.log(`Consumer Params - ${params}`)
    const consumer = await consumerTransport.consume({
      id : params.id,
      producerId : params.producerId,
      kind : params.kind,
      rtpParameters : params.rtpParameters,
    })

    consumerTransports = [
      ...consumerTransports,
      {
        consumerTransport,
        serverside_ConsumerTransportId : params.id,
        producerId : remoteProducerId,
        consumer,
      }
    ]
    const {track} = consumer
//============ Create Video // 프론트 단에서 진행되는 거라 나중에 업데이트
    createTrack(false, remoteProducerId, params.kind)
    console.log("전달 받은 consumer",consumer)
    console.log("전달 받은 Track",track)
    document.getElementById(remoteProducerId).srcObject = new MediaStream([track])
    socket.emit('consumer-resume', {serverside_ConsumerId : params.serverside_ConsumerId})
//=====================================================================
  })
}

socket.on('producer-closed', ({ remoteProducerId }) => {
  // server notification is received when a producer is closed
  // we need to close the client-side consumer and associated transport
  const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId)
  producerToClose.consumerTransport.close()
  producerToClose.consumer.close()

  // remove the consumer transport from the list
  consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId)

  // remove the video div element
  videoContainer.removeChild(document.getElementById(`td-${remoteProducerId}`))
})


const createTrack = async(isProducer = false, ProducerId,kind) =>{
  if(isProducer === false)
  {
    const newElem = document.createElement('div')
    newElem.setAttribute('id', `td-${ProducerId}`)
    if (kind === 'audio'){
      newElem.innerHTML = `<audio id="${ProducerId}" autoplay></audio>`
    }
    else if (kind === 'video'){
      newElem.setAttribute('class','remoteVideo')
      newElem.innerHTML = `<video id="${ProducerId}" autoplay class = "video"></video>`
    }
    videoContainer.appendChild(newElem);
  }
  if(isProducer === true)
  {
    // 검은색 칸이 보기 싫다면 업데이트 하기
  }
}
