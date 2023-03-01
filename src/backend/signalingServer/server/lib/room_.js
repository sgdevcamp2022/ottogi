const EventEmitter = require('events').EventEmitter;
const Logger = require('./Logger');
const config = require('../config');
const Bot = require('./Bot');

const logger = new Logger('room');


module.exports = {
  create : async ({ mediasoupWorker, roomName }) =>{
    // logger.info('create() [roomId:%s]', roomId);
    console.log('create() [roomName:%s]', roomName);
    // Create a protoo Room instance.
    // Router media codecs.
    let peers = {}
    const { mediaCodecs } = config.mediasoup.routerOptions;
  
    // Create a mediasoup Router.
    const mediasoupRouter = await mediasoupWorker.createRouter({ mediaCodecs });
    console.log(`Router Id : ${mediasoupRouter.id}`)
    // Create a mediasoup AudioLevelObserver.
    const audioLevelObserver = await mediasoupRouter.createAudioLevelObserver(
      {
        maxEntries : 1,
        threshold  : -80,
        interval   : 800
      });
  
    // Create a mediasoup ActiveSpeakerObserver.
    const activeSpeakerObserver = await mediasoupRouter.createActiveSpeakerObserver();
  
    const bot = await Bot.create({ mediasoupRouter });
    
    const params = {
        roomName,
        webRtcServer : mediasoupWorker.appData.webRtcServer,
        mediasoupRouter,
        audioLevelObserver,
        activeSpeakerObserver,
        bot,
        peers
    }

    return params
  },
}	
