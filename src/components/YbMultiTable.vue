<template>
  <div class="yb-multi-table">
    <div class="multi-top">
      <YbTabs :tabType="tabType" v-if="tabList && tabList.length > 1" class="custom-tabs-class" v-model="activeTabIndex" :tabs="tabList" :count-props="countData" @change="tabChange">
        <template #tips>
          <slot name="tips"></slot>
        </template>
      </YbTabs>
      <slot name="search"></slot>
    </div>
    <YbTable ref="ybTable" :autoHeight="true" v-if="tabList && tabList[tabIndex]" :query-function="tabList[tabIndex].method" :searchData="{ ...searchData, ...tabList[tabIndex].params }" v-bind="$attrs" v-on="$listeners">
      <template v-for="(index, name) in $slots" :slot="name">
        <slot v-if="name !== 'search' || name !== 'tips'" :name="name"></slot>
      </template>
    </YbTable>
  </div>
</template>

<script>
import YbTable from '@/components/YbTable'
import axios from 'axios'

export default {
  components: {
    YbTable
  },
  props: {
    tabType: {
      type: String,
      default: 'badge'
    },
    countKey: {
      type: String,
      default: 'data'
    },
    countInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    },
    countFunction: {
      type: Function,
      required: false,
    },
    countKey: {
      type: String,
      default: 'data',
    },
    countQuery: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: Number,
      default: 0
    },
    autoFetch: {
      type: Boolean,
      default: true
    },
    searchData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 后端返回的count数量为数组 用该字段去自己处理下格式
    setCountType:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    countData () {
      return {...this.countInfo, ...this.countObj}
    },
    tabList () {
      const tabList = []
      const allRoleBtnList = JSON.parse(sessionStorage.getItem("userRoleBtnList"));
      this.tabs.forEach(el => {
        if (el.permission === undefined || allRoleBtnList.indexOf(Number(el.permission)) >= 0) {
          tabList.push({...el})
        }
      })
      return tabList
    },
    tabIndex () {
      return this.activeTabIndex
    }
  },
  watch: {
    countFunction:{
      handler () {
        this.getCount()
      },
      immediate: true
    },
    tabList: {
      handler (list) {
        if (list && list.length > 0) {
          const index = list.findIndex(el => el.index === this.value)
          if (index >= 0) {
            this.activeTabIndex = index
          } else {
            this.activeTabIndex = 0
            this.$emit('input', this.tabList[this.activeTabIndex].index)
          }
        }
      },
      immediate: true
    },
  },
  data () {
    return {
      countObj: {},
      activeTabIndex: -1,
      httpCancel: null,
    }
  },
  methods: {
    async getCount () {
      if (this.countFunction) {
        try {
          this.cancelAjax()
          this.httpCancel = axios.CancelToken.source()
          const responseData = await this.countFunction(this.countQuery, {
            source: this.httpCancel
          })
          this.httpCancel = null
          if (responseData.result === 1) {
            let obj = {}
            if(this.setCountType){
              responseData.ldata.forEach((item,index)=>{
                obj[item.status] = item.count
              })
              this.countObj = obj
            }else{
              const keyArr = this.countKey.split('.')
              let dataArr = responseData
              keyArr.forEach(el => {
                dataArr = dataArr[el]
              })
              this.countObj = dataArr
            }
          }
        } catch (error) {
        }
      }
    },
    cancelAjax () {
      if (this.httpCancel) {
        this.httpCancel.cancel('YBcanceled')
        this.httpCancel = null
      }
    },
    tabChange (index) {
      this.$emit('input', this.tabList[index].index)
      this.$emit('change', this.tabList[index].index)
      if (this.autoFetch) {
        this.resetRefresh()
      }
    },
    refresh () {
      this.getCount()
      this.$refs.ybTable && this.$refs.ybTable.getTableData()
    },
    resetPage () {
      this.$refs.ybTable && this.$refs.ybTable.resetPage()
    },
    resetRefresh () {
      if (this.$refs.ybTable) {
        this.$refs.ybTable.resetPage()
        this.$refs.ybTable.getTableData()
        this.getCount()
      }
    },
    clearSelection () {
      if (this.$refs.ybTable) {
        this.$refs.ybTable.clearSelection()
      }
    }
  }
}
</script>

<style lang="scss">
.yb-multi-table{
  .custom-tabs-class{
    .yb-tabs-component_list{
      .yb-tabs-component_list_item{
        margin-bottom: 15px;
      }
    }
    // padding-bottom: 15px;
  }
  .no-top-padding{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .multi-top{
    padding: 15px 15px 0 15px;
    background: #fff;
  }
}
</style>
