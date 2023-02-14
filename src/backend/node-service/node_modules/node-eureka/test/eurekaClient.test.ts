import { expect } from 'chai'
import { EventEmitter } from 'events'
import { join } from 'path'
import merge from 'lodash/merge'

import Eureka from '../lib/eurekaClient'

function makeConfig(overrides = {}) {
  const config = {
    instance: {
      app: 'app',
      vipAddress: '1.2.2.3',
      hostName: 'myhost',
      port: 9999,
      dataCenterInfo: {
        name: 'MyOwn',
      },
    },
    eureka: { host: '127.0.0.1', port: 9999, maxRetries: 0 },
  }
  return merge({}, config, overrides)
}

describe('Eureka client', () => {
  describe('Eureka()', () => {
    it('should extend EventEmitter', () => {
      expect(new Eureka(makeConfig())).to.be.instanceof(EventEmitter)
    })

    it('should throw an error if no config is found', () => {
      function fn() {
        return new Eureka()
      }

      expect(fn).to.throw()
    })

    it('should construct with the correct configuration values', () => {
      function shouldThrow() {
        return new Eureka()
      }

      function noApp() {
        return new Eureka({
          instance: {
            vipAddress: true,
            port: true,
            dataCenterInfo: {
              name: 'MyOwn',
            },
          },
          eureka: {
            host: true,
            port: true,
          },
        })
      }

      function shouldWork() {
        return new Eureka({
          instance: {
            app: true,
            vipAddress: true,
            port: true,
            dataCenterInfo: {
              name: 'MyOwn',
            },
          },
          eureka: {
            host: true,
            port: true,
          },
        })
      }

      function shouldWorkNoInstance() {
        return new Eureka({
          eureka: {
            registerWithEureka: false,
            host: true,
            port: true,
          },
        })
      }

      expect(shouldThrow).to.throw()
      expect(noApp).to.throw(/app/)
      expect(shouldWork).to.not.throw()
      expect(shouldWorkNoInstance).to.not.throw()
    })

    it('should throw when configured to useDns without setting ec2Region', () => {
      function shouldThrow() {
        return new Eureka({
          instance: {
            app: true,
            vipAddress: true,
            port: true,
            dataCenterInfo: {
              name: 'MyOwn',
            },
          },
          eureka: {
            host: true,
            port: true,
            useDns: true,
          },
        })
      }

      expect(shouldThrow).to.throw(/ec2Region/)
    })
  })

  describe('get instanceId()', () => {
    it('should return the configured instance id', () => {
      const instanceId = 'test_id'
      const config = makeConfig({
        instance: {
          instanceId,
        },
      })
      const client = new Eureka(config)
      expect(client.instanceId).to.equal(instanceId)
    })

    it('should return hostname for non-AWS datacenters', () => {
      const config = makeConfig()
      const client = new Eureka(config)
      expect(client.instanceId).to.equal('myhost')
    })

    it('should return instance ID for AWS datacenters', () => {
      const config = makeConfig({
        instance: {
          dataCenterInfo: {
            name: 'Amazon',
            metadata: { 'instance-id': 'i123' },
          },
        },
      })
      const client = new Eureka(config)
      expect(client.instanceId).to.equal('i123')
    })
  })

  describe('start()', () => {
    describe('startHeartbeats()', () => {
      let client
      let renewSpy
      let clock

      it('should call renew on interval', () => {
        client.startHeartbeats()
        clock.tick(30000)
        expect(renewSpy).to.have.been.calledOnce
        clock.tick(30000)
        expect(renewSpy).to.have.been.calledTwice
      })
    })

    describe('startRegistryFetches()', () => {
      let client
      let fetchRegistrySpy
      let clock
      it('should call renew on interval', () => {
        client.startRegistryFetches()
        clock.tick(30000)
        expect(fetchRegistrySpy).to.have.been.calledOnce
        clock.tick(30000)
        expect(fetchRegistrySpy).to.have.been.calledTwice
      })
    })

    describe('eureka-client.yml', () => {
      it('should throw error on malformed config file', () => {
        function malformed() {
          return new Eureka(
            makeConfig({
              cwd: join(__dirname, 'fixtures'),
              filename: 'malformed-config',
            }),
          )
        }

        expect(malformed).to.throw(Error)
      })
      it('should not throw error on malformed config file', () => {
        function missingFile() {
          return new Eureka(
            makeConfig({
              cwd: join(__dirname, 'fixtures'),
              filename: 'missing-config',
            }),
          )
        }

        expect(missingFile).to.not.throw()
      })
    })

    describe('validateConfig()', () => {
      let config
      beforeEach(() => {
        config = makeConfig({
          instance: { dataCenterInfo: { name: 'Amazon' } },
        })
      })

      it('should throw an exception with a missing instance.app', () => {
        function badConfig() {
          delete config.instance.app
          return new Eureka(config)
        }

        expect(badConfig).to.throw(TypeError)
      })

      it('should throw an exception with a missing instance.vipAddress', () => {
        function badConfig() {
          delete config.instance.vipAddress
          return new Eureka(config)
        }

        expect(badConfig).to.throw(TypeError)
      })

      it('should throw an exception with a missing instance.port', () => {
        function badConfig() {
          delete config.instance.port
          return new Eureka(config)
        }

        expect(badConfig).to.throw(TypeError)
      })

      it('should throw an exception with a missing instance.dataCenterInfo', () => {
        function badConfig() {
          delete config.instance.dataCenterInfo
          return new Eureka(config)
        }

        expect(badConfig).to.throw(TypeError)
      })

      it('should throw an exception with an invalid request middleware', () => {
        function badConfig() {
          config.requestMiddleware = 'invalid middleware'
          return new Eureka(config)
        }

        expect(badConfig).to.throw(TypeError)
      })
    })

    describe('getInstancesByAppId()', () => {
      let client
      let config
      beforeEach(() => {
        config = makeConfig()
        client = new Eureka(config)
      })

      it('should throw an exception if no appId is provided', () => {
        function noAppId() {
          client.getInstancesByAppId()
        }

        expect(noAppId).to.throw(Error)
      })

      it('should return a list of instances if appId is registered', () => {
        const appId = 'THESERVICENAME'
        const expectedInstances = [{ host: '127.0.0.1' }]
        client.cache.app[appId] = expectedInstances
        const actualInstances = client.getInstancesByAppId(appId)
        expect(actualInstances).to.equal(expectedInstances)
      })

      it('should return empty array if no instances were found for given appId', () => {
        expect(client.getInstancesByAppId('THESERVICENAME')).to.deep.equal([])
      })
    })

    describe('getInstancesByVipAddress()', () => {
      let client
      let config
      beforeEach(() => {
        config = makeConfig()
        client = new Eureka(config)
      })

      it('should throw an exception if no vipAddress is provided', () => {
        function noVipAddress() {
          client.getInstancesByVipAddress()
        }

        expect(noVipAddress).to.throw(Error)
      })

      it('should return a list of instances if vipAddress is registered', () => {
        const vipAddress = 'the.vip.address'
        const expectedInstances = [{ host: '127.0.0.1' }]
        client.cache.vip[vipAddress] = expectedInstances
        const actualInstances = client.getInstancesByVipAddress(vipAddress)
        expect(actualInstances).to.equal(expectedInstances)
      })

      it('should return empty array if no instances were found for given vipAddress', () => {
        expect(
          client.getInstancesByVipAddress('the.vip.address'),
        ).to.deep.equal([])
      })
    })

    describe('transformRegistry()', () => {
      let client
      let config
      let registry
      let instance1
      let instance2
      let instance3
      let instance4
      let instance5
      let app1
      let app2
      let app3
      beforeEach(() => {
        config = makeConfig()
        registry = {
          applications: { application: {} },
        }
        instance1 = {
          hostName: '127.0.0.1',
          port: { $: 1000 },
          app: 'theapp',
          vipAddress: 'vip1',
          status: 'UP',
        }
        instance2 = {
          hostName: '127.0.0.2',
          port: { $: 2000 },
          app: 'theapptwo',
          vipAddress: 'vip2',
          status: 'UP',
        }
        instance3 = {
          hostName: '127.0.0.3',
          port: { $: 2000 },
          app: 'theapp',
          vipAddress: 'vip2',
          status: 'UP',
        }
        instance4 = {
          hostName: '127.0.0.4',
          port: { $: 2000 },
          app: 'theappthree',
          vipAddress: 'vip3',
          status: 'UP',
        }
        instance5 = {
          hostName: '127.0.0.5',
          port: { $: 2000 },
          app: 'theappthree',
          vipAddress: 'vip2',
          status: 'UP',
        }

        app1 = { name: 'theapp', instance: instance1 }
        app2 = { name: 'theapptwo', instance: [instance2, instance3] }
        app3 = { name: 'theappthree', instance: [instance5, instance4] }
        client = new Eureka(config)
      })

      it('should noop if empty registry', () => {
        client.transformRegistry(undefined)
        expect(client.cache.vip).to.be.empty
        expect(client.cache.app).to.be.empty
      })

      it('should return clear the cache if no applications exist', () => {
        registry.applications.application = null
        client.transformRegistry(registry)
        expect(client.cache.vip).to.be.empty
        expect(client.cache.app).to.be.empty
      })

      it('should transform a registry with one app', () => {
        registry.applications.application = app1
        client.transformRegistry(registry)
        expect(client.cache.app[app1.name.toUpperCase()].length).to.equal(1)
        expect(client.cache.vip[instance1.vipAddress].length).to.equal(1)
      })

      it('should transform a registry with two or more apps', () => {
        registry.applications.application = [app1, app2]
        client.transformRegistry(registry)
        expect(client.cache.app[app1.name.toUpperCase()].length).to.equal(2)
        expect(client.cache.vip[instance2.vipAddress].length).to.equal(2)
      })

      it('should transform a registry with a single application with multiple vips', () => {
        registry.applications.application = [app3]
        client.transformRegistry(registry)
        expect(client.cache.app[app3.name.toUpperCase()].length).to.equal(2)
        expect(client.cache.vip[instance5.vipAddress].length).to.equal(1)
        expect(client.cache.vip[instance4.vipAddress].length).to.equal(1)
      })
    })

    describe('transformApp()', () => {
      let client
      let config
      let app
      let instance1
      let instance2
      let instance3
      let instance4
      let downInstance
      let theVip
      let multiVip
      let cache
      beforeEach(() => {
        config = makeConfig({
          instance: { dataCenterInfo: { name: 'Amazon' } },
        })
        client = new Eureka(config)
        theVip = 'theVip'
        multiVip = 'fooVip,barVip'
        instance1 = {
          hostName: '127.0.0.1',
          port: 1000,
          vipAddress: theVip,
          app: 'theapp',
          status: 'UP',
        }
        instance2 = {
          hostName: '127.0.0.2',
          port: 2000,
          vipAddress: theVip,
          app: 'theapp',
          status: 'UP',
        }
        instance3 = {
          hostName: '127.0.0.5',
          port: 2000,
          vipAddress: multiVip,
          app: 'theapp',
          status: 'UP',
        }
        instance4 = {
          hostName: '127.0.0.6',
          port: 2000,
          vipAddress: void 0,
          app: 'theapp',
          status: 'UP',
        }
        downInstance = {
          hostName: '127.0.0.7',
          port: 2000,
          app: 'theapp',
          vipAddress: theVip,
          status: 'DOWN',
        }
        app = { name: 'theapp' }
        cache = { app: {}, vip: {} }
      })

      it('should transform an app with one instance', () => {
        app.instance = instance1
        client.transformApp(app, cache)
        expect(cache.app[app.name.toUpperCase()].length).to.equal(1)
        expect(cache.vip[theVip].length).to.equal(1)
      })

      it('should transform an app with one instance that has a comma separated vipAddress', () => {
        app.instance = instance3
        client.transformApp(app, cache)
        expect(cache.app[app.name.toUpperCase()].length).to.equal(1)
        expect(cache.vip[multiVip.split(',')[0]].length).to.equal(1)
        expect(cache.vip[multiVip.split(',')[1]].length).to.equal(1)
      })

      it('should transform an app with one instance that has no vipAddress', () => {
        app.instance = instance4
        client.transformApp(app, cache)
        expect(cache.app[app.name.toUpperCase()].length).to.equal(1)
        expect(Object.keys(cache.vip).length).to.equal(0)
      })

      it('should transform an app with two or more instances', () => {
        app.instance = [instance1, instance2, instance3]
        client.transformApp(app, cache)
        expect(cache.app[app.name.toUpperCase()].length).to.equal(3)
        expect(cache.vip[theVip].length).to.equal(2)
        expect(cache.vip[multiVip.split(',')[0]].length).to.equal(1)
        expect(cache.vip[multiVip.split(',')[1]].length).to.equal(1)
      })

      it('should filter UP instances by default', () => {
        app.instance = [instance1, instance2, downInstance]
        client.transformApp(app, cache)
        expect(cache.app[app.name.toUpperCase()].length).to.equal(2)
        expect(cache.vip[theVip].length).to.equal(2)
      })

      it('should not filter UP instances when filterUpInstances === false', () => {
        config = makeConfig({
          instance: { dataCenterInfo: { name: 'Amazon' } },
          eureka: { filterUpInstances: false },
        })
        client = new Eureka(config)
        app.instance = [instance1, instance2, downInstance]
        client.transformApp(app, cache)
        expect(cache.app[app.name.toUpperCase()].length).to.equal(3)
        expect(cache.vip[theVip].length).to.equal(3)
      })
    })

    describe('handleDelta()', () => {
      let client
      beforeEach(() => {
        const config = makeConfig({ shouldUseDelta: true })
        client = new Eureka(config)
      })

      it('should add instances', () => {
        const appDelta = [
          {
            instance: [
              {
                hostName: '127.0.0.1',
                port: { $: 1000 },
                app: 'THEAPP',
                vipAddress: 'thevip',
                status: 'UP',
                actionType: 'ADDED',
              },
            ],
          },
        ]

        client.handleDelta(client.cache, appDelta)
        expect(client.cache.vip.thevip).to.have.length(1)
        expect(client.cache.app.THEAPP).to.have.length(1)
      })

      it('should handle duplicate instances on add', () => {
        const appDelta = [
          {
            instance: [
              {
                hostName: '127.0.0.1',
                port: { $: 1000 },
                app: 'THEAPP',
                vipAddress: 'thevip',
                status: 'UP',
                actionType: 'ADDED',
              },
              {
                hostName: '127.0.0.1',
                port: { $: 1000 },
                app: 'THEAPP',
                vipAddress: 'thevip',
                status: 'UP',
                actionType: 'ADDED',
              },
            ],
          },
        ]

        client.handleDelta(client.cache, appDelta)
        expect(client.cache.vip.thevip).to.have.length(1)
        expect(client.cache.app.THEAPP).to.have.length(1)
      })

      it('should modify instances', () => {
        const appDelta = [
          {
            instance: [
              {
                hostName: '127.0.0.1',
                port: { $: 1000 },
                app: 'THEAPP',
                vipAddress: 'thevip',
                status: 'UP',
                actionType: 'MODIFIED',
                newProp: 'foo',
              },
            ],
          },
        ]
        const original = {
          hostName: '127.0.0.1',
          port: { $: 1000 },
          app: 'THEAPP',
          vipAddress: 'thevip',
          status: 'UP',
          actionType: 'MODIFIED',
        }
        client.cache = {
          app: { THEAPP: [original] },
          vip: { thevip: [original] },
        }

        client.handleDelta(client.cache, appDelta)
        expect(client.cache.vip.thevip).to.have.length(1)
        expect(client.cache.app.THEAPP).to.have.length(1)
        expect(client.cache.vip.thevip[0]).to.have.property('newProp')
        expect(client.cache.app.THEAPP[0]).to.have.property('newProp')
      })

      it('should modify instances even when status is not UP', () => {
        const appDelta = [
          {
            instance: [
              {
                hostName: '127.0.0.1',
                port: { $: 1000 },
                app: 'THEAPP',
                vipAddress: 'thevip',
                status: 'DOWN',
                actionType: 'MODIFIED',
                newProp: 'foo',
              },
            ],
          },
        ]
        const original = {
          hostName: '127.0.0.1',
          port: { $: 1000 },
          app: 'THEAPP',
          vipAddress: 'thevip',
          status: 'UP',
          actionType: 'MODIFIED',
        }
        client.cache = {
          app: { THEAPP: [original] },
          vip: { thevip: [original] },
        }

        client.handleDelta(client.cache, appDelta)
        expect(client.cache.vip.thevip).to.have.length(1)
        expect(client.cache.app.THEAPP).to.have.length(1)
        expect(client.cache.vip.thevip[0]).to.have.property('newProp')
        expect(client.cache.app.THEAPP[0]).to.have.property('newProp')
      })

      it('should add if instance doesnt exist when modifying', () => {
        const appDelta = [
          {
            instance: [
              {
                hostName: '127.0.0.1',
                port: { $: 1000 },
                app: 'THEAPP',
                vipAddress: 'thevip',
                status: 'UP',
                actionType: 'MODIFIED',
                newProp: 'foo',
              },
            ],
          },
        ]

        client.handleDelta(client.cache, appDelta)
        expect(client.cache.vip.thevip).to.have.length(1)
        expect(client.cache.app.THEAPP).to.have.length(1)
        expect(client.cache.vip.thevip[0]).to.have.property('newProp')
        expect(client.cache.app.THEAPP[0]).to.have.property('newProp')
      })

      it('should delete instances', () => {
        const appDelta = [
          {
            instance: [
              {
                hostName: '127.0.0.1',
                port: { $: 1000 },
                app: 'THEAPP',
                vipAddress: 'thevip',
                status: 'UP',
                actionType: 'DELETED',
                newProp: 'foo',
              },
            ],
          },
        ]
        const original = {
          hostName: '127.0.0.1',
          port: { $: 1000 },
          app: 'THEAPP',
          vipAddress: 'thevip',
          status: 'UP',
          actionType: 'ADDED',
        }
        client.cache = {
          app: { THEAPP: [original] },
          vip: { thevip: [original] },
        }

        client.handleDelta(client.cache, appDelta)
        expect(client.cache.vip.thevip).to.have.length(0)
        expect(client.cache.app.THEAPP).to.have.length(0)
      })

      it('should not delete instances if they do not exist', () => {
        const appDelta = [
          {
            instance: [
              {
                hostName: '127.0.0.1',
                port: { $: 1000 },
                app: 'THEAPP',
                vipAddress: 'thevip',
                status: 'UP',
                actionType: 'DELETED',
                newProp: 'foo',
              },
            ],
          },
        ]
        client.cache = {
          app: { THEAPP: [] },
          vip: { thevip: [] },
        }

        client.handleDelta(client.cache, appDelta)
        expect(client.cache.vip.thevip).to.have.length(0)
        expect(client.cache.app.THEAPP).to.have.length(0)
      })
    })
  })
})
