<template>
  <div @click="clearKeepPage">
    ybOrderMgmt-detail
  </div>
</template>

<script>
export default {
  name: 'ybOrderMgmtDetail',
  methods: {
    clearKeepPage () {
      this.$store.commit('removeKeepPage', 'ybOrderMgmt')
    }
  }
}
</script>

<style>

</style>