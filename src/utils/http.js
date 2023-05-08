import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

const excludeMessageUrl = ['/api/user/getUserInfo', '/api/user/authList']

const service = axios.create({
  baseURL: ''
})
service.interceptors.request.use(
  config => {
    if (!config.source) {
      const source = axios.CancelToken.source()
      config.cancelToken = source.token
      store.commit('setCancelSource', {[`${config.url}_${config.method}`]: source})
    } else {
      config.cancelToken = config.source.token
      store.commit('setCancelSource', {[`${config.url}_${config.method}`]: config.source})
      delete config.source
    }
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.parse(new Date())
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    store.commit('removeCancelSource', [`${response.config.url}_${response.config.method}`])
    const res = response.data
    if (res.result !== 1) {
      if (res.mdata && res.mdata.code == 10001) {
        if (!excludeMessageUrl.includes(response.config.url)) {
          Message({
            message: '请登陆后再试',
            type: 'error',
            duration: 2 * 1000
          })
        }
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 2 * 1000
        })
      }
    }
    return res
  },
  error => {
    if (!axios.isCancel(error)) {
      Message({
        message: error.message,
        type: 'error',
        duration: 2 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
