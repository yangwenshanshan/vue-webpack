import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

export const clientRoute = () => {
  return {
    path: '/client',
    name: 'client',
    component: () => import('@/views/client'),
    redirect: '/client/login',
    children: [
      {
        path: '/client/:path(.*)*',
        name: 'clientNotFound',
        component: () => import('@/views/error/404.vue'),
      },
    ]
  }
} 

export const notFoundAndNoPower = [{
  path: '/:path(.*)*',
  name: 'notFound',
  component: () => import('@/views/error/404.vue'),
  meta: {
    needLogin: false
  },
}]

const routes = [
  {
    path: '/',
    redirect: '/client/login',
  },
  {
    path: '/client/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      needLogin: false
    }
  },
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()

const crossroads = async (to, from, next) => {
  let urlList = store.state.auth.urlList
  if (!urlList || urlList.length === 0) {
    await store.dispatch('getAuthList')
    next({
      path: to.path,
      replace: true
    })
  } else {
    if (urlList.includes(to.path)) {
      next()
    } else {
      next({
        name: 'login',
        replace: true
      })
    }
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

router.afterEach(() => {
  if (store.state.auth.appLoading) {
    store.commit('setAppLoading', false)
  }
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router