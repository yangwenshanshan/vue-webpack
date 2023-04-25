<template>
  <div class="default-layout">
    <el-container direction="vertical">
      <el-header class="layout-header">
        <el-menu :default-active="activeHeaderIndex" mode="horizontal" @select="headerSelect">
          <el-menu-item :index="item.key" v-for="item in menuList" :key="item.key">{{item.title}}</el-menu-item>
        </el-menu>
      </el-header>
      <el-container v-if="asideMenu">
        <el-aside width="200px">
          <NavbarLayout :default-active="activeAsideIndex" :menu="asideMenu"></NavbarLayout>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- <div class="debug-box" v-if="userInfo.test === 1">
      <el-popover placement="bottom" width="200" trigger="click">
        <div class="server-web-list">
          <div class="server-web">服务器Web1</div>
          <div class="server-web">服务器Web2</div>
          <div class="server-web">服务器Web3</div>
          <div class="server-web">gateway</div>
          <div class="server-web">负载均衡</div>
          <div class="server-web">代理登录</div>
        </div>
        <span class="select-btn" slot="reference">选择</span>
      </el-popover>
    </div> -->
  </div>
</template>

<script>
import NavbarLayout from './NavbarLayout.vue'

export default {
  components: {
    NavbarLayout
  },
  computed: {
    menuList () {
      return this.$store.state.auth.menuList
    },
    asideMenu () {
      return this.menuList.find(el => el.key === this.activeHeaderIndex)
    },
    userInfo () {
      return this.$store.state.user.userDto
    }
  },
  data () {
    return {
      asideFirstLastPath: '',
      allPaths: [],
      activeHeaderIndex: '',
      activeAsideIndex: ''
    }
  },
  created () {
    this.allPaths = this.getPaths(this.menuList, this.$route.path)
    this.activeHeaderIndex = this.allPaths[0].key
    this.activeAsideIndex = this.allPaths[this.allPaths.length - 1].path
  },
  methods: {
    headerSelect (key) {
      if (this.activeHeaderIndex === key) return
      this.activeHeaderIndex = key
      this.activeAsideIndex = this.findFirstLastPath(this.asideMenu)
      this.$router.push(this.activeAsideIndex)
      this.$store.commit('runCancelSource')
    },
    findFirstLastPath (menu) {
      if (menu && menu.children && menu.children[0]) {
        const result = this.findFirstLastPath(menu.children[0])
        if (result) {
          return result
        }
      } else {
        return menu.path
      }
    },
    getPaths(arr, targetPath, paths = []) {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element.path === targetPath) {
          paths.push(element)
          return paths
        }
        if (element && element.children) {
          const result = this.getPaths(element.children, targetPath, paths.concat(element))
          if (result) {
            return result
          }
        }
      }
    },
  }
}
</script>

<style lang="scss">
.default-layout{
  .el-aside{
    height: calc(100vh - 60px);
    // .el-menu{
    //   height: 100%;
    // }
  }
  .layout-header{
    min-width: 2080px;
    // .el-menu--horizontal{
    //   // background-color: #3064c7;
    //   // border-bottom: none;
    //   .el-menu-item {
    //     // color: #fff;
    //     // font-size: 16px;
    //     // width: 88px;
    //     // .comment {
    //     //   opacity: 0.8;
    //     // }
    //   }
    //   .is-active{
    //     // border-bottom: none;
    //     // color: #fff;
    //     // background-color: #2958b1;
    //   }
    //   // .el-menu-item:not(.is-disabled):hover {
    //   //   color: #fff;
    //   //   background-color: #3064c7;
    //   // }
    // }
  }
  // .debug-box {
  //   position: fixed;
  //   width: fit-content;
  //   left: 0px;
  //   top: 400px;
  //   z-index: 4000;
  //   .select-btn{
  //     display: inline-block;
  //     width: 50px;
  //     line-height: 20px;
  //     text-align: center;
  //     background-color: gray;
  //     color: #fff;
  //     padding: 5px;
  //     border-radius: 0px 15px 15px 0px;
  //     cursor: pointer;
  //   }
  // }
}
</style>