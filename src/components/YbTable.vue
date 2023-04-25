<template>
  <div :class="tableClass" v-loading="loading">
    <el-table :class="border ? 'border-style' : ''" v-if="tableVisible" ref="tableMain" :height="autoHeight ? tableHeight : undefined" :data="tableData" v-bind="$attrs" v-on="$listeners" :stripe="stripe">
      <el-table-column prop="index" label="序号" width="80" v-if="orderNumber">
        <template slot-scope="scope">
          {{scope.$index + beginIndex + 1}}
        </template>
      </el-table-column>
      <template v-for="(index, name) in $slots" :slot="name">
        <slot :name="name"></slot>
      </template>
    </el-table>
    <el-pagination v-if="needPaging || !!queryFunction" layout="prev, next" :page-count="totalPage" background prev-text="上一页" next-text="下一页" @prev-click="prevBtnClick" @next-click="nextBtnClick"></el-pagination>
  </div>
</template>
 
<script>
import axios from 'axios'

export default {
  inheritAttrs: false,
  props: {
    bottomDistance: {
      type: Number,
      default: 0
    },
    tableClass: {
      type: String,
      default: 'table-row-height'
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    queryFunction: {
      type: Function,
      required: false,
    },
    searchData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    dataKey: {
      type: String,
      default: 'ldata'
    },
    needPaging: {
      type: Boolean,
      default: false
    },
    autoHeight: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    orderNumber: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      tableVisible: true,
      loading: false,
      beginIndex: 0,
      totalPage: 0,
      currentPage: 0,
      tableData: [],
      tableHeight: '100vh',
      paginationHeight: 75,
      httpCancel: false,
      scrollViewEl: null,
      scrollViewTop: 0,
    }
  },
  activated () {
    setTimeout(() => {
      this.scrollViewEl && this.scrollViewEl.scrollTo(0, this.scrollViewTop)
    }, 0);
  },
  watch: {
    // 处理多选时序号
    beginIndex:{
      handler(newVal){
        this.$emit('getIndex',{beginIndex:newVal})
      },
      immediate:true
    },
    data (val) {
      this.tableData = val
    }
  },
  deactivated () {
    this.cancelAjax()
  },
  created () {
    this.initialize()
  },
  mounted () {
    this.tableData = this.data
  },
  beforeDestroy () {
  },
  methods: {
    initialize () {
      this.resetPage()
      this.getTableData()
      this.tableVisible = false
      this.$nextTick(() => {
        this.tableVisible = true
        this.calculateHeight()
      })
    },
    calculateHeight () {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.tableMain && this.$refs.tableMain.$el) {
          let windowHeight = Math.min(window.innerHeight, document.documentElement.clientHeight)
          let tableHeight = windowHeight - this.$refs.tableMain.$el.getBoundingClientRect().top - 10 - this.bottomDistance
          if (this.needPaging || !!this.queryFunction) {
            tableHeight = tableHeight - this.paginationHeight
          }
          this.tableHeight = tableHeight + 'px'
          if (this.$refs.tableMain && this.$refs.tableMain.$el) {
            this.scrollViewEl = this.$refs.tableMain.bodyWrapper
            this.scrollViewEl.removeEventListener('scroll', this.scroll)
            this.scrollViewEl.addEventListener('scroll', this.scroll)
          }
        }
      })
    },
    scroll (e) {
      this.scrollViewTop = e.target.scrollTop
    },
    async getTableData () {
      this.cancelAjax()
      this.tableData = []
      if (this.queryFunction) {
        this.loading = true
        try {
          this.httpCancel = axios.CancelToken.source()
          let responseData = await this.queryFunction({
            beginIndex: this.beginIndex,
              pageSize: this.pageSize + 1,
              ...this.searchData,
          }, {
            source: this.httpCancel
          })
          this.httpCancel = null
          this.loading = false
          this.$emit('getResponseData', responseData)
          this.initTableData(responseData)
        } catch (error) {
          if (!axios.isCancel(error)) {
            this.loading = false
          }
        }
      }
    },
    cancelAjax () {
      if (this.httpCancel) {
        this.httpCancel.cancel('YBcanceled')
        this.httpCancel = null
      }
    },
    initTableData (data) {
      const keyArr = this.dataKey.split('.')
      let dataArr = data
      keyArr.forEach(el => {
        dataArr = dataArr[el]
      })
      this.currentPage = this.beginIndex / this.pageSize + 1;
      if (dataArr.length > this.pageSize) {
        dataArr.pop();
        this.totalPage = this.currentPage + 1;
      } else {
        this.totalPage = this.currentPage;
      }
      this.tableData = dataArr;
      this.$emit('getTableData',this.tableData)
    },
    resetPage () {
      this.beginIndex = 0
      this.totalPage = 1;
      this.currentPage = 1;
    },
    nextBtnClick () {
      if (this.tableData.length < this.pageSize) {
        this.$message({
          type: "info",
          message: "没有更多了!",
        });
        return;
      }
      this.beginIndex = this.beginIndex + this.pageSize;
      this.getTableData()
    },
    prevBtnClick () {
      if (this.beginIndex <= 0) {
        this.$message({
          type: "info",
          message: "已经到头了!",
        });
        return;
      }
      this.beginIndex = this.beginIndex - this.pageSize;
      this.getTableData()
    },
    clearSelection () {
      this.$refs.tableMain.clearSelection()
    }
  }
}
</script>

<style lang="scss">
// .table-row-height{
//   width: 100%;
//   .border-style{
//     border-right: 1px solid #EDEDED;
//     .el-table__header-wrapper{
//       border-top: 1px solid #EDEDED;
//       .el-table__header{
//         th{
//           border-left: 1px solid #EDEDED;
//           border-bottom: 1px solid #EDEDED;
//         }
//       }
//     }
//     .el-table__body-wrapper{
//       .el-table__body{
//         td{
//           border-left: 1px solid #EDEDED;
//           border-bottom: 1px solid #EDEDED;
//         }
//       }
//     }
//   }
// }
</style>