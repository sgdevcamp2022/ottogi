module.exports = {
  listenIp: '0.0.0.0',
  listenPort: 3000,
  // sslCrt: '/etc/ssl/certs/ssl-cert-snakeoil.pem',
  // sslKey: '/etc/ssl/private/ssl-cert-snakeoil.key',
  cert : process.env.HTTPS_CERT_FULLCHAIN || `${__dirname}/server/certs/cert.pem`,// have to change for get `${__dirname}/server/certs/fullchain.pem`,
  key  : process.env.HTTPS_CERT_PRIVKEY ||  `${__dirname}/server/certs/key.pem`, // have to change for get`${__dirname}/server/certs/privkey.pem`,
  mediasoup: {
    // Worker settings
    worker: {
      rtcMinPort: 10000,
      rtcMaxPort: 10100,
      logLevel: 'warn',
      logTags: [
        'info',
        'ice',
        'dtls',
        'rtp',
        'srtp',
        'rtcp',
        // 'rtx',
        // 'bwe',
        // 'score',
        // 'simulcast',
        // 'svc'
      ],
    },
    // Router settings
    router: {
      mediaCodecs:
        [
          {
            kind: 'audio',
            mimeType: 'audio/opus',
            clockRate: 48000,
            channels: 2
          },
          {
            kind: 'video',
            mimeType: 'video/VP8',
            clockRate: 90000,
            parameters:
              {
                'x-google-start-bitrate': 1000
              }
          },
        ]
    },
    // WebRtcTransport settings
    webRtcTransport: {
      listenIps: [
        {
          ip: '127.0.0.1',
          announcedIp: null,
          // 제가 사용한 기본 default값 입니다. 
          // ip: '0.0.0.0', // server side ip which have to change
          // announcedIp: '127.0.0.1', // // this is our hostmachine
        }
      ],
      maxIncomingBitrate: 1500000,
      initialAvailableOutgoingBitrate: 1000000,
    }
  }
};
