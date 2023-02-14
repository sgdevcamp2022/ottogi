import Eureka from '../lib/index'
import { expect } from 'chai'

describe('Integration Test', () => {
  const appId = 'API-SERVER'
  const vipAddress = appId.toLocaleLowerCase()
  const ip = '192.168.0.1'
  const port = 8080
  const instanceId = `${ip}:${port}`
  const config = {
    instance: {
      instanceId,
      app: appId,
      hostName: ip,
      ipAddr: ip,
      vipAddress,
      port: {
        $: port,
        '@enabled': 'false',
      },
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.MyDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      heartbeatInterval: 30000,
      registryFetchInterval: 5000,
      fetchRegistry: true,
      waitForRegistry: true,
      servicePath: '/eureka/apps/',
      ssl: false,
      useDns: false,
      fetchMetadata: true,
      host: 'internal-tk-dev-nft-eureka1-alb-1301391272.ap-northeast-1.elb.amazonaws.com',
      port: 8761,
      registerWithEureka: true,
    },
  }

  const client = new Eureka(config)

  beforeAll(async () => {
    await client.start()
  })

  it('should be able to get instance by the app id', () => {
    const instances = client.getInstancesByAppId(config.instance.app)
    expect(instances.length).to.equal(1)
  })

  it('should be able to get instance by the vipAddress', () => {
    const instances = client.getInstancesByVipAddress(
      config.instance.vipAddress,
    )
    expect(instances.length).to.equal(1)
  })
})
