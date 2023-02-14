import axios from 'axios'
import merge from 'lodash/merge'
import { findIndex } from 'lodash'
import { normalizeDelta, findInstance } from './deltaUtils'
import { EventEmitter } from 'events'

import ConfigClusterResolver from './configClusterResolver'
import defaultConfig from './defaultConfig'

const delay = async (delayTime) =>
  new Promise((resolve) => setTimeout(resolve, delayTime))

/*
  Eureka JS client
  This module handles registration with a Eureka server, as well as heartbeats
  for reporting instance health.
*/

export default class Eureka extends EventEmitter {
  private readonly logger: any
  private readonly config: any
  private hasFullRegistry: boolean
  private clusterResolver: ConfigClusterResolver
  private cache: any = { app: {}, vip: {} }
  private heartbeatTimer: NodeJS.Timer | undefined
  private registryFetchTimer: NodeJS.Timer | undefined
  constructor(config: any = {}) {
    super()
    this.config = merge(defaultConfig, config)
    // Allow passing in a custom logger:
    this.logger = config.logger || console

    this.logger.debug('initializing eureka client')

    // Validate the provided the values we need:
    this.validateConfig(this.config)

    this.hasFullRegistry = false

    this.clusterResolver = new ConfigClusterResolver(this.config, this.logger)

    this.cache = {
      app: {},
      vip: {},
    }
  }

  /*
    Helper method to get the instance ID. If the datacenter is AWS, this will be the
    instance-id in the metadata. Else, it's the hostName.
  */
  get instanceId() {
    if (this.config.instance.instanceId) {
      return this.config.instance.instanceId
    }
    return this.config.instance.hostName
  }

  /*
    Registers instance with Eureka, begins heartbeats, and fetches registry.
  */
  async start() {
    if (this.config.eureka.registerWithEureka) {
      await this.register()
      this.startHeartbeats()
    }
    if (this.config.eureka.fetchRegistry) {
      this.startRegistryFetches()
      if (this.config.eureka.waitForRegistry) {
        const waitForRegistryUpdate = async () => {
          await this.fetchRegistry()
          const instances = this.getInstancesByAppId(this.config.instance.app)
          if (instances.length === 0) {
            await delay(2000)
            await waitForRegistryUpdate()
          }
        }
        await waitForRegistryUpdate()
      } else {
        await this.fetchRegistry()
      }
    }
    this.emit('started')
  }

  /*
    De-registers instance with Eureka, stops heartbeats / registry fetches.
  */
  async stop() {
    clearTimeout(this.registryFetchTimer)
    if (this.config.eureka.registerWithEureka) {
      clearTimeout(this.heartbeatTimer)
      await this.deregister()
    }
  }

  /*
    Validates client configuration.
  */
  validateConfig(config) {
    function validate(namespace, key) {
      if (!config[namespace][key]) {
        throw new TypeError(`Missing "${namespace}.${key}" config value.`)
      }
    }

    if (config.eureka.registerWithEureka) {
      validate('instance', 'app')
      // validate('instance', 'vipAddress')
      validate('instance', 'port')
      validate('instance', 'dataCenterInfo')
    }
  }

  /*
    Registers with the Eureka server and initializes heartbeats on registration success.
  */
  async register() {
    this.config.instance.status = 'UP'
    const connectionTimeout = setTimeout(() => {
      this.logger.warn(
        "It looks like it's taking a while to register with " +
          'Eureka. This usually means there is an issue connecting to the host ' +
          'specified. Start application with NODE_DEBUG=axios for more logging.',
      )
    }, 10000)
    const res = await this.eurekaRequest({
      method: 'POST',
      url: this.config.instance.app,
      data: { instance: this.config.instance },
    })
    clearTimeout(connectionTimeout)
    if (res.status === 204) {
      this.logger.info(
        'registered with eureka: ',
        `${this.config.instance.app}/${this.instanceId}`,
      )
      this.emit('registered')
    } else if (res.statusText) {
      this.logger.warn('Error registering with eureka client.', res.statusText)
    } else {
      throw new Error(
        `eureka registration FAILED: status: ${res.status} body: ${res.data}`,
      )
    }
  }

  /*
    De-registers with the Eureka server and stops heartbeats.
  */
  async deregister() {
    const res = await this.eurekaRequest({
      method: 'DELETE',
      url: `${this.config.instance.app}/${this.instanceId}`,
    })
    if (res.status === 200) {
      this.logger.info(
        `de-registered with eureka: ${this.config.instance.app}/${this.instanceId}`,
      )
      this.emit('unregistered')
    } else if (res.statusText) {
      this.logger.warn('Error unregistering with eureka', res.statusText)
    } else {
      throw new Error(
        `eureka deregistration FAILED: status: ${res.status} body: ${res.data}`,
      )
    }
  }

  /*
    Sets up heartbeats on interval for the life of the application.
    Heartbeat interval by setting configuration property: eureka.heartbeatInterval
  */
  startHeartbeats() {
    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer)
    }
    this.heartbeatTimer = setTimeout(() => {
      // set the next heartbeat
      this.startHeartbeats()
      this.renew().catch((err) => {
        if (err) {
          this.logger.error('Heartbeat failed:', err)
        }
      })
    }, this.config.eureka.heartbeatInterval)
  }

  async renew() {
    const res = await this.eurekaRequest({
      method: 'PUT',
      url: `${this.config.instance.app}/${this.instanceId}`,
    })
    if (res.status === 200) {
      this.logger.debug('eureka heartbeat success')
      this.emit('heartbeat')
    } else if (res.status === 404) {
      this.logger.warn('eureka heartbeat FAILED, Re-registering app')
      this.register().catch(this.logger.error)
    } else {
      if (res.statusText) {
        this.logger.error('An error in the axios occured.', res.statusText)
      }
      this.logger.warn(
        'eureka heartbeat FAILED, will retry.' +
          `status: ${res.status}` +
          `body: ${res.data} ${res.statusText || ''} `,
      )
    }
  }

  /*
    Sets up registry fetches on interval for the life of the application.
    Registry fetch interval setting configuration property: eureka.registryFetchInterval
  */
  startRegistryFetches() {
    if (this.registryFetchTimer) {
      clearTimeout(this.registryFetchTimer)
    }
    this.registryFetchTimer = setTimeout(() => {
      this.startRegistryFetches()
      this.fetchRegistry().catch((err) => {
        if (err) {
          this.logger.warn('Error fetching registry', err)
        }
      })
    }, this.config.eureka.registryFetchInterval)
  }

  /*
    Retrieves a list of instances from Eureka server given an appId
  */
  getInstancesByAppId(appId) {
    if (!appId) {
      throw new RangeError('Unable to query instances with no appId')
    }
    const instances = this.cache.app[appId.toUpperCase()] || []
    if (instances.length === 0) {
      this.logger.warn(`Unable to retrieve instances for appId: ${appId}`)
    }
    return instances
  }

  /*
    Retrieves a list of instances from Eureka server given a vipAddress
   */
  getInstancesByVipAddress(vipAddress) {
    if (!vipAddress) {
      throw new RangeError('Unable to query instances with no vipAddress')
    }
    const instances = this.cache.vip[vipAddress] || []
    if (instances.length === 0) {
      this.logger.warn(
        `Unable to retrieves instances for vipAddress: ${vipAddress}`,
      )
    }
    return instances
  }

  /*
    Orchestrates fetching registry
   */
  async fetchRegistry() {
    if (this.config.shouldUseDelta && this.hasFullRegistry) {
      await this.fetchDelta()
    } else {
      await this.fetchFullRegistry()
    }
  }

  /*
    Retrieves all applications registered with the Eureka server
  */
  async fetchFullRegistry() {
    const res = await this.eurekaRequest({
      url: '',
    })
    if (res.status === 200) {
      this.logger.debug(
        `retrieved full registry successfully, ${JSON.stringify(res.data)}`,
      )
      this.transformRegistry(res.data)
      this.emit('registryUpdated')
      this.hasFullRegistry = true
    } else if (res.statusText) {
      this.logger.warn('Error fetching registry', res.statusText)
    } else {
      throw new Error('Unable to retrieve full registry from Eureka server')
    }
  }

  /*
    Retrieves all applications registered with the Eureka server
   */
  async fetchDelta() {
    const res = await this.eurekaRequest({
      url: 'delta',
    })
    if (res.status === 200) {
      this.logger.debug('retrieved delta successfully')
      const jsonBody = JSON.parse(res.data)
      const applications = jsonBody.applications.application
      this.handleDelta(this.cache, applications)
    } else if (res.statusText) {
      this.logger.warn('Error fetching delta registry', res.statusText)
    } else {
      throw new Error('Unable to retrieve delta registry from Eureka server')
    }
  }
  /*
    Transforms the given registry and caches the registry locally
   */
  transformRegistry(registry) {
    if (!registry) {
      this.logger.warn('Unable to transform empty registry')
    } else {
      if (!registry.applications.application) {
        return
      }
      const newCache = { app: {}, vip: {} }
      if (Array.isArray(registry.applications.application)) {
        registry.applications.application.forEach((app) => {
          this.transformApp(app, newCache)
        })
      } else {
        this.transformApp(registry.applications.application, newCache)
      }
      this.cache = newCache
    }
  }

  /*
    Transforms the given application and places in client cache. If an application
    has a single instance, the instance is placed into the cache as an array of one
   */
  transformApp(app, cache) {
    if (app.instance.length) {
      app.instance
        .filter(this.validateInstance.bind(this))
        .forEach((inst) => this.addInstance(cache, inst))
    } else if (this.validateInstance(app.instance)) {
      this.addInstance(cache, app.instance)
    }
  }

  /*
    Returns true if instance filtering is disabled, or if the instance is UP
  */
  validateInstance(instance) {
    return !this.config.eureka.filterUpInstances || instance.status === 'UP'
  }

  /*
    Returns an array of vipAddresses from string vipAddress given by eureka
  */
  splitVipAddress(vipAddress) {
    if (typeof vipAddress !== 'string') {
      return []
    }

    return vipAddress.split(',')
  }

  handleDelta(cache, appDelta) {
    const delta = normalizeDelta(appDelta)
    delta.forEach((app) => {
      app.instance.forEach((instance) => {
        switch (instance.actionType) {
          case 'ADDED':
            this.addInstance(cache, instance)
            break
          case 'MODIFIED':
            this.modifyInstance(cache, instance)
            break
          case 'DELETED':
            this.deleteInstance(cache, instance)
            break
          default:
            this.logger.warn('Unknown delta actionType', instance.actionType)
            break
        }
      })
    })
  }

  addInstance(cache, instance) {
    if (!this.validateInstance(instance)) return
    const vipAddresses = this.splitVipAddress(instance.vipAddress)
    const appName = instance.app.toUpperCase()
    vipAddresses.forEach((vipAddress) => {
      const alreadyContains =
        findIndex(cache.vip[vipAddress], findInstance(instance)) > -1
      if (alreadyContains) return
      if (!cache.vip[vipAddress]) {
        cache.vip[vipAddress] = []
      }
      cache.vip[vipAddress].push(instance)
    })
    if (!cache.app[appName]) cache.app[appName] = []
    const alreadyContains =
      findIndex(cache.app[appName], findInstance(instance)) > -1
    if (alreadyContains) return
    cache.app[appName].push(instance)
  }

  modifyInstance(cache, instance) {
    const vipAddresses = this.splitVipAddress(instance.vipAddress)
    const appName = instance.app.toUpperCase()
    vipAddresses.forEach((vipAddress) => {
      const index = findIndex(cache.vip[vipAddress], findInstance(instance))
      if (index > -1) cache.vip[vipAddress].splice(index, 1, instance)
      else this.addInstance(cache, instance)
    })
    const index = findIndex(cache.app[appName], findInstance(instance))
    if (index > -1)
      cache.app[appName].splice(cache.vip[instance.vipAddress], 1, instance)
    else this.addInstance(cache, instance)
  }

  deleteInstance(cache, instance) {
    const vipAddresses = this.splitVipAddress(instance.vipAddress)
    const appName = instance.app.toUpperCase()
    vipAddresses.forEach((vipAddress) => {
      const index = findIndex(cache.vip[vipAddress], findInstance(instance))
      if (index > -1) cache.vip[vipAddress].splice(index, 1)
    })
    const index = findIndex(cache.app[appName], findInstance(instance))
    if (index > -1) cache.app[appName].splice(cache.vip[instance.vipAddress], 1)
  }

  /*
    Helper method for making a axios to the Eureka server. Handles resolving
    the current cluster as well as some default options.
  */
  async eurekaRequest(opts, attempts = 0) {
    const { url, method = 'GET', data } = opts
    const baseURL = this.clusterResolver.resolveEurekaUrl()
    try {
      const res = await axios({ baseURL, method, url, data })
      if (res.status >= 200 && res.status <= 204) {
        return res
      }
      // Perform retry if axios failed and we have attempts left
      if (attempts < this.config.eureka.maxRetries) {
        const nextRetryDelay =
          this.config.eureka.axiosRetryDelay * (attempts + 1)
        this.logger.warn(
          `Eureka axios failed to endpoint ${baseURL}, ` +
            `next server retry in ${nextRetryDelay}ms`,
        )

        await delay(nextRetryDelay)
        return this.eurekaRequest(opts, attempts + 1)
      }
      return res
    } catch (error: any) {
      // Handle Final Output. request timeout or unknown error
      this.logger.error(`Request eureka api error:`, error)
      return {
        status: -1,
        statusText: error?.message || 'unknown',
      }
    }
  }
}
