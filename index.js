const axios = require('axios')
const Keycloak = require('keycloak-js')

module.exports = class AxiosKeycloak extends Keycloak {
  createAxiosInstance (config) {
    const instance = axios.create(config)

    instance.interceptors.request.use(config => this.updateToken(5)
      .then(() => {
        config.headers.Authorization = 'Bearer ' + this.token
        return Promise.resolve(config)
      })
      .catch(() => {
        this.login()
      }))

    return instance
  }

  static get axios () {
    return axios
  }
}
