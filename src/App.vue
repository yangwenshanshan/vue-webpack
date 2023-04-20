<template>
  <div id="app">
    <div>测试</div>
    <img src="@/assets/logo.png">
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
  background: url('@/assets/logo.png');
}
</style>
