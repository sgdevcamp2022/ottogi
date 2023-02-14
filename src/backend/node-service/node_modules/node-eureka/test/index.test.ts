import { expect } from 'chai'

import EurekaClient from '../lib/eurekaClient'
import EurekaDefault, { Eureka as EurekaNamed } from '../lib/index'

describe('index', () => {
  it('should export both a default and a named', () => {
    expect(EurekaDefault).to.equal(EurekaClient)
    expect(EurekaDefault).to.equal(EurekaNamed)
  })
})
