import http from '@/utils/http'

export default {
  getUserInfo: (params) => http.get('/api/user/getUserInfo', {
    params: params || {},
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }),
  getAuthList: (params) => http.get('/api/user/authList', {
    params: params || {},
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }),
}