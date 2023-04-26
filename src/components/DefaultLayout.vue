<template>
  <div class="default-layout">
    <el-container direction="vertical">
      <div class="layout-header">
        <div class="header-logo">
          <img src="@/assets/system-title-icon.png" alt="">
        </div>
        <div class="header-menu">
          <el-menu class="header-menu-main" :default-active="activeHeaderIndex" mode="horizontal" @select="headerSelect">
            <el-menu-item :index="item.key" v-for="item in menuList" :key="item.key">
              <img class="header-menu-icon" src="./icon/account-mgmt-icon.png" alt="">
              <p>{{item.title}}</p>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="header-avatar">
          <el-avatar :src="userInfo.weChatHeadImgUrl"></el-avatar>
          <div class="header-avatar-name">
            <p class="user-account-info">{{ userInfo.userName }}</p>
            <p class="user-account-role" style="width: 100px">{{userInfo.loginRoleName}}</p>
            <!-- <el-dropdown class="user-account-dropdown">
              <span class="user-account-role" style="width: 100px">{{userInfo.loginRoleName}}</span>
            </el-dropdown> -->
          </div>
        </div>
      </div>
      <el-container v-if="asideMenu">
        <el-aside class="custom-aside" width="150px">
          <NavbarLayout :default-active="activeAsideIndex" :menu="asideMenu"></NavbarLayout>
        </el-aside>
        <el-main class="default-main-view">
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
  --header-height: 64px;
  --header-menu-background: #3064c7;
  --body-height: calc(100vh - 80px);
  .el-aside{
    height: var(--body-height);
  }
  .default-main-view{
    height: var(--body-height);
    padding: 0;
    margin-left: 10px;
  }
  .layout-header{
    background: var(--header-menu-background);
    min-width: var(--min-body-width);
    margin-bottom: 5px;
    z-index: 10;
    width: 100%;
    display: flex;
    height: var(--header-height);
    box-shadow: 4px 4px 8px 0 #ccc;
    .header-logo{
      width: 150px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 100%;
      }
    }
    .header-menu{
      position: relative;
      flex: 1;
      .header-menu-main{
        background-color: var(--header-menu-background) !important;
        position: absolute;
        left: 0;
        top: 0;
        max-height: var(--header-height);
        overflow: hidden;
        transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
        &:hover{
          max-height: 100vh;
          transition: max-height 1s ease-in-out;
        }
        .el-menu-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-size: 12px;
          border-bottom: 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          &:hover{
            background-color: var(--header-menu-background);
          }
          .header-menu-icon{
            width: 24px;
            height: 24px;
            margin-bottom: 3px;
          }
        }
        .el-menu-item.is-active{
          background: #2958b1;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .header-avatar{
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      .header-avatar-name{
        margin-left: 10px;
        .user-account-info{
          color: #fff;
          font-size: 14px;
          font-weight: 400;
          opacity: .99;
          line-height: 17px;
        }
        .user-account-role{
          color: #fff;
          font-size: 12px;
          font-weight: 400;
          opacity: .6;
          line-height: 17px;
        }
      }
    }
  }
  .custom-aside{
    .el-menu{
      border-right: 0;
      height: 100%;
      .el-menu-item, .el-submenu__title{
        height: 40px;
        line-height: 40px;
      }
      .el-menu-item.is-active{
        border-right: 3px solid #3064c7;
        background-color: rgba(48,100,199,.1);
      }
    }
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