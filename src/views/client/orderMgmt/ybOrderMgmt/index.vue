<template>
  <div class="ybOrderMgmt">
    <YbMultiSearchTable ref="YbMultiSearchTable" v-model="queryType" :tabs="tabs" :search-options="searchOptions" @getTableData="getTableData">
      <el-table-column label="订单编号">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.status == 2 || scope.row.status == 4 || scope.row.status == 24" :class="scope.row.isInterviewWait == 1 || scope.row.isFinalAuditWait == 1 ? 'is-red' : ''">{{ scope.row.orderNo }}</span>
          <span v-else :class="scope.row.overOneMonth == 1 ? 'is-red' : ''">{{ scope.row.orderNo }}</span> -->
          <span>{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="statusText" label="订单状态"></el-table-column>
      <el-table-column v-if="role != 60" label="初审状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.matchBlackListStatus == 1" type="text" size="small" @click="onBlackListHitBtnClick(scope.row.matchBlackListInvokeId)">{{ scope.row.matchBlackListStatusText }}</el-button>
          <el-button v-if="scope.row.matchWhiteListStatus == 1" type="text" size="small" @click="onWhiteListHitBtnClick(scope.row.matchWhiteListInvokeId)">{{ scope.row.matchWhiteListStatusText }}</el-button>
          <span>{{ scope.row.matchGrayListStatus == 1 ? scope.row.matchGrayListStatusText : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <p>客户姓名</p>
          <p>注册手机号</p>
        </template>
        <template slot-scope="scope">
          <p>{{ scope.row.customerUserName }}</p>
          <p>{{ scope.row.customerPhone }}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="roleType != 2" prop="orderTypeText" label="展业模式"></el-table-column>
      <el-table-column>
        <template slot="header">
          <p>业务员</p>
          <p>合伙人</p>
        </template>
        <template slot-scope="scope">
          <p>{{ scope.row.salesmanUserName }}</p>
          <p>{{ scope.row.brokerUserName }}</p>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <p>创建时间</p>
        </template>
        <template slot-scope="scope">
          <p>{{ scope.row.createTime }}</p>
        </template>
      </el-table-column>
      <el-table-column label="支付时间">
        <template slot-scope="scope">
          <p>{{ scope.row.downPaymentStatusText }}</p>
          <p>{{ scope.row.downPaymentTime }}</p>
        </template>
      </el-table-column>
      <template v-if="role == 8 || role == 18 || role == 94">
        <el-table-column prop="carFinanceItemTypeText" label="车辆类型"></el-table-column>
        <el-table-column prop="fundProviderName" label="资方"></el-table-column>
      </template>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status != 1" type="text" size="small" @click="downloadTheSupplement(scope.row)">下载补充资料</el-button>
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button v-if="scope.row.downloadContractBtn == 1 && scope.row.status != 1" type="text" size="small" @click="downloadTheContract(scope.row)">下载合同</el-button>
          <el-button v-if="scope.row.status != 99 && scope.row.status != -1 && scope.row.status != 1 && scope.row.status != 3 && scope.row.status != 5 && scope.row.status != 25" type="text" size="small" @click="cancelTheOrder(scope.row)">取消订单</el-button>
          <el-button v-if="scope.row.status == 4" type="text" size="small" @click="uploadSupplementaryInformation(scope.row)">上传补充资料</el-button>
          <el-button v-if="scope.row.containsGuarantor == 1 && scope.row.guarantorStatus == 0" type="text" size="small" @click="addGuarantor(scope.row)">添加保证人</el-button>
          <el-button v-if="(scope.row.status == 9 || scope.row.status == 28) && scope.row.aliPayTransfer == 1" type="text" size="small" @click="balanceRecharge(scope.row)">余额充值</el-button>
          <el-button v-if="scope.row.status == 9 || scope.row.status == 28" type="text" size="small" @click="handoffAlipayTransfer(scope.row)">{{ scope.row.aliPayTransfer == 1 ? '关闭支付宝转账' : '开放支付宝转账' }}</el-button>
          <el-button v-if="scope.row.status == 17 || scope.row.status == 99" type="text" size="small" @click="editDeliveryInformation(scope.row)">编辑交车信息</el-button>
          <template v-if="scope.row.status === 0">
            <el-button v-if="scope.row.skipUserLocationStatus != 1 && scope.row.hiddenButtonSkipGetUserLocation != 1" type="text" size="small" @click="skipGettingLocationInformation(scope.row)">跳过获取位置信息</el-button>
            <el-button v-if="scope.row.skipUserContactStatus != 1 && scope.row.hiddenButtonSkipGetUserContact != 1" type="text" size="small" @click="skipGettingContacts(scope.row)">跳过获取通讯录</el-button>
            <el-button v-if="scope.row.skipWechatFlowStatus != 1 && scope.row.hiddenButtonSkipGetWechatFlow != 1" type="text" size="small" @click="skipGettingWeChatFlow(scope.row)">跳过获取微信流水</el-button>
          </template>
          <el-button v-if="scope.row.status == 2 && !scope.row.receiveUserId" type="text" size="small" @click="cutQueue(scope.row)">插队</el-button>
        </template>
      </el-table-column>
    </YbMultiSearchTable>

    <!-- <cancel-order-dialog :visible.sync="cancelOrderDialogVisible" :params="cancelOrderDialogParams" @submit="cancelOrderDialogSubmit"></cancel-order-dialog> -->
  </div>
</template>

<script>
import orderMgmt from "@/api/orderMgmt";
// import { ORDER_STATUS } from '@/utils/data'
import user from '@/api/user'
// import CancelOrderDialog from './CancelOrderDialog.vue'
// import { getTopFundProviderSelect } from '@/api/processMgmt'

export default {
  name: "ybOrderMgmt",
  components: {
    // CancelOrderDialog
  },
  computed: {
    userInfo () {
      return this.$store.state.user
    }
  },
  data() {
    return {
      role: 0,
      roleType: 0,
      queryType: 1,
      agentManUserId: '',
      salesmanUserId: '',
      cancelOrderDialogVisible: false,
      cancelOrderDialogParams: {},
      searchOptions: [{
        type: 'select',
        title: '业务员',
        key: 'salesmanUserId',
        options: [],
        onChange: (val) => {
          this.salesmanUserId = val
          this.userForSelect()
          this.$refs.YbMultiSearchTable.clearKeyValue('brokerUserId')
        },
        props: {
          label: 'userName',
          value: 'id'
        }
      }, {
        type: 'select',
        title: '城市合伙人',
        key: 'brokerUserId',
        options: [],
        onChange: (val) => {
          this.agentManUserId = val
          this.userForSelect()
        },
        props: {
          label: 'userName',
          value: 'id'
        }
      }, {
        type: 'select',
        title: '资金方',
        key: 'fundProviderId',
        options: [{
          label: '玖亿融资租赁有限公司',
          value: 1
        }, {
          label: '安徽同康实业发展有限公司',
          value: 2
        }, {
          label: '浙江尚诚融资租赁有限公司',
          value: 3
        }],
        // props: {
        //   method: getTopFundProviderSelect,
        //   label: 'labelName',
        //   value: 'labelId',
        // }
      }, {
        type: 'input',
        title: '客户姓名',
        key: 'customerUserName',
      }, {
        type: 'select',
        title: '审核通过类型',
        key: 'finalAuditPassType',
        options: [{
          label: '审核通过',
          value: 0
        }, {
          label: '特批通过',
          value: 1
        }, {
          label: '复议通过',
          value: 2
        }]
      }, {
        type: 'select',
        title: '订单状态',
        key: 'status',
        options: [],
      }, {
        type: 'select',
        title: '车辆类型',
        key: 'carFinanceItemType',
        options: [{
          label: '新车',
          value: 1
        }, {
          label: '转租车',
          value: 2
        }]
      }, {
        type: 'input',
        title: '订单编号',
        key: 'orderNo',
      }, {
        type: 'input',
        title: '包含电话',
        key: 'phoneNumber',
      }, {
        type: 'input',
        title: '车架号',
        key: 'frameNo',
      }, {
        type: 'input',
        title: '发动机号',
        key: 'engineNo',
      }, {
        type: 'daterange',
        title: '订单时间',
        key: ['beginDate', 'endDate'],
      }, {
        type: 'select',
        title: '展业模式',
        key: 'orderType',
        options: [{
          label: '经纪人模式(A)',
          value: 1
        }, {
          label: '代理商模式(B)',
          value: 2
        }, {
          label: '经纪人分销模式(C)',
          value: 3
        }]
      }],
      tabs: [{
        index: 1,
        title: '订单列表1',
        method: orderMgmt.getCarTradeOrderListCarOrder,
      }],
    };
  },
  created () {
    console.log('created')
    this.initializeTheFilterState()
    this.userForSelect()
    this.initRouteQuery()
  },
  mounted () {
    console.log('mounted')
  },
  activated () {
    console.log('actived')
  },
  deactivated () {
    console.log('deactivated')
  },
  // activated () {
  //   const refresh = window.sessionStorage.getItem('refresh')
  //   window.sessionStorage.removeItem('refresh')
  //   if (refresh && this.$refs.YbMultiSearchTable) {
  //     this.$refs.YbMultiSearchTable.refresh()
  //   }
  // },
  methods: {
    getTableData (list) {
      const opreate = this.$route.query.opreate
      if (opreate === 'detail' && list && list[0]) {
        this.goDetail(list[0])
      }
    },
    initRouteQuery () {
      const phoneNumber = this.$route.query.phoneNumber
      if (phoneNumber) {
        const item = this.searchOptions.find(el => el.key === 'phoneNumber')
        item && this.$set(item, 'default', phoneNumber)
      }
      const orderNo = this.$route.query.orderNo
      if (orderNo) {
        const item = this.searchOptions.find(el => el.key === 'orderNo')
        item && this.$set(item, 'default', orderNo)
      }
    },
    userForSelect () {
      let params = {
        agentManUserId: this.agentManUserId,
        salesmanUserId: this.salesmanUserId
      }
      user.userForSelect(params).then(res => {
        if (res.result === 1) {
          const salesmanUserItem = this.searchOptions.find(el => el.key === 'salesmanUserId')
          const brokerUserItem = this.searchOptions.find(el => el.key === 'brokerUserId')
          res.mdata.salesmanList && this.$set(salesmanUserItem, 'options', res.mdata.salesmanList)
          res.mdata.brokerList && this.$set(brokerUserItem, 'options', res.mdata.brokerList)
        }
      })
    },
    onBlackListHitBtnClick (id){
      id && window.open("/client/blacklistRecord/blacklistEditOrDetail?from=blacklistRecord&title=detail&itemId=" + id);
    },
    onWhiteListHitBtnClick (id){
      id && window.open("/client/whitelist/detailView?id=" + id + "&type=hitDetail");
    },
    initializeTheFilterState () {
      this.role = this.userInfo.userDto.role
      this.roleType = this.userInfo.userDto.roleType
      const { role, roleType } = this
      if (role != 8 && role != 18) {
        const orderStatusItem = this.searchOptions.find(el => el.key === 'status')
        let newOptions = []
        const valueKeys = [1, 2, 3, 4, 5, 24, 25, 28]
        orderStatusItem.options.forEach(el => {
          const index = valueKeys.findIndex(key => key == el.value)
          if (index < 0) {
            newOptions.push(el)
          }
        })
        orderStatusItem.options = newOptions
      }
      if (role == 37) {
        const index = this.searchOptions.findIndex(el => el.key === 'carFinanceItemType')
        this.searchOptions.splice(index, 1)
      }
      if (roleType == 2) {
        const index = this.searchOptions.findIndex(el => el.key === 'orderType')
        this.searchOptions.splice(index, 1)
      }
    },
    downloadTheSupplement (row) {
      this.$router.push({
        name: 'ybOrderMgmtDownloadTheSupplement',
        query: {
          id: row.id
        }
      })
    },
    goDetail (row) {
      if (this.role != 2) {
        if (row.status == 0) {
          this.$router.push({
            path: "/client/ybOrderMgmtVue/firstTrialOrderDetail?id=" + row.id
          })
        } else {
          this.$store.commit('setKeepPage', 'ybOrderMgmt')
          this.$router.push({
            path: '/client/ybOrderMgmt/detail',
            query: {
              id: row.id
            }
          })
        }
      } else {
        // 还没做
        // $(".order-mgmt-list").hide();
        // this.managementDetailView && (this.managementDetailView = null);
        // this.managementDetailView = new ManagementDetailView({el:$(".management-detail-page"), model: this.model});
      }
    },
    downloadTheContract (row) {
      this.$router.push({
        name: 'ybOrderMgmtDownloadTheContract',
        query: {
          id: row.id
        }
      })
    },
    cancelTheOrder (row) {
      this.cancelOrderDialogParams = { id: row.id }
      this.cancelOrderDialogVisible = true
    },
    cancelOrderDialogSubmit () {
      this.cancelOrderDialogVisible = false
      this.$refs.YbMultiSearchTable.refresh()
    },
    uploadSupplementaryInformation (row) {
      this.$router.push({
        name: 'ybOrderMgmtUploadSupplementaryInfo',
        query: {
          id: row.id
        }
      })
    },
    addGuarantor (row) {
      this.$router.push({
        name: 'ybOrderMgmtAddGuarantor',
        query: {
          id: row.id
        }
      })
    },
    balanceRecharge (row) {
      this.$router.push({
        name: 'ybOrderMgmtBalanceRecharge',
        query: {
          id: row.id
        }
      })
    },
    handoffAlipayTransfer (row) {
      this.$router.push({
        name: 'ybOrderMgmtAlipayTransfer',
        query: {
          id: row.id
        }
      })
    },
    editDeliveryInformation (row) {
      this.$router.push({
        name: 'ybOrderMgmtEditDeliveryInformation',
        query: {
          id: row.id
        }
      })
    },
    skipGettingLocationInformation (row) {
      // 要测试接口
      this.$confirm('跳过获取位置信息，订单将不再需要获取位置信息进入等待复审状态。确定跳过位置信息吗？', '确认跳过获取位置信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateCustomerAuthInfo({
          orderId: row.id,
          skipLocation: 1,
        })
      })
    },
    skipGettingContacts (row) {
      this.$confirm('跳过获取通讯录，订单将不再需要获取通讯录进入等待复审状态。确定跳过获取通讯录吗？', '确认跳过获取通讯录信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateCustomerAuthInfo({
          orderId: row.id,
          skipContact: 1,
        })
      })
    },
    skipGettingWeChatFlow (row) {
      this.$confirm('跳过获取微信流水，订单将不再需要获取微信流水进入等待复审状态。确定跳过获取微信流水吗？', '确认跳过获取微信流水', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateCustomerAuthInfo({
          orderId: row.id,
          skipWeChatFlow: 1,
        })
      })
    },
    cutQueue (row) {
      this.$confirm('是否对该订单进行插队？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.queueJumping({
          carTradeOrderId: row.id
        })
      })
    },
    queueJumping (params) {
      orderMgmt.queueJumping(params).then(res => {
        if (res.result === 1) {
          this.$message.success('插队成功')
          this.$refs.YbMultiSearchTable.refresh()
        }
      })
    },
    updateCustomerAuthInfo (params) {
      orderMgmt.updateCustomerAuthInfo(params).then(res => {
        if (res.result === 1) {
          this.$message.success('跳过操作成功')
          this.$refs.YbMultiSearchTable.refresh()
        }
      })
    }
  },
};
</script>

<style lang="scss">
.ybOrderMgmt{
  .is-red{
    color: red;
  }
}
</style>