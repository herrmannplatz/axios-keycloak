# axios-keycloak [![npm version](https://badge.fury.io/js/axios-keycloak.svg)](https://badge.fury.io/js/axios-keycloak) [![Build Status](https://travis-ci.org/herrmannplatz/axios-keycloak.svg?branch=master)](https://travis-ci.org/herrmannplatz/axios-keycloak)

> Keycloak client with build in axios functionality letting you create axios instances for doing authenticated request. The module is dealing with the token refresh for you.

## Usage

```javascript
import AxiosKeyloak from 'axios-keyloak'

...

const kc = new AxiosKeyloak()
const axiosInstance = kc.createAxiosInstance()

kc.init({ onLoad: 'login-required' })
  .then(() => {
    // authenticated request using keycloak access token
    return axiosInstance.get('/user/12345'))
  })
  .then((response) => {
    // ...
  }

// In case you wanna do an unauthenticated request
const axios = AxiosKeyloak.axios

```
