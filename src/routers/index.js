import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

// const formatFlatteningMenu = (arr) => {
// 	if (arr.length <= 0) return false;
// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i].children) {
//       arr[i].children.forEach(el => {
//         let path = ''
//         if (arr[i].key) {
//           path = arr[i].key
//         } else {
//           path = arr[i].path.replace(/(\/|client)/g, '')
//         }
//         if (arr[i].parent) {
//           el.parent = [...arr[i].parent, path]
//         } else {
//           el.parent = [path]
//         }
//       })
// 			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
// 		}
// 	}
// 	return arr;
// }

// const clientRoutes = []

// const initClientRoutes = async () => {
//   const userInfo = await store.dispatch('getUserInfo')
//   if (userInfo && userInfo.userDto) {
//     const menuList = await store.dispatch('getAuthList')
//     const formatRouterList = formatFlatteningMenu(menuList)
  
//     let routeModules = []
//     const moduleFiles = require.context('./routes', false, /\.router.js$/)
//     moduleFiles.keys().forEach(key => {
//       routeModules = routeModules.concat(moduleFiles(key).default)
//     })
  
//     formatRouterList.forEach(el => {
//       const item = routeModules.find(route => route.path === el.authPath)
//       if (item) clientRoutes.push(item)
//     })
//   }
// }

// initClientRoutes()

let routeModules = []
const moduleFiles = require.context('./routes', false, /\.router.js$/)
moduleFiles.keys().forEach(key => {
  routeModules = routeModules.concat(moduleFiles(key).default)
})

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
  path: '/client',
  name: 'client',
  component: () => import('@/views/client'),
  redirect: '/client/login',
  children: [
    ...routeModules,
    {
      path: '/client/:path(.*)*',
      name: 'notFound',
      component: () => import('@/views/error/404.vue'),
    }
  ]
}, {
  path: '/:path(.*)*',
  name: 'notFound',
  component: () => import('@/views/error/404.vue'),
  meta: {
    needLogin: false
  },
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
    next({
      name: 'login'
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