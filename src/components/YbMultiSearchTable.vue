<template>
  <div class="YbMultiSearchTable">
    <YbMultiTable ref="multiTable" @change="tabChange" v-bind="$attrs" v-on="$listeners" :tabs="tabList" :searchData="searchData" :auto-fetch="false">
      <template #search>
        <YbSearchGroup ref="searchGroup" :options="searchOptions" @search="onSearch">
          <slot slot="leftButton" name="leftButton"></slot>
          <slot slot="rightButton" name="rightButton"></slot>
        </YbSearchGroup>
      </template>
      <template v-for="(index, name) in $slots" :slot="name">
        <slot v-if="name !== 'search' || name !== 'leftButton' || name !== 'rightButton'" :name="name"></slot>
      </template>
    </YbMultiTable>
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  name: "YbMultiSearchTable",
  props: {
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchOptions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      searchData: {},
      tabList: []
    }
  },
  activated () {
  },
  mounted () {
    this.getSearchData()
    this.tabList = [...this.tabs]
  },
  methods: {
    getSearchData () {
      this.$refs.searchGroup && (this.searchData = this.$refs.searchGroup.get())
    },
    refresh () {
      this.$nextTick(() => {
        this.$refs.searchGroup && (this.searchData = this.$refs.searchGroup.get())
        this.$refs.multiTable && this.$refs.multiTable.refresh()
      })
    },
    onSearch (data) {
      this.searchData = data
      this.$emit('search', data)
      this.$nextTick(() => {
        this.$refs.multiTable && this.$refs.multiTable.resetRefresh()
      })
    },
    tabChange () {
      this.$refs.searchGroup && this.$refs.searchGroup.clear()
    },
    clearKeyValue (key) {
      this.$refs.searchGroup.clearKeyValue(key)
    },
    clearSelection () {
      this.$refs.multiTable && this.$refs.multiTable.clearSelection()
    }
  },
};
</script>

<style lang="scss">
</style>
 