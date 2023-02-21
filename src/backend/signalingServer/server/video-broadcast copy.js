
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

// function socketMain(io) {
//   const broadcastIO = io.of('/video-broadcast');
//   broadcastIO.on('connection', (socket) => {
//       console.log('broadcast');
//       socket.on('disconnect', function () {
//           // close user connection
//           console.log(
//               'client disconnected. socket id=' +
//                   getId(socket) +
//                   '  , total clients=' +
//                   getClientCount()
//           );
//           cleanUpPeer(socket);
//       });

//       socket.on('getRouterRtpCapabilities', (data, callback) => {
//           if (router) {
//               console.log(
//                   'getRouterRtpCapabilities: ',
//                   router.rtpCapabilities
//               );
//               sendResponse(router.rtpCapabilities, callback);
//           } else {
//               sendReject({ text: 'ERROR- router NOT READY' }, callback);
//           }
//       });

//       // --- producer ----
//       socket.on('createProducerTransport', async (data, callback) => {
//           console.log('-- createProducerTransport ---');
//           producerSocketId = getId(socket);
//           const { transport, params } = await createTransport();
//           producerTransport = transport;
//           producerTransport.observer.on('close', () => {
//               if (videoProducer) {
//                   videoProducer.close();
//                   videoProducer = null;
//               }
//               if (audioProducer) {
//                   audioProducer.close();
//                   audioProducer = null;
//               }
//               producerTransport = null;
//           });
//           //console.log('-- createProducerTransport params:', params);
//           sendResponse(params, callback);
//       });

//       socket.on('connectProducerTransport', async (data, callback) => {
//           await producerTransport.connect({
//               dtlsParameters: data.dtlsParameters,
//           });
//           sendResponse({}, callback);
//       });

//       socket.on('produce', async (data, callback) => {
//           const { kind, rtpParameters } = data;
//           console.log('-- produce --- kind=', kind);
//           if (kind === 'video') {
//               videoProducer = await producerTransport.produce({
//                   kind,
//                   rtpParameters,
//               });
//               videoProducer.observer.on('close', () => {
//                   console.log('videoProducer closed ---');
//               });
//               sendResponse({ id: videoProducer.id }, callback);
//           } else if (kind === 'audio') {
//               audioProducer = await producerTransport.produce({
//                   kind,
//                   rtpParameters,
//               });
//               audioProducer.observer.on('close', () => {
//                   console.log('audioProducer closed ---');
//               });
//               sendResponse({ id: audioProducer.id }, callback);
//           } else {
//               console.error('produce ERROR. BAD kind:', kind);
//               //sendResponse({}, callback);
//               return;
//           }

//           // inform clients about new producer
//           console.log('--broadcast newProducer -- kind=', kind);
//           socket.broadcast.emit('newProducer', { kind: kind });
//       });

//       // --- consumer ----
//       socket.on('createConsumerTransport', async (data, callback) => {
//           console.log('-- createConsumerTransport ---');
//           const { transport, params } = await createTransport();
//           addConsumerTrasport(getId(socket), transport);
//           transport.observer.on('close', () => {
//               const id = getId(socket);
//               console.log('--- consumerTransport closed. --');
//               let consumer = getVideoConsumer(getId(socket));
//               if (consumer) {
//                   consumer.close();
//                   removeVideoConsumer(id);
//               }
//               consumer = getAudioConsumer(getId(socket));
//               if (consumer) {
//                   consumer.close();
//                   removeAudioConsumer(id);
//               }
//               removeConsumerTransport(id);
//           });
//           //console.log('-- createTransport params:', params);
//           sendResponse(params, callback);
//       });

//       socket.on('connectConsumerTransport', async (data, callback) => {
//           console.log('-- connectConsumerTransport ---');
//           let transport = getConsumerTrasnport(getId(socket));
//           if (!transport) {
//               console.error('transport NOT EXIST for id=' + getId(socket));
//               sendResponse({}, callback);
//               return;
//           }
//           await transport.connect({ dtlsParameters: data.dtlsParameters });
//           sendResponse({}, callback);
//       });

//       socket.on('consume', async (data, callback) => {
//           const kind = data.kind;
//           console.log('-- consume --kind=' + kind);

//           if (kind === 'video') {
//               if (videoProducer) {
//                   let transport = getConsumerTrasnport(getId(socket));
//                   if (!transport) {
//                       console.error(
//                           'transport NOT EXIST for id=' + getId(socket)
//                       );
//                       return;
//                   }
//                   const { consumer, params } = await createConsumer(
//                       transport,
//                       videoProducer,
//                       data.rtpCapabilities
//                   ); // producer must exist before consume
//                   //subscribeConsumer = consumer;
//                   const id = getId(socket);
//                   addVideoConsumer(id, consumer);
//                   consumer.observer.on('close', () => {
//                       console.log('consumer closed ---');
//                   });
//                   consumer.on('producerclose', () => {
//                       console.log('consumer -- on.producerclose');
//                       consumer.close();
//                       removeVideoConsumer(id);

//                       // -- notify to client ---
//                       socket.emit('producerClosed', {
//                           localId: id,
//                           remoteId: producerSocketId,
//                           kind: 'video',
//                       });
//                   });

//                   console.log('-- consumer ready ---');
//                   sendResponse(params, callback);
//               } else {
//                   console.log('-- consume, but video producer NOT READY');
//                   const params = {
//                       producerId: null,
//                       id: null,
//                       kind: 'video',
//                       rtpParameters: {},
//                   };
//                   sendResponse(params, callback);
//               }
//           } else if (kind === 'audio') {
//               if (audioProducer) {
//                   let transport = getConsumerTrasnport(getId(socket));
//                   if (!transport) {
//                       console.error(
//                           'transport NOT EXIST for id=' + getId(socket)
//                       );
//                       return;
//                   }
//                   const { consumer, params } = await createConsumer(
//                       transport,
//                       audioProducer,
//                       data.rtpCapabilities
//                   ); // producer must exist before consume
//                   //subscribeConsumer = consumer;
//                   const id = getId(socket);
//                   addAudioConsumer(id, consumer);
//                   consumer.observer.on('close', () => {
//                       console.log('consumer closed ---');
//                   });
//                   consumer.on('producerclose', () => {
//                       console.log('consumer -- on.producerclose');
//                       consumer.close();
//                       removeAudioConsumer(id);

//                       // -- notify to client ---
//                       socket.emit('producerClosed', {
//                           localId: id,
//                           remoteId: producerSocketId,
//                           kind: 'audio',
//                       });
//                   });

//                   console.log('-- consumer ready ---');
//                   sendResponse(params, callback);
//               } else {
//                   console.log('-- consume, but audio producer NOT READY');
//                   const params = {
//                       producerId: null,
//                       id: null,
//                       kind: 'audio',
//                       rtpParameters: {},
//                   };
//                   sendResponse(params, callback);
//               }
//           } else {
//               console.error('ERROR: UNKNOWN kind=' + kind);
//           }
//       });

//       socket.on('resume', async (data, callback) => {
//           const kind = data.kind;
//           console.log('-- resume -- kind=' + kind);
//           if (kind === 'video') {
//               let consumer = getVideoConsumer(getId(socket));
//               if (!consumer) {
//                   console.error('consumer NOT EXIST for id=' + getId(socket));
//                   sendResponse({}, callback);
//                   return;
//               }
//               await consumer.resume();
//               sendResponse({}, callback);
//           } else {
//               console.warn('NO resume for audio');
//           }
//       });

//       // ---- sendback welcome message with on connected ---
//       const newId = getId(socket);
//       sendback(socket, { type: 'welcome', id: newId });

//       // --- send response to client ---
//       function sendResponse(response, callback) {
//           //console.log('sendResponse() callback:', callback);
//           callback(null, response);
//       }

//       // --- send error to client ---
//       function sendReject(error, callback) {
//           callback(error.toString(), null);
//       }

//       function sendback(socket, message) {
//           socket.emit('message', message);
//       }

//       function getId(socket) {
//           return socket.id;
//       }

//       const getClientCount = async () => {
//           // WARN: undocumented method to get clients number

//           var nspSockets = await broadcastIO.allSockets();
//           console.log('nspSockets');
//           console.log(nspSockets);
//       };

//       function cleanUpPeer(socket) {
//           const id = getId(socket);
//           const consumer = getVideoConsumer(id);
//           if (consumer) {
//               consumer.close();
//               removeVideoConsumer(id);
//           }

//           const transport = getConsumerTrasnport(id);
//           if (transport) {
//               transport.close();
//               removeConsumerTransport(id);
//           }

//           if (producerSocketId === id) {
//               console.log('---- cleanup producer ---');
//               if (videoProducer) {
//                   videoProducer.close();
//                   videoProducer = null;
//               }
//               if (audioProducer) {
//                   audioProducer.close();
//                   audioProducer = null;
//               }

//               if (producerTransport) {
//                   producerTransport.close();
//                   producerTransport = null;
//               }

//               producerSocketId = null;

//               // --- clenaup all consumers ---
//               //console.log('---- cleanup clenaup all consumers ---');
//               //removeAllConsumers();
//           }
//       }
//   });

//   // ========= mediasoup ===========
//   const mediasoup = require('mediasoup');
//   const mediasoupOptions = {
//       // Worker settings
//       worker: {
//           rtcMinPort: 10000,
//           rtcMaxPort: 10100,
//           logLevel: 'warn',
//           logTags: [
//               'info',
//               'ice',
//               'dtls',
//               'rtp',
//               'srtp',
//               'rtcp',
//               // 'rtx',
//               // 'bwe',
//               // 'score',
//               // 'simulcast',
//               // 'svc'
//           ],
//       },
//       // Router settings
//       router: {
//           mediaCodecs: [
//               {
//                   kind: 'audio',
//                   mimeType: 'audio/opus',
//                   clockRate: 48000,
//                   channels: 2,
//               },
//               {
//                   kind: 'video',
//                   mimeType: 'video/VP8',
//                   clockRate: 90000,
//                   parameters: {
//                       'x-google-start-bitrate': 1000,
//                   },
//               },
//           ],
//       },
//       // WebRtcTransport settings
//       webRtcTransport: {
//           listenIps: [{ ip: '127.0.0.1', announcedIp: null }],
//           enableUdp: true,
//           enableTcp: true,
//           preferUdp: true,
//           maxIncomingBitrate: 1500000,
//           initialAvailableOutgoingBitrate: 1000000,
//       },
//   };

//   let worker = null;
//   let router = null;
//   let producerTransport = null;
//   let videoProducer = null;
//   let audioProducer = null;
//   let producerSocketId = null;
//   //let consumerTransport = null;
//   //let subscribeConsumer = null;

//   async function startWorker() {
//       const mediaCodecs = mediasoupOptions.router.mediaCodecs;
//       worker = await mediasoup.createWorker();
//       router = await worker.createRouter({ mediaCodecs });
//       //producerTransport = await router.createWebRtcTransport(mediasoupOptions.webRtcTransport);
//       console.log('-- mediasoup worker start. --');
//   }

//   startWorker();

//   //
//   // Room {
//   //   id,
//   //   transports[],
//   //   consumers[],
//   //   producers[],
//   // }
//   //

//   // --- multi-consumers --
//   let transports = {};
//   let videoConsumers = {};
//   let audioConsumers = {};

//   function getConsumerTrasnport(id) {
//       return transports[id];
//   }

//   function addConsumerTrasport(id, transport) {
//       transports[id] = transport;
//       console.log(
//           'consumerTransports count=' + Object.keys(transports).length
//       );
//   }

//   function removeConsumerTransport(id) {
//       delete transports[id];
//       console.log(
//           'consumerTransports count=' + Object.keys(transports).length
//       );
//   }

//   function getVideoConsumer(id) {
//       return videoConsumers[id];
//   }

//   function addVideoConsumer(id, consumer) {
//       videoConsumers[id] = consumer;
//       console.log(
//           'videoConsumers count=' + Object.keys(videoConsumers).length
//       );
//   }

//   function removeVideoConsumer(id) {
//       delete videoConsumers[id];
//       console.log(
//           'videoConsumers count=' + Object.keys(videoConsumers).length
//       );
//   }

//   function getAudioConsumer(id) {
//       return audioConsumers[id];
//   }

//   function addAudioConsumer(id, consumer) {
//       audioConsumers[id] = consumer;
//       console.log(
//           'audioConsumers count=' + Object.keys(audioConsumers).length
//       );
//   }

//   function removeAudioConsumer(id) {
//       delete audioConsumers[id];
//       console.log(
//           'audioConsumers count=' + Object.keys(audioConsumers).length
//       );
//   }

//   function removeAllConsumers() {
//       for (const key in videoConsumers) {
//           const consumer = videoConsumers[key];
//           console.log('key=' + key + ',  consumer:', consumer);
//           consumer.close();
//           delete videoConsumers[key];
//       }
//       console.log(
//           'removeAllConsumers videoConsumers count=' +
//               Object.keys(videoConsumers).length
//       );

//       for (const key in audioConsumers) {
//           const consumer = audioConsumers[key];
//           console.log('key=' + key + ',  consumer:', consumer);
//           consumer.close();
//           delete audioConsumers[key];
//       }
//   }

//   async function createTransport() {
//       const transport = await router.createWebRtcTransport(
//           mediasoupOptions.webRtcTransport
//       );
//       console.log('-- create transport id=' + transport.id);

//       return {
//           transport: transport,
//           params: {
//               id: transport.id,
//               iceParameters: transport.iceParameters,
//               iceCandidates: transport.iceCandidates,
//               dtlsParameters: transport.dtlsParameters,
//           },
//       };
//   }

//   async function createConsumer(transport, producer, rtpCapabilities) {
//       let consumer = null;
//       if (
//           !router.canConsume({
//               producerId: producer.id,
//               rtpCapabilities,
//           })
//       ) {
//           console.error('can not consume');
//           return;
//       }

//       //consumer = await producerTransport.consume({ // NG: try use same trasport as producer (for loopback)
//       consumer = await transport
//           .consume({
//               // OK
//               producerId: producer.id,
//               rtpCapabilities,
//               paused: producer.kind === 'video',
//           })
//           .catch((err) => {
//               console.error('consume failed', err);
//               return;
//           });

//       //if (consumer.type === 'simulcast') {
//       //  await consumer.setPreferredLayers({ spatialLayer: 2, temporalLayer: 2 });
//       //}

//       return {
//           consumer: consumer,
//           params: {
//               producerId: producer.id,
//               id: consumer.id,
//               kind: consumer.kind,
//               rtpParameters: consumer.rtpParameters,
//               type: consumer.type,
//               producerPaused: consumer.producerPaused,
//           },
//       };
//   }
// }
// module.exports = socketMain;