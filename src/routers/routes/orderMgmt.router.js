export default [
  /*********************************订单管理*********************************************/
  {
    path: "/client/ybOrderMgmt",
    name: "订单管理-订单管理",
    component: () => import('@/views/client/orderMgmt/ybOrderMgmt/index.vue'),
    children: [{
      path: "/client/ybOrderMgmt/detail",
      name: "订单管理-订单管理-详情",
      component: () => import('@/views/client/orderMgmt/ybOrderMgmt/detail/index.vue')
    }]
  },
  /*********************************历史订单管理*********************************************/
  {
    path: "/client/orderMgmt",
    name: "订单管理-历史订单管理",
    component: () => import('@/views/client/orderMgmt/orderMgmt/index.vue')
  },
  /*********************************线下订单管理*********************************************/
  {
    path: "/client/offlineOrderMgmt",
    name: "订单管理-线下订单管理",
    component: () => import('@/views/client/orderMgmt/offlineOrderMgmt/index.vue')
  }
]