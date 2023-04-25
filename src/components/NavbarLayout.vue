<template>
  <el-menu :default-active="defaultActive" @select="asideSelect">
    <NavbarLayoutItem :menu="menu"></NavbarLayoutItem>
  </el-menu>
</template>

<script>
import NavbarLayoutItem from "./NavbarLayoutItem.vue"

export default {
  name: 'navbarLayout',
  components: {
    NavbarLayoutItem
  },
  props: {
    defaultActive: {
      type: String,
      default: ''
    },
    menu: {
      type: Object,
      default: () => {
        return {
          children: []
        }
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    asideSelect (path) {
      this.$store.commit('runCancelSource')
      if (path !== this.$route.path) this.$router.push(path)
    }
  }
}
</script>