<template>
  <div class="yb-tabs-component">
    <div class="yb-tabs-component_list" v-if="tabType === 'badge'">
      <div class="yb-tabs-component_list_item" v-for="(item, index) in tabs" :key="item.index" @click="changeTab(index)">
        <el-badge :value="countProps && item.countName ? countProps[item.countName] : ''">
          <p class="yb-tabs-component_list_item-title" :class="activeIndex == index ? 'yb-tabs-component_list_active-title' : ''">{{item.title}}</p>
        </el-badge>
      </div>
    </div>
    <el-tabs v-if="tabType === 'tab'" v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="item.index" :label="countProps && item.countName && countProps[item.countName] ? item.title + '(' + countProps[item.countName] + ')' : item.title + '(0)'" :name="index + ''">
      </el-tab-pane>
    </el-tabs>
    <div class="yb-tabs-component_tip">
      <slot name="tips"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabType: {
      type: String,
      default: 'badge'
    },
    countProps: {
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
    value: {
      type: String|Number,
      default: ''
    }
  },
  watch: {
    value: {
      handler(val){
        this.activeIndex = val
      },
      immediate: true
    }
  },
  data () {
    return {
      activeIndex: ''
    }
  },
  methods: {
    handleClick () {
      this.$emit('input', this.activeIndex)
      this.$emit('change', this.activeIndex)
      this.$emit('click', this.activeIndex)
    },
    changeTab (index) {
      this.$emit('input', index)
      this.$emit('change', index)
      this.$emit('click', index)
    }
  }
}
</script>

<style lang="scss">
.yb-tabs-component{
  display: flex;
  align-items: center;
  .yb-tabs-component_list{
    display: flex;
    align-items: center;
    flex: 1;
    flex-wrap: wrap;
    .yb-tabs-component_list_item{
      height: 32px;
      box-sizing: border-box;
      font-size: 12px;
      border-radius: 3px;
      margin-right: 30px;
      cursor: pointer;
      .yb-tabs-component_list_item-title{
        padding: 9px 15px 0 20px;
        height: 20px;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
      }
      .yb-tabs-component_list_active-title{
        background: #3064c7;
        border: 1px solid #3064c7;
        color: #fff;
      }
    }
  }
  .el-tabs--top {
    padding-left: 10px;
    width: 100%;
  }

  .el-tabs__active-bar {
    width: 84px;
  }

  .el-tabs__item {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 2px;
  }
  .yb-tabs-component_tip{
    margin-bottom: 15px;
  }
}
</style>