const io = require('socket.io-client') // client-side
const mediasoupClient = require('mediasoup-client')
const socket = io('/mediasoup')
const cnt = require('../src/connect')
const config = require('../config')



socket.on('connection-success', ({socketId, existProducer}) => {
  console.log('--', socketId, 'Enters the room.', existProducer);
})


// if we don't supply it will be null
const roomName = window.location.pathname.split('/')[2]
// API 형식으로 변경을 해둬야 Front 및 Back 이랑 분리를 하여 사용을 할 수 있다. 

let Streaming;
let isStreaming = false;
let isVideoON = false;

let device;
let rtpCapabilities;
let producerTransport;
let audioProducer;
let videoProducer;
let consumerTransports = [];

const params = require('./mediasoupParams');
let audioParams;
let videoParams = { params };
let consumingTransports = [];



// streaming start
// html audiotag 부분에 Streaming 부분을 넣어주면 됨
// 이 때 video tag 부분을 활성화 시켜 user 정보를 넣어주면 됨
const getLocalStream = () =>{
  if(isStreaming  === true){
    console.log("already streaming")
    return
  }
  navigator.mediaDevices.getUserMedia({
    audio : true,
  }).then(streamSuccess)
  .catch(error=>{
    console.log(error.message)
  })
}


// videoTag 부분에 .srcobject로 S
/*
  btnFinishStream.disabled = false
  btnLocalVideo.disabled = false
  btnLocalStream.disabled = true
*/
const streamSuccess = (stream)=>{
  localVideo.srcObject = stream;
  btnFinishStream.disabled = false
  btnLocalVideo.disabled = false
  btnLocalStream.disabled = true
  // btnLocalScrean.disabled = false
  
  
  isStreaming = true
  Streaming = stream
  audioParams= { track: stream.getAudioTracks()[0], ...audioParams };
  console.log("audioParams",audioParams)
  joinRoom() 
}


// 카메라를 받는 함수
// isVideoON == True 일 경우 video tag부분에서 영상 제공을 마무리해야함
// isVideoOn == False일 경우 video tag 부분에 영상 제공을 시작함
const getLocalVideo = () =>{
  if (isVideoON === false){
    localVideo.srcObject = null;

    navigator.mediaDevices.getUserMedia({
      video : {
        width : {
          min : 640,
          max : 1920
        },
        height : {
          min : 400,
          max : 1080
        }
      }
    }).then(addvideo)
    .catch(error=>{
      console.log(error.message)
    })
  }
  if(isVideoON === true){
    const videoTracks = Streaming.getVideoTracks();
    Streaming.removeTrack(videoTracks[0])
    
    videoProducer.close()
    videoParams = undefined
    isVideoON = false
    // Streaming.getVideoTracks().forEach(track => track.stop());
    closeProducer(videoProducer)
  }
}

// 카메라 정보를 보내주는 함수
const addvideo = (stream) =>{
  
  localVideo.srcObject = null;
  localVideo.srcObject = Streaming;
  

  isVideoON = true
  const videoTracks = stream.getVideoTracks();
  Streaming.addTrack(videoTracks[0])
  videoParams = { track: stream.getVideoTracks()[0], ...videoParams };
  console.log("videoParams",videoParams)
  try{
    connectSendTransport()
  }catch (error)
  {
    console.log(error)
    if (error.name === 'UnsupportedError')
      {console.warn('browser not supported')}
  }
  
}

const joinRoom = () =>{ // to make router or go to router
  socket.emit('joinRoom', {roomName}, (data) => {
    console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
    rtpCapabilities = data.rtpCapabilities
    // once we have rtp capability, create device
    createDevice()
  })
}

// make device when we join the room
const createDevice = async () =>{
  try{
    device = new mediasoupClient.Device()
    await device.load({
      routerRtpCapabilities : rtpCapabilities
    })
    console.log('Device RTP Capabilities', rtpCapabilities)
    //once the device load, create transport
    createSendTransport() // this cuz for everyone is producer & consumer
  }catch (error)
  {
    console.log(error)
    if (error.name === 'UnsupportedError')
      {console.warn('browser not supported')}
  }
}


//========================== For create Send Transport =======================================

const createSendTransport = async ()=>{
  await socket.emit('createWebRTCTransport',{consumer : false}, (params)=>{
    if (params.error){
      console.log(params.error)
      return
    }
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

// server have to inform the client of a new producer just joined // and ready for consume
socket.on('new-producer',({producerId}) => signalNewConsumerTransport(producerId))
const getProducers = () => {
  socket.emit('getProducers', (producerIds) =>{
    console.log("producer Ids", producerIds)
    console.log(producerIds)
    producerIds.forEach(id => signalNewConsumerTransport(id))
    // producerIds.forEach(signalNewConsumerTransport)
  })
}
//============================================================================================



//======================== For create Receiver Transport =====================================

const signalNewConsumerTransport = async (remoteProducerId)=>{
  //check if we are already consuming the remoteProducerId
  console.log(remoteProducerId)
  if (consumingTransports.includes(remoteProducerId)) {return;}
  consumingTransports.push(remoteProducerId);

  await socket.emit('createWebRTCTransport',{consumer : true}, (params)=>{
    if (params.error){
      console.log(params.error)
      return
    }

    console.log(`PARAMS... ${params}`)
    let consumerTransport;
    try {
      consumerTransport = device.createRecvTransport(params)
    } catch (error) {
      console.log(error)
      return
    }
    
    consumerTransport.on('connect', async({dtlsParameters}, callback, errback) =>{
      try{
        // signal of local DTLS parameters to the serverside transport
          await socket.emit('transport-recv-connect',{
            // transportId : consumerTransport.id,
            dtlsParameters : dtlsParameters,
            serverside_ConsumerTransportId : params.id
          })
          callback()
      }catch(error){
        errback(error)
      }
    })
    
    connectRecvTransport(consumerTransport, remoteProducerId, params.id)
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
    
    console.log(`Consumer Params ${params.kind}`)
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

    const {track} = await consumer
    console.log(track)
//============ Create Video // 프론트 단에서 진행되는 거라 나중에 업데이트
    await createTrack(false, remoteProducerId, params.kind)
    document.getElementById(remoteProducerId).srcObject = new MediaStream([track])
    //=====================================================================
    socket.emit('consumer-resume', {serverside_ConsumerId : params.serverside_ConsumerId})
  })
}
//============================================================================================
//============================================================================================
//============================================================================================

socket.on('producer-closed', async({remoteProducerId})=>{
//========= 상대방 종료시 데이터 삭제
  await deleteVideo(false, remoteProducerId) 
  consumingTransports.pop(remoteProducerId)
//==============================
})

// 모든 정보를 삭제함
/*
  btnFinishStream.disabled = true
  btnLocalVideo.disabled = true
  btnLocalScrean.disabled = true
  btnLocalStream.disabled = false
*/
const finishStream = async () =>{ // ProducerId : 내 아이디 , remoteProducerIds : Consumers의 정보들 

  if(isStreaming === false){
    console.log("already Finished")
    return
  }
  btnFinishStream.disabled = true
  btnLocalVideo.disabled = true
  btnLocalScrean.disabled = true
  btnLocalStream.disabled = false


  closeTransport(videoProducer || audioProducer || screenProducer)

  videoParams = undefined
  audioParams = undefined
  isStreaming = false
  isVideoON = false
  consumingTransports = [] // Producing이 끝나 consuming을 하지 않음
    
}

const closeProducer = async(producer) =>{
  await socket.emit('produceClose',{
    rtpCapabilities : device.rtpCapabilities,
    remoteProducerId : producer.id,
    serverside_ConsumerTransportId : producerTransport.id,
  }, async()=>{
    // await deleteVideo(false, to_erase)
    producer.close()
    videoProducer = undefined
    producer.on('trackened', ()=>{
      console.log('track ended')
      //close video tarck
    })
    producer.on('transportclose', ()=>{
      console.log('transport ended')
      //close video tarck
    })
  })
}


const closeTransport = async(video, audio, screen) =>{
  try{
    if(video || audio)
    {
      let producer;
      producer = video || audio

      await socket.emit('exitRoom',{
        rtpCapabilities : device.rtpCapabilities,
        remoteProducerId : producer.id, 
        serverside_ConsumerTransportId : producerTransport.id,
      }, async()=>{
        await deleteVideo(true)
        producer.close()
        producerTransport.close()
        Streaming.getTracks().forEach(track => track.stop());
    
        producer.on('trackened', ()=>{
          console.log('track ended')
          //close video tarck
        })
        producer.on('transportclose', ()=>{
          console.log('transport ended')
          //close video tarck
        })
      })
    }
    else{
      console.log("Noting to close")
      return;
    }
  }catch(error){
    console.log(error.message)
  }
}

// 영상 혹은 audio tag를 만드는
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

// 이거 For문 돌리는 걸로 변환시켜야할거같은데요..?
const deleteVideo = async(isProducer = false, remoteProducerId) =>{
  try{
    if(isProducer ===false) // remoteProducer가 streaming종료
    {
      const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId)
      producerToClose.consumerTransport.close()
      producerToClose.consumer.close()
      consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId)

      //프론트 작업 함
      videoContainer.removeChild(document.getElementById(`td-${remoteProducerId}`))
    }

    if(isProducer ===true)
    {
      consumerTransports.forEach(transportData =>  deleteVideo(false, transportData.producerId))
    }
    //==============================
  }catch(error){
    console.log(error)
    throw error
  }
}


btnLocalStream.addEventListener('click', getLocalStream)
btnLocalStream.disabled = false

btnLocalVideo.addEventListener('click', getLocalVideo)
btnLocalVideo.disabled = true

btnLocalScrean
btnLocalScrean.disabled = true

btnFinishStream.addEventListener('click', finishStream)
btnFinishStream.disabled = true