<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
#app{
  --min-body-width: 1280px;
  min-width: var(--min-body-width);
  background: #eee;
}
</style>
