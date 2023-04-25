<template>
  <div class="client" v-if="menuList">
    <DefaultLayout></DefaultLayout>
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
    menuList () {
      return this.$store.state.auth.menuList
    }
  },
}
</script>

<style lang="scss">
.client{
}
</style>