<template>
  <div class="yb-search-class">
    <el-input
      v-if="type === 'input'"
      clearable
      v-bind="$attrs"
      v-on="$listeners"
    ></el-input>

    <yb-input-range
      v-if="type === 'inputrange'"
      v-bind="$attrs"
      v-on="$listeners"
      range-separator="-"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
    ></yb-input-range>

    <el-select
      v-el-select-loadmore="loadMore"
      @visible-change="selectVisibleChange"
      :filter-method="selectFilterMethod"
      :multiple="multiple"
      v-if="type === 'select'"
      clearable
      filterable
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-option v-for="item in selectTempList.slice(0, rangeNumber)" :label="item.label" :value="item.value" :key="item.value"></el-option>
    </el-select>

    <el-date-picker
      :value-format="props.valueFormat ? props.valueFormat : 'yyyy-MM-dd'"
      v-if="isDate"
      :type="type"
      v-bind="$attrs"
      v-on="$listeners"
      :range-separator="rangeSeparator"
      :start-placeholder="startPlaceholder || '开始日期'"
      :end-placeholder="endPlaceholder || '结束日期'"
    ></el-date-picker>

    <el-cascader
      v-if="type === 'cascader'"
      :props="props"
      :options="cascaderList"
      clearable
      v-bind="$attrs"
      v-on="$listeners"
    ></el-cascader>
  </div>
</template>

<script>
import YbInputRange from './YbInputRange'

export default {
  inheritAttrs: false,
  components: {
    YbInputRange
  },
  props: {
    rangeSeparator: {
      type: String,
      default: '至'
    },
    startPlaceholder: {
      type: String,
      default: ''
    },
    endPlaceholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    options: {
      type: Array|Function,
      default: () => {
        return []
      }
    },
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    multiple: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  },
  computed: {
    isDate () {
      const dateArr = ['year','month','date', 'dates', 'months', 'years week', 'datetime', 'datetimerange', 'daterange', 'monthrange']
      const index = dateArr.findIndex(el => el === this.type)
      if (index >= 0) return true
      return false
    },
  },
  directives: {
    'el-select-loadmore': (el, binding) => {
      const SELECTWRAP_DOM = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
      if (SELECTWRAP_DOM) {
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) binding.value();
        });
      }
    },
  },
  data () {
    return {
      selectOptions: [],
      selectList: [],
      selectTempList: [],
      cascaderList: [],
      rangeNumber: 100,
      propsLabel: 'label',
      propsValue: 'value',
      propsChildren: 'children'
    }
  },
  mounted () {
    this.initProps()
    this.getOptions()
  },
  watch: {
    options (val) {
      val && this.getOptions()
    }
  },
  methods: {
    loadMore() {
      return this.rangeNumber += 10;
    },
    getOptions () {
      if (this.type === 'select' || this.type === 'cascader') {
        if (Array.isArray(this.options)) {
          this.initOptions(this.options)
        }
        if (typeof this.options === 'function') {
          this.initOptions(this.options())
        }
      }
    },
    selectFilterMethod(val) {
      if (val) {
        this.selectTempList = this.selectList.filter((item) => {
          return item.label.indexOf(val) > -1
        })
      } else {
        this.selectTempList = [...this.selectList]
      }
    },
    getSelectList () {
      return this.selectOptions
    },
    selectVisibleChange(val) {
      val && (this.selectTempList = [...this.selectList])
    },
    initOptions (list) {
      if (!list || list.length < 0) return;
      if (this.type === 'select') {
        let tempObj = {}
        this.selectList = []
        list.forEach(el => {
          const item = tempObj[el[this.propsValue]]
          if (item != 1) {
            this.selectList.push({
              label: el[this.propsLabel],
              value: el[this.propsValue]
            })
            tempObj[el[this.propsValue]] = 1
          }
        })
        const attrsValue = this.$attrs.value
        if (attrsValue) {
          const defaultIndex = this.selectList.findIndex(el => el.value === attrsValue)
          if (defaultIndex >= this.rangeNumber) {
            const defaultItem = this.selectList.splice(defaultIndex, 1)
            this.selectList.splice(this.rangeNumber - 1, 0, ...defaultItem)
          }
        }
        this.selectTempList = [...this.selectList]
      }
      if (this.type === 'cascader') {
        list.forEach(item => {
          item[this.propsChildren].forEach(el => {
            if (el[this.propsChildren] && el[this.propsChildren].length === 0) {
              delete el[this.propsChildren]
            }
          })
        })
        this.cascaderList = list
      }
    },
    initProps () {
      if (this.props.label) {
        this.propsLabel = this.props.label
      }
      if (this.props.value) {
        this.propsValue = this.props.value
      }
      if (this.props.children) {
        this.propsChildren = this.props.children
      }
      if (this.props.method) {
        let params = {}
        if (typeof this.props.params === 'function') {
          params = this.props.params()
        } else {
          params = this.props.params
        }
        this.props.method(params).then(response => {
          if (response.result === 1) {
            const options = this.initLdataKey(response, this.props.ldata || 'ldata')
            this.selectOptions = options
            this.initOptions(options)
          }
        })
      }
    },
    initLdataKey (data, keys) {
      const keyArr = keys.split('.')
      let list = data
      keyArr.forEach(key => {
        list = list[key]
      })
      return list
    }
  }
}
</script>

<style lang="scss">
// .yb-search-class{
//   width: 100%;
// }
</style>
