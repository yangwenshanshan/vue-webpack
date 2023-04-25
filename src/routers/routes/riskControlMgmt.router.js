export default [{
  path: "/client/riskAgainReview",
  name: "风控管理-风控信审-风控复审",
  component: () => import('@/views/client/riskControlMgmt/riskControl/riskAgainReview/index.vue')
}, {
  path: "/client/riskFaceReview",
  name: "风控管理-风控信审-风控面审",
  component: () => import('@/views/client/riskControlMgmt/riskControl/riskFaceReview/index.vue')
}, {
  path: "/client/riskFinalReview",
  name: "风控管理-风控信审-风控终审",
  component: () => import('@/views/client/riskControlMgmt/riskControl/riskFinalReview/index.vue')
}, {
  path: "/client/blacklistRecord",
  name: "风控管理-风控信审-黑名单-黑名单记录",
  component: () => import('@/views/client/riskControlMgmt/riskControl/blacklist/blacklistRecord/index.vue')
}, {
  path: "/client/blacklistPool",
  name: "风控管理-风控信审-黑名单-黑名单池",
  component: () => import('@/views/client/riskControlMgmt/riskControl/blacklist/blacklistPool/index.vue')
}, {
  path: "/client/whitelist",
  name: "风控管理-风控信审-白名单记录",
  component: () => import('@/views/client/riskControlMgmt/riskControl/whitelist/index.vue')
}, {
  path: "/client/graylistPool",
  name: "风控管理-风控信审-灰名单",
  component: () => import('@/views/client/riskControlMgmt/riskControl/graylistPool/index.vue')
}, {
  path: "/client/blacklistRuleMgmt",
  name: "风控管理-风控管理规则-黑名单规则管理",
  component: () => import('@/views/client/riskControlMgmt/windControlRule/blacklistRuleMgmt/index.vue')
}, {
  path: "/client/whitelistRuleMgmt",
  name: "风控管理-风控管理规则-白名单规则管理",
  component: () => import('@/views/client/riskControlMgmt/windControlRule/whitelistRuleMgmt/index.vue')
}, {
  path: "/client/informationReviewerData",
  name: "风控管理-风控数据信审-人员数据",
  component: () => import('@/views/client/riskControlMgmt/riskControlData/informationReviewerData/index.vue')
}, {
  path: "/client/companyStatistics",
  name: "风控管理-风控数据-公司信审统计",
  component: () => import('@/views/client/riskControlMgmt/riskControlData/companyStatistics/index.vue')
}, {
  path: "/client/hadClaimOrder",
  name: "风控管理-已认领订单",
  component: () => import('@/views/client/riskControlMgmt/hadClaimOrder/index.vue')
}]