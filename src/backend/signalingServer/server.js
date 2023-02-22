const fs = require("fs");
const URL = require("url");
const qs = require("querystring");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const mediasoup = require("mediasoup");
// const { AwaitQueue } = require('awaitqueue');

const utils = require("./lib/utils")
const config = require("./config");
const { listenIp, listenPort } = config.https;
const listenIps = config.mediasoup.webRtcTransportOptions.listenIps[0];
const ip = listenIps.announcedIp || listenIps.ip;

const Server = require("socket.io"); // server side

const mediasoupWorkers = [];
let worker = null;
let router = null;

let httpsServer;
let expressApp;

run();
async function run() {
try {
    await createMediasoupWorkers();

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

async function createMediasoupWorkers() 
{
	const { numWorkers } = config.mediasoup;

    console.log('running %d mediasoup Workers...', numWorkers);
	for (let i = 0; i < numWorkers; ++i)
	{
		const worker = await mediasoup.createWorker(
			{
				logLevel   : config.mediasoup.workerSettings.logLevel,
				logTags    : config.mediasoup.workerSettings.logTags,
				rtcMinPort : Number(config.mediasoup.workerSettings.rtcMinPort),
				rtcMaxPort : Number(config.mediasoup.workerSettings.rtcMaxPort)
			});

		worker.on('died', () =>
		{
			console.error(
				'mediasoup Worker died, exiting  in 2 seconds... [pid:%d]', worker.pid);

			setTimeout(() => process.exit(1), 2000);
		});

		mediasoupWorkers.push(worker);

		// Create a WebRtcServer in this Worker.
		if (process.env.MEDIASOUP_USE_WEBRTC_SERVER !== 'false')
		{
			// Each mediasoup Worker will run its own WebRtcServer, so those cannot
			// share the same listening ports. Hence we increase the value in config.js
			// for each Worker.
			const webRtcServerOptions = utils.clone(config.mediasoup.webRtcServerOptions);
			const portIncrement = mediasoupWorkers.length - 1;

			for (const listenInfo of webRtcServerOptions.listenInfos)
			{
				listenInfo.port += portIncrement;
			}

			const webRtcServer = await worker.createWebRtcServer(webRtcServerOptions);

			worker.appData.webRtcServer = webRtcServer;
		}

		// Log worker resource usage every X seconds.
		setInterval(async () =>
		{
			const usage = await worker.getResourceUsage();

			console.info('mediasoup Worker resource usage [pid:%d]: %o', worker.pid, usage);
		}, 120000);
	}
}

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

const mediaCodecs = config.mediasoup.routerOptions.mediaCodecs;
router = await worker.createRouter({ mediaCodecs });
console.log("-- mediasoup worker start. --");
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
        rejectUnauthorized: false,
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
        })}
    );
}
//=====================================================================================================

const socketMain = require("./server/video-broadcast");
async function runSocketServer() {
    const io = Server(httpsServer, {
        cors: {
            origin: `*`,
            methods: ['GET', 'POST'],
            transports: ['websocket'],
        },
    });
    socketMain(io, mediasoupWorkers);

    console.log('running WebSocketServer...');
}
