<template>
  <el-form class="yb-search-group" :inline="true">
    <div class="yb-search-group-item" v-for="item in options" :key="Array.isArray(item.key) ? item.key[0] : item.key" v-if="item.visible === undefined || item.visible === true || item.visible() === true">
      <el-form-item :style="item.type === 'daterange' ? 'width: 320px;' : item['collapse-tags'] ? 'width: 260px;' : (item.width ? item.width :'width: 240px;')" :label="item.title">
        <YbSearch @change="(value) => selectChange(value, item)" :collapse-tags="item['collapse-tags']" :multiple="item.multiple" :show-all-levels="item.showAllLevels" :options="item.options" :props="item.props" :start-placeholder="item.startPlaceholder" :end-placeholder="item.endPlaceholder" v-model="searchData[item.key]" :type="item.type" :placeholder="item.placeholder ? item.placeholder : placeholderType[item.type] + item.title"></YbSearch>
      </el-form-item>
    </div>
    <el-form-item class="custom-form-item">
      <slot name="leftButton"></slot>
        <el-button icon="el-icon-search" type="primary" v-if="options && options.length" @click="getSearchData">查询</el-button>
      <slot name="rightButton"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      placeholderType: {
        'input': '请输入',
        'select': '请选择',
        'cascader': '请选择',
        'date': '请选择'
      },
      searchData: {}
    }
  },
  mounted () {
    this.options.forEach(el => {
      if (el.default) {
        this.$set(this.searchData, el.key.toString(), el.default)
      }
    })
  },
  methods: {
    selectChange (value, item) {
      item.onChange && item.onChange(value)
    },
    formatData () {
      const data = {}
      Object.keys(this.searchData).forEach(key => {
        if (this.searchData[key] !== null) {
            const keys = key.split(',')
          if (keys.length > 1) {
            keys.forEach((el, index) => {
              data[el] = this.searchData[key][index]
            })
          } else {
            if (Array.isArray(this.searchData[key])) {
              const row = this.searchData[key]
              data[key] = row[row.length - 1]
            } else {
              data[key] = this.searchData[key]
            }
          }
        }
      })
      return data
    },
    getSearchData () {
      const data = this.formatData()
      this.$emit('search', data)
    },
    get () {
      const data = this.formatData()
      return data
    },
    clear () {
      this.searchData = {}
      this.getSearchData()
    },
    clearKeyValue (key) {
      delete this.searchData[key]
    }
  }
}
</script>

<style lang="scss">
.yb-search-group{
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 5px;
  .yb-search-group-item{
    padding-left: 20px;
    margin-bottom: 6px;
  }
  .el-form-item{
    align-items: center;
    margin-bottom: 3px;
    display: flex;
    .el-form-item__content{
      flex: 1;
      .yb-search-class{
        &>div{
          width: 100%;
        }
      }
    }
    .el-form-item__label{
      width: fit-content;
      min-width: fit-content;
      max-width: fit-content;
    }
  }
  .custom-form-item{
    max-width: 100%;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    min-width: 200px;
    .el-form-item__content{
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>