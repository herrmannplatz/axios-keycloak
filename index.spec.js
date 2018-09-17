/* eslint-env jest */
const AxiosKeycloak = require('./dist/axios-keycloak')
const nock = require('nock')
const httpAdapter = require('axios/lib/adapters/http')

describe('axiosKeycloak', () => {
  it('should expose public methods and properties', () => {
    const axiosKeycloak = new AxiosKeycloak()
    expect(axiosKeycloak).toBeDefined()
    expect(axiosKeycloak.createAxiosInstance).toBeDefined()
    expect(AxiosKeycloak.axios).toBeDefined()
  })

  it('should add authorization header when sending requests', async () => {
    const HOST = 'http://localhost:5000'
    const ENDPOINT = '/users/1234'
    const TOKEN = 'token'

    const axiosKeycloak = new AxiosKeycloak()
    const axios = AxiosKeycloak.axios

    // force node http
    axios.defaults.adapter = httpAdapter

    const axiosInstance = axiosKeycloak.createAxiosInstance({ baseURL: HOST })

    axiosKeycloak.updateToken = () => Promise.resolve(false)
    axiosKeycloak.token = TOKEN

    nock(HOST)
      .get(ENDPOINT)
      .reply(function (uri, requestBody) {
        return [this.req.headers['authorization'] === `Bearer ${TOKEN}` ? 200 : 401]
      })

    const response = await axiosInstance.get(ENDPOINT)
    expect(response.status).toBe(200)
  })
})
