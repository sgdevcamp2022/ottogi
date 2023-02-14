// Default configuration values:
export default {
  shouldUseDelta: false,
  eureka: {
    host: '',
    port: 8080,
    ssl: false,
    servicePath: '/eureka/v2/apps/',
    heartbeatInterval: 30000,
    registryFetchInterval: 30000,
    maxRetries: 3,
    requestRetryDelay: 500,
    fetchRegistry: true,
    filterUpInstances: true,
    preferSameZone: true,
    clusterRefreshInterval: 300000,
    fetchMetadata: true,
    registerWithEureka: true,
    useLocalMetadata: false,
    preferIpAddress: false,
  },
  instance: {},
}
