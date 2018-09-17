import axios from 'axios'
import Keycloak from 'keycloak-js'

export default class AxiosKeycloak extends Keycloak {
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
