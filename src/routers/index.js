import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/client/login',
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

const crossroads = async (to, from, next) => {
  let urlList = store.state.auth.urlList
  if (!urlList || urlList.length === 0) {
    const authObj = await store.dispatch('getAuthList')
    urlList = authObj.pc.urlList
  }
  if (urlList.includes(to.path)) {
    next()
  } else {
    const menuList = store.state.auth.menuList
    next({
      path: menuList[Object.keys(menuList)[0]].children[0].path
    })
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.needLogin === false) {
    next()
  } else {
    const userDto = store.state.user.userDto
    if (userDto) {
      crossroads(to, from, next)
    } else {
      const userInfo = await store.dispatch('getUserInfo')
      if (userInfo && userInfo.userDto) {
        crossroads(to, from, next)
      } else {
        next({
          name: 'login'
        })
      }
    }
  }
})

export default router