<template>
  <section>
    <div v-for="item in menu.children" :key="item.path">
      <el-submenu v-if="item.children && item.children.length > 0" :index="item.path">
        <template slot="title">
          <span>{{item.title}}</span>
        </template>
        <navbar-layout-item :menu="item"></navbar-layout-item>
      </el-submenu>
      <el-menu-item v-else :index="item.path">
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </div>
  </section>
</template>

<script>
export default {
  name: 'navbarLayoutItem',
  props: {
    menu: {
      type: Object,
      default: () => {
        return {
          children: []
        }
      }
    }
  }
}
</script>