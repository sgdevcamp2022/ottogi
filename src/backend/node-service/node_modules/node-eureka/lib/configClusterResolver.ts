/*
  Locates a Eureka host using static configuration. Configuration can either be
  done using a simple host and port, or a map of serviceUrls.
 */
export default class ConfigClusterResolver {
  private logger: any
  private config: any
  private readonly serviceUrl: string
  constructor(config, logger?) {
    this.logger = logger || console
    this.config = config
    this.serviceUrl = this.buildServiceUrl()
  }

  resolveEurekaUrl() {
    return this.serviceUrl
  }

  buildServiceUrl(): string {
    const { host, port, servicePath, ssl } = this.config.eureka
    const protocol = ssl ? 'https' : 'http'
    return `${protocol}://${host}:${port}${servicePath}`
  }
}
