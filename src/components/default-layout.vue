<template>
  <div class="default-layout">
    <el-container direction="vertical">
      <el-header class="layout-header">
        <el-menu :default-active="activeName" mode="horizontal" @select="handleSelect">
          <el-menu-item :index="key" v-for="(item, key) in menuList" :key="key">{{item.title}}</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- <navbar-layout :default-active="routePath" :show-path="showPath" :menu="menuList[activeName]"></navbar-layout> -->
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import navbarLayout from "./navbar-layout.vue"

export default {
  components: {
    // navbarLayout
  },
  computed: {
    menuList () {
      return this.$store.state.auth.menuList
    }
  },
  data () {
    return {
      count: 0,
      toPath: '',
      activeName: '',
      // routePath: '',
      // showPath: ''
    }
  },
  watch: {
    '$route.path': function (path) {
      console.log(path)
      // this.activeName = this.getActiveIndex(path)
      // this.activeName = 
      //   let menuKeys = Object.keys(this.generateMenus)
      //   for (let i = 0; i < menuKeys.length; i++) {
      //     const flag = this.getMenuPath(this.generateMenus[menuKeys[i]], this.$route.path, menuKeys[i])
      //     if (flag === false) return false
      //   }
    }
  },
  mounted () {
    this.toPath = this.$route.path
    console.log(this.toPath)
    // this.getPaths(this.menuList, this.toPath)
    // const menuKeys = Object.keys(this.menuList)
    // for (let i = 0; i < menuKeys.length; i++) {
    //   const result = this.getPaths(this.menuList[menuKeys[i]], this.toPath)
    //   if (result) {
    //     console.log('result', result)
    //     return
    //   }
    // }
  },
  methods: {
    getPaths(obj, targetPath, paths = []) {
      if (paths.length <= 0) {
        paths.push(obj.title)
      }
      if (obj.children && obj.children.length) {
        for (let index = 0; index < obj.children.length; index++) {
          this.count++
          const element = obj.children[index];
          const result = this.getPaths(element, targetPath, paths.concat(element.title))
          if (result) return
        }
      } else{
        console.log(obj.path, targetPath)
        if (obj.path == targetPath) {
          console.log(paths)
          return paths
        }
      }
      // console.log(obj.path === targetPath)
      // if (obj.path === targetPath) {
      //   paths.push(obj.title)
      //   console.log(paths)
      //   return paths
      // }
    },
    // getPaths(obj, targetPath, paths = []) {
    //   if (paths.length <= 0) {
    //     paths.push(obj.title)
    //   }
    //   const children = obj.children
    //   if (children && children.length > 0) {
    //     for (let index = 0; index < children.length; index++) {
    //       this.count++
    //       const element = children[index];
    //       const result = this.getPaths(element, targetPath, paths.concat(element.title))
    //       // console.log(result)
    //     }
    //   }
    //   // console.log(obj.path === targetPath)
    //   // if (obj.path === targetPath) {
    //   //   paths.push(obj.title)
    //   //   console.log(paths)
    //   //   return paths
    //   // }
    // },
    handleSelect (key) {
      this.activeName = key
      // this.clearKeepPage()
      // this.initChangeBarPath(this.generateMenus[key])
    },
    // getActiveIndex (path) {
    //   Object(this.menuList).forEach(menuName => {
    //   })
    // }
    // initChangeBarPath (menus) {
    //   if (menus && menus.children && menus.children.length > 0) {
    //     this.initChangeBarPath(menus.children[0])
    //   } else {
    //     this.routePath = menus.path
    //     this.showPath = menus.path
    //   }
    // },
    // getMenuPath (menus, path, menuKey) {
    //   if (menus.children && menus.children.length > 0) {
    //     for (let i = 0; i < menus.children.length; i++) {
    //       const flag = this.getMenuPath(menus.children[i], path, menuKey)
    //       if (flag === false) return false
    //     }
    //   } else {
    //     if (path.indexOf(menus.path) > -1) {
    //       this.activeName = menuKey
    //       this.routePath = menus.path
    //       this.showPath = path
    //       return false
    //     }
    //   }
    // }
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
}
</style>