<template>
  <div class="client">
    <DefaultLayout v-if="menuList && menuList.length && userDto && roleInfo && roleInfo.length"></DefaultLayout>
  </div>
</template>

<script>
import DefaultLayout from '@/components/DefaultLayout.vue';

export default {
  components: {
    DefaultLayout
  },
  created () {
  },
  computed: {
    userDto () {
      return this.$store.state.user.userDto
    },
    roleInfo () {
      return this.$store.state.user.roleDTO
    },
    menuList () {
      return this.$store.state.auth.menuList
    }
  },
}
</script>