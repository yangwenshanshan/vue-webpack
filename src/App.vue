<template>
  <div id="app" v-if="menuList">
    <defaultLayout></defaultLayout>
    <router-view></router-view>
  </div>
</template>

<script>
import defaultLayout from '@/components/default-layout.vue';

export default {
  name: 'App',
  computed: {
    menuList () {
      return this.$store.state.auth.menuList
    }
  },
  components: {
    defaultLayout
  },
}
</script>

<style lang="scss">
#app {
  // display: flex;
  // justify-content: flex-start;
  // align-items: flex-start;
  // flex-direction: column;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
  // background: url('@/assets/logo.png');
}
</style>
