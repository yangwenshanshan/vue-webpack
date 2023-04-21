<template>
  <div id="app">
    <!-- <el-button type="primary">测试</el-button>
    <img src="@/assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  // background: url('@/assets/logo.png');
}
</style>
