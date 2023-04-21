import http from '@/utils/http'

export default {
  getUserInfo: (params) => http.get('/api/user/getUserInfo', {
    params: params || {},
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}