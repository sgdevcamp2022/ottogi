import { expect } from 'chai'
import merge from 'lodash/merge'
import ConfigClusterResolver from '../lib/configClusterResolver'

function makeConfig(overrides = {}) {
  const config = {
    instance: {
      dataCenterInfo: { metadata: { 'availability-zone': '1b' } },
    },
    eureka: {
      maxRetries: 0,
      ec2Region: 'my-region',
    },
  }
  return merge({}, config, overrides)
}

describe('Config Cluster Resolver', () => {
  describe('resolveEurekaUrl() with host/port config', () => {
    let resolver
    beforeEach(() => {
      resolver = new ConfigClusterResolver(
        makeConfig({
          eureka: {
            host: 'eureka.mydomain.com',
            servicePath: '/eureka/v2/apps/',
            port: 9999,
          },
        }),
      )
    })

    it('should return base Eureka URL using configured host', () => {
      expect(resolver.resolveEurekaUrl()).to.equal(
        'http://eureka.mydomain.com:9999/eureka/v2/apps/',
      )
    })
  })
})
