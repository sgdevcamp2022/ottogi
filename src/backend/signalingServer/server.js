const fs = require("fs");
const URL = require("url");
const qs = require("querystring");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const mediasoup = require("mediasoup");
// const { AwaitQueue } = require('awaitqueue');

const config = require("./config");
const { listenIp, listenPort } = config.https;
const listenIps = config.mediasoup.webRtcTransportOptions.listenIps[0];
const ip = listenIps.announcedIp || listenIps.ip;

// const Room = require('./lib/Room');
const Logger = require("./lib/Logger");
const utils = require("./lib/utils");
const cnt = require("./lib/connect_");
const manage = require("./lib/manageItem");
const _room = require("./lib/room_");
const interactiveServer = require("./lib/interactiveServer");
const interactiveClient = require("./lib/interactiveClient");

let room;
const Server = require("socket.io"); // server side

const logger = new Logger();
// const queue = new AwaitQueue();
const rooms = new Map();

let worker;
// let rooms = {}          // { roomName1: { Router, peers: [ socketId1, ... ] }, ...}
let peers = {}; // { socketId1: { roomName1, socket, transports = [id1, id2,], producers = [id1, id2,] , consumers = [id1, id2,], peerDetails }, ...}
let transports = []; // [ { socketId1, roomName1, transport, consumer }, ... ]
let producers = []; // [ { socketId1, roomName1, producer, }, ... ]
let consumers = []; // [ { socketId1, roomName1, consumer, }, ... ]

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
}

//=====================================================================================================
//=====================================================================================================
async function createMediasoupWorker() {
  worker = await mediasoup.createWorker({
    logLevel: config.mediasoup.workerSettings.logLevel,
    logTags: config.mediasoup.workerSettings.logTags,
    rtcMinPort: Number(config.mediasoup.workerSettings.rtcMinPort),
    rtcMaxPort: Number(config.mediasoup.workerSettings.rtcMaxPort),
  });
  console.log(`worker pid ${worker.pid}`);
  worker.on("died", (error) => {
    console.error("mediasoup worker has died");
    setTimeout(() => process.exit(1), 2000); //2초 안에 탈출
  });
  return worker;
}
//=====================================================================================================
async function runExpressApp() {
  expressApp = express();
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  // expressApp.use('/rooms/:roomId',express.static(__dirname + '/public'));
  expressApp.get("/test", (req, res) => {
    res.send("연결성공");
  });

  expressApp.use((error, req, res, next) => {
    console.log(req);
    if (error) {
      console.warn("Express app error,", error.message);

      error.status = error.status || (error.name === "TypeError" ? 400 : 500);

      res.statusMessage = error.message;
      res.status(error.status).send(String(error));
    } else {
      next();
    }
  });
}

//=====================================================================================================
async function runWebServer() {
  const { key, cert } = config.https.tls;
  if (!fs.existsSync(key) || !fs.existsSync(cert)) {
    console.error("SSL files are not found. check your config.js file");
    process.exit(0);
  }
  const tls = {
    cert: fs.readFileSync(config.https.tls.cert, "utf-8"),
    key: fs.readFileSync(config.https.tls.key, "utf-8"),
  };

  httpsServer = https.createServer(tls, expressApp);
  httpsServer.on("error", (err) => {
    console.error("starting web server failed:", err.message);
  });
  await new Promise((resolve) => {
    httpsServer.listen(listenPort, () => {
      console.log("server is running");
      console.log(`open https://${ip}:${listenPort} in your web browser`);
      resolve();
    });
  });
}
//=====================================================================================================

const socketMain = require("./server/index");
const broadcast = require("./server/video-broadcast");
async function runSocketServer() {
  const io = Server(httpsServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  socketMain(io);

  console.log("running WebSocketServer...");
  // logger.info('running WebSocketServer...');
}
