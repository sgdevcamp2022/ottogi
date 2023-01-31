const io = require('socket.io-client') // client-side
const mediasoupClient = require('mediasoup-client')
const socket = io('/mediasoup')

// TCP/IP 통신은 일반적으로 sokect통신 이라고 부른다. 

socket.on('connection-success', ({socketId, existProducer}) => {
  console.log('--', socketId, 'Enters the room.', existProducer);

})

// if we don't supply it will be null
const roomName = window.location.pathname.split('/')[2]

let Streaming
let isStreaming = false

let device;
let rtpCapabilities;
let producerTransport;
let audioProducer;
let videoProducer;
let consumerTransports = [];

let params = {
  //mediasoup params
  encoding : [
    {
      rid : 'r0',
      maxBitrate : 100000,
      scalabilityMode : 'S1T3'
    },
    {
      rid : 'r1',
      maxBitrate : 300000,
      scalabilityMode : 'S1T3'
    },
    {
      rid : 'r2',
      maxBitrate : 900000,
      scalabilityMode : 'S1T3'
    },
  ],
  codecOptions : {
    videoGoogleStartBitrate : 1000,
  }
}

let audioParams;
let videoParams = { params };
let consumingTransports = [];

// about streaming
const getLocalStream = () =>{
  if(isStreaming  === true){
    console.log("already streaming")
    return
  }
  navigator.mediaDevices.getUserMedia({
    audio : true,
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
  }).then(streamSuccess)
  .catch(error=>{
    console.log(error.message)
  })
}

const streamSuccess = (stream)=>{
  isStreaming = true
  localVideo.srcObject = stream;
  Streaming = stream

  audioParams= { track: stream.getAudioTracks()[0], ...audioParams };
  videoParams = { track: stream.getVideoTracks()[0], ...videoParams };

  console.log("videoParams",videoParams)
  joinRoom() 
}
// 
const joinRoom = () =>{ // to make router or go to router
  socket.emit('joinRoom', {roomName}, (data) => {
    console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
    //we assign to local variable and will be used
    // console.log('data', data)
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

//============================================================================================
//========================== For create Send Transport =======================================
//============================================================================================
const createSendTransport = async ()=>{
  // TODO : 영상 통화 및 음성통화 분리시 consumer 부분 변경이 필요함
  //        어떠한 방식으로 접근을 했는지 state를 알려줘야하는게 중요한 부분 같음
  await socket.emit('createWebRTCTransport',{consumer : false}, ({params})=>{
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
        errback(error)
      }
    })
    producerTransport.on('produce', async(parameters, callback, errback) =>{
      console.log(parameters)
      try{
        // Room에 Producer가 있으면, router를 생성할 필요가 없기 떄문에 Producer가 있는지 물어봐야함 
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

  audioProducer = await producerTransport.produce(audioParams) // this event will triggered when producer Transport start
  console.log(`audio - ${audioProducer.id} confirmed`)
  audioProducer.on('trackened', ()=>{
    console.log('track ended')
    //close audio tarck
  })
  audioProducer.on('transportclose', ()=>{
    console.log('transport ended')
    //close audio tarck
  })

  videoProducer = await producerTransport.produce(videoParams) // this event will triggered when producer Transport start
  console.log(`video - ${videoProducer.id} confirmed`)
  videoProducer.on('trackened', ()=>{
    console.log('track ended')
    //close video tarck
  })
  videoProducer.on('transportclose', ()=>{
    console.log('transport ended')
    //close video tarck
  })
}

// 23.01.29 - kind를 넘겨받아야 복제 되는 경우 방지가능할듯... -> 23.01.31 consumingTransport를 이용하여 해결 
// server have to inform the client of a new producer just joined // and ready for consume
socket.on('new-producer',({producerId}) => signalNewConsumerTransport(producerId))
const getProducers = () => {
  socket.emit('getProducers', (producerIds) =>{
    console.log("producer Ids", producerIds)
    producerIds.forEach(id => signalNewConsumerTransport(id)) 
    // producerIds.forEach(signalNewConsumerTransport)
  })
}
//============================================================================================
//============================================================================================
//============================================================================================


//============================================================================================
//======================== For create Receiver Transport =====================================
//============================================================================================
const signalNewConsumerTransport = async (remoteProducerId)=>{
  //check if we are already consuming the remoteProducerId
  if (consumingTransports.includes(remoteProducerId)) {
    return;}
  consumingTransports.push(remoteProducerId);

  await socket.emit('createWebRTCTransport',{consumer : true}, ({params})=>{
    if (params.error){
      console.log(params.error)
      return
    }

    console.log(`PARAMS... ${params}`)
    let consumerTransport;
    try {
      consumerTransport = device.createRecvTransport(params)
    } catch (error) {
      // exceptions: 
      // InvalidStateError - if not loaded
      // TypeError - if wrong arguments.
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
          // tell the transport that parameters were transmitted
          callback()
      }catch(error){
        errback(error)
      }
    })
    
    connectRecvTransport(consumerTransport, remoteProducerId, params.id, params.kind)
    // [ params.id ] is "server side" consumer transpor id
    // this is transported by server 'createWebRTCTransport' 
  })
}

/// 이부분에서 video audio가 복제되서 넘어옴
const connectRecvTransport = async(consumerTransport, remoteProducerId, serverside_ConsumerTransportId, serverside_ConsumerKind)=>{
  await socket.emit('consume',{
    rtpCapabilities : device.rtpCapabilities,
    remoteProducerId,
    serverside_ConsumerTransportId,
    serverside_ConsumerKind,
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
//============ Create Video
    createTrack(false, remoteProducerId, params.kind)
//========================================
    const {track} = await consumer
    console.log(track)
    // remoteVideo.srcObject = new MediaStream([track]) //this is for 1-1 connection 
    document.getElementById(remoteProducerId).srcObject = new MediaStream([track])
    // socket.emit('consumer-resume')//this is for 1-1 connection 
    socket.emit('consumer-resume', {serverside_ConsumerId : params.serverside_ConsumerId})
  })
}
//============================================================================================
//============================================================================================
//============================================================================================



// for prodcer(getLocalStream) -> get capability + createdevice + create send transport + connect sendTranseport & produce
// fur consumer(go consume) -> get capability + createdevice + create receive transport + connect create receive transport

socket.on('producer-closed', async({remoteProducerId})=>{
  //server notification is received when producer closed streaming
  //we need to close the client-side consumer and associated transport
//========= 상대방 종료시 데이터 삭제
  await deleteVideo(false, remoteProducerId)
  consumingTransports.pop(remoteProducerId)
//==============================
})

const finishStream = async () =>{ // ProducerId : 내 아이디 , remoteProducerIds : Consumers의 정보들 
  /// 정보 지워버리기.
  // can find with consumerTransports
  if(isStreaming === false){
    console.log("already Finished")
    return
  }

  // 23.01.29 audioProducer 및 videoProducer 추가할 필요 있음
  if(videoProducer)
  {
    console.log("Producer exited room")
    await socket.emit('exitRoom',{
      rtpCapabilities : device.rtpCapabilities,
      remoteProducerId : videoProducer.id,
      serverside_ConsumerTransportId : producerTransport.id,
    }, async()=>{
      await deleteVideo(true)
      // producer.enabled = false
      // producerTransport.enabled = false
      // Streaming.getVideoTracks()[0].enabled = false
      videoProducer.close()
      Streaming.getTracks().forEach(track => track.stop());

      videoProducer.on('trackened', ()=>{
        console.log('track ended')
        //close video tarck
      })
      videoProducer.on('transportclose', ()=>{
        console.log('transport ended')
        //close video tarck
      })

      //23.01.29 Params의 Track이 업데이트가 제대로 안되었기 때문에 pamras undefine 진행
      //이랬더니 track 정보 및 params 정보가 일체로 업데이트가 진행되면서 정상적으로 동작했다.
      videoParams = undefined
      audioParams = undefined
      isStreaming = false
      consumingTransports = [] // Producing이 끝나 consuming을 하지 않음
    })
  }
}

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

const deleteVideo = async(isProducer = false, remoteProducerId) =>{
  try{
    if(isProducer ===false) // remoteProducer가 streaming종료
    {
      const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId)
      producerToClose.consumerTransport.close()
      producerToClose.consumer.close()
      consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId)
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



btnLocalVideo.addEventListener('click', getLocalStream)
btnFinishStream.addEventListener('click', finishStream)