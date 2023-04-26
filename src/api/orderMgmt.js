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
  getCarTradeOrderListCarOrder: (params, config) => http.get('/api/carTradeOrder/listCarOrder', {params, ...config}),
  queueJumping: (data) => http.post('/api/carTradeOrder/topOrder', data),
  updateCustomerAuthInfo: (data) => http.post('/api/carTradeOrder/updateCustomerAuthInfo', data)
}