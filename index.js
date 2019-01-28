import axios from 'axios'
import Keycloak from 'keycloak-js'

export default class AxiosKeycloak extends Keycloak {
  createAxiosInstance (config) {
    const instance = axios.create(config)

    instance.interceptors.request.use(config => new Promise((resolve, reject) => this.updateToken(5)
      .success(() => {
        config.headers.Authorization = 'Bearer ' + this.token
        resolve(config)
      })
      .error(() => {
        this.login()
      })))

    return instance
  }

  static get axios () {
    return axios
  }
}
