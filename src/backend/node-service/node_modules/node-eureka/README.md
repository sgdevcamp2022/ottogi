# Eureka.js
A JavaScript implementation of a client for Eureka (https://github.com/Netflix/eureka), the Netflix OSS service registry.

![](./img/eureka-js.jpg)


## Usage

First, install the module into your node project:

```shell
npm install node-eureka --save
```

### Add Eureka client to a Node application.

The Eureka module exports a JavaScript function that can be constructed.

```javascript
import Eureka from 'node-eureka';

// Or, if you're not using a transpiler:
const Eureka = require('node-eureka').Eureka;

// example configuration
const client = new Eureka({
  // application instance information
  instance: {
    app: 'jqservice',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: 8080,
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: '192.168.99.100',
    port: 32768,
  },
});
```

### Register with Eureka & start application heartbeats

```javascript
client.start();
```

### De-register with Eureka & stop application heartbeats

```javascript
client.stop();
```

### Get Instances By App ID

```javascript
const instances = client.getInstancesByAppId('YOURSERVICE');
```

### Get Instances By Vip Address

```javascript
const instances = client.getInstancesByVipAddress('YOURSERVICEVIP');
```

## Advanced Configuration Options
option | default value | description
---- | --- | ---
`logger` | console logging | logger implementation for the client to use
`shouldUseDelta` | false | Experimental mode to fetch deltas from eureka instead of full registry on update
`eureka.maxRetries` | `3` | Number of times to retry all requests to eureka
`eureka.requestRetryDelay` | `500` | milliseconds to wait between retries. This will be multiplied by the # of failed retries.
`eureka.heartbeatInterval` | `30000` | milliseconds to wait between heartbeats
`eureka.registryFetchInterval` | `30000` | milliseconds to wait between registry fetches
`eureka.registerWithEureka` | `true` | enable/disable Eureka registration
`eureka.fetchRegistry` | `true` | enable/disable registry fetching
`eureka.filterUpInstances` | `true` | enable/disable filtering of instances with status === `UP`
`eureka.servicePath` | `/eureka/v2/apps/` | path to eureka REST service
`eureka.ssl` | `false` | enable SSL communication with Eureka server

## Events

Eureka client is an instance of `EventEmitter` and provides the following events for consumption:

event | data provided | description
---- | --- | ---
`started` | N/A | Fired when eureka client is fully registered and all registries have been updated.
`registered` | N/A | Fired when the eureka client is registered with eureka.
`deregistered` | N/A | Fired when the eureka client is deregistered with eureka.
`heartbeat` | N/A | Fired when the eureka client has successfully renewed it's lease with eureka.
`registryUpdated` | N/A | Fired when the eureka client has successfully update it's registries.

## Debugging

The library uses [request](https://github.com/request/request) for all service calls, and debugging can be turned on by passing `NODE_DEBUG=request` when you start node. This allows you you double-check the URL being called as well as other request properties.

```shell
DEBUG=* node example.js
```

## Known Issues

### 400 Bad Request Errors from Eureka Server

Later versions of Eureka require a slightly different JSON POST body on registration. If you are seeing 400 errors on registration it's probably an issue with your configuration and it could be the formatting differences below. The history behind this is unclear and there's a discussion [here](https://github.com/Netflix-Skunkworks/zerotodocker/issues/46). The main differences are:

- `port` is now an object with 2 required fields `$` and `@enabled`.
- `dataCenterInfo` has an `@class` property.

See below for an example:

```javascript
const client = new Eureka({
  // application instance information
  instance: {
    app: 'jqservice',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$': 8080,
      '@enabled': true,
    },
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: '192.168.99.100',
    port: 32768,
  },
});
```
If you are planning on connecting to a eureka service in AWS you will need to add the corresponding `dataCenterInfo` information:

```javascript

  dataCenterInfo: {
   '@class': 'com.netflix.appinfo.AmazonInfo',
   name: 'Amazon',
  }
```

### 404 Not Found Errors from Eureka Server

This probably means that the Eureka REST service is located on a different path in your environment. The default is `http://<EUREKA_HOST>/eureka/v2/apps`, but depending on your setup you may need to set `eureka.servicePath` in your configuration to another path. The REST service could be hung under `/eureka/apps/` or possibly `/apps/`.

### Usage with Spring Cloud

If you are using Spring Cloud you'll likely need the following settings:

- Set `eureka.servicePath` in your config to `/eureka/apps/`.
- Use the newer style of the configuration [here](#400-bad-request-errors-from-eureka-server) or Spring Cloud Eureka will throw a 500 error.
- Set `statusPageUrl` to a valid URL for your application, Spring Cloud [seems to require this](https://github.com/qingyang-id/node-eureka/issues/113) when the instance information is parsed.
- Put single quotes around boolean `@enabled`. Unfortunately, a 500 error regarding parsing [seems to occur](https://github.com/qingyang-id/node-eureka/issues/63) without that.

Below is an example configuration that should work with Spring Cloud Eureka server:

```javascript
const client = new Eureka({
  instance: {
    app: 'jqservice',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:8080/info',
    port: {
      '$': 8080,
      '@enabled': 'true',
    },
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: '192.168.99.100',
    port: 32768,
    servicePath: '/eureka/apps/'
  },
});
```

## License

Eurekajs is [MIT licensed](LICENSE).
