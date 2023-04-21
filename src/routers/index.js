import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/client/login',
  // component: () => import('@/views/homePage')
}, {
  path: '/client/login',
  name: 'login',
  component: () => import('@/views/login'),
  meta: {
    needLogin: false
  }
}, {
  path: '/client/ybOrderMgmt',
  name: 'ybOrderMgmt',
  component: () => import('@/views/ybOrderMgmt'),
}]

const router = new Router({
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log(to.name)
  if (to.name === 'login') {
    await store.dispatch('getUserInfo')
    next()
  }
  // next()
  // if (to.meta.needLogin === false) {
  //   next()
  // } else {
  //   const userDto = store.state.user.userDto
  //   if (userDto) {
  //     next()
  //   } else {
  //     // const userInfo = await store.dispatch('getUserInfo')
  //     // console.log(userInfo)
  //     // next()
  //   }
  // }
})

export default router