import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/routers'
import store from '@/store'

const excludeMessageUrl = ['/api/user/getUserInfo']

const service = axios.create({
  baseURL: ''
})
service.interceptors.request.use(
  config => {
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
    const res = response.data
    if (res.result !== 1) {
      if (res.mdata.code == 10001) {
        if (!excludeMessageUrl.includes(response.config.url)) {
          Message({
            message: '请登陆后再试',
            type: 'error',
            duration: 2 * 1000
          })
        }
        // store.dispatch('loginOut')
        // router.replace({ path: '/login' })
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
