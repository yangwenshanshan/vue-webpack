export default [{
  path: "/client/newCarMgmt",
  name: "金融产品-新车管理",
  component: () => import('@/views/client/processMgmt/newCarMgmt/index.vue')
}, {
  path: "/client/usedCarMgmt",
  name: "金融产品-转租车管理",
  component: () => import('@/views/client/processMgmt/usedCarMgmt/index.vue')
}, {
  path: "/client/financeProductTemplateList",
  name: "金融产品-商品管理-产品模版管理",
  component: () => import('@/views/client/processMgmt/商品管理/financeProductTemplateList/index.vue')
}, {
  path: "/client/financeStrategyMgmt",
  name: "金融产品-商品管理-定价策略管理",
  component: () => import('@/views/client/processMgmt/商品管理/financeStrategyMgmt/index.vue')
}]