
const Logger = require('./Logger');
const config = require('../config');
const Bot = require('./Bot');
const mediasoup = require('mediasoup')
const Server = require('socket.io')  // server side
const logger = new Logger('connect');

let socket;
let connections;

module.exports = {
  joinroom : async({room, _socket}) =>{
    socket = _socket;
    if (socket){
      
    }
  },

  Producer : async(producerTransport, Params) => {
    Producer = await producerTransport.produce(Params) // this event will triggered when producer Transport start
    console.log(`${Params.track.kind} - ${Producer.id} confirmed`)
    Producer.on('trackened', ()=>{
      console.log('track ended')
      //close video tarck
    })
    Producer.on('transportclose', ()=>{
      console.log('transport ended')
      //close video tarck
    })
    return Producer
  },

  streamSuccess : async (audioParams, stream)=>{
    let Streaming;
    localVideo.srcObject = stream;
    Streaming = stream;
  
    audioParams= { track: stream.getAudioTracks()[0], ...audioParams };
    console.log("audioParams",audioParams);
    return {audioParams, Streaming}
  },
  
  addvideo : (videoParams, stream) =>{
    isVideoON = true
    const videoTracks = stream.getVideoTracks();
    Streaming.addTrack(videoTracks[0])
    localVideo.srcObject = null;
    localVideo.srcObject = Streaming;
    
    videoParams = { track: stream.getVideoTracks()[0], ...videoParams };
    console.log("videoParams",videoParams)
  
    return {videoParams, Streaming}
  },
}
