<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <div class="app-loading" v-if="appLoading">
        <p>加载中</p>
        <BounceLoading></BounceLoading>
      </div>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>

<script>
import BounceLoading from '@/components/BounceLoading'

export default {
  components: {
    BounceLoading
  },
  name: 'App',
  computed: {
    appLoading () {
      return this.$store.state.auth.appLoading
    }
  },
  created () {
    window.addEventListener('resize', () => {
      this.$store.commit('resize')
    })
  }
}
</script>

<style lang="scss">
body{
  --header-height: 64px;
  --header-menu-background: #3064c7;
  --body-height: calc(100vh - 75px);
  --min-body-width: 1280px;
}
#app{
  min-width: var(--min-body-width);
  background: #eee;
  font-weight: bold;
}
.app-loading{
  position: fixed;
  color: var(--header-menu-background);
  width: 100%;
  height: 100%;
  z-index: 1000;
  font-size: 30px;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-dropdown-menu{
  width: 180px;
  max-height: 300px;
  overflow-y: auto;
  .user-account-dropdown-info{
    display: flex;
    align-items: center;
    padding: 3px 8px;
    .icon{
      height: 10px;
      width: 10px;
      margin-right: 3px;
    }
  }
}
</style>
