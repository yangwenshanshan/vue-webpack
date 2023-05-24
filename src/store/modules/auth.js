import user from '@/api/user'
import router, { clientRoute, notFoundAndNoPower, resetRouter } from '@/routers'
import authJSON from '@/routers/menu.json'
import { paramsToFormData } from '@/utils/utils'
import { Loading } from 'element-ui';
import store from '..'

let routeModules = []
const moduleFiles = require.context('../../routers/routes', false, /\.router.js$/)
moduleFiles.keys().forEach(key => {
  routeModules = routeModules.concat(moduleFiles(key).default)
})

function formatFlatteningRoutes (arr) {
	if (arr.length <= 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}

function clearEmpty (menu) {
  return menu.filter(el => el && el.children.length > 0)
}

function formatMenuList (menus) {
  const result = []
  menus.forEach(menu => {
    if (!menu.path || state.urlList.includes(menu.authPath)) {
      if (menu.children) {
        menu.children = formatMenuList(menu.children)
      }
      result.push(menu)
    }
  })
  return result
}

function setRoutes (urlList) {
  const childrenRoutes = formatFlatteningRoutes(routeModules)
  let formatRoutes = []
  childrenRoutes.forEach(el => {
    if (urlList.findIndex(url => url === el.path) >= 0) {
      formatRoutes.push(el)
    }
  })
  const client = clientRoute()
  client.children = [...formatRoutes, ...client.children]
  const routes = [
    client,
    ...notFoundAndNoPower
  ]
  resetRouter()
  routes.forEach(el => {
    router.addRoute(el)
  })
  console.log(router.getRoutes())
}

const state = {
  urlList: [],
  buttonIdList: [],
  menuList: [],
  cancelSource: {},
  resize: 0,
  appLoading: true,
  keepPages: []
}

const actions = {
  changeUserRole ({ commit }, params) {
    return new Promise((resolve, reject) => {
      const loading = Loading.service({
        fullscreen: true,
        text: '角色切换中，请稍后',
        spinner: 'el-icon-loading',
        background: "rgba(0, 0, 0, 0.8)"
      });
      user.changeUserRole(paramsToFormData(params)).then(async res => {
        if (res.result === 1) {
          await store.dispatch('getUserInfo')
          await store.dispatch('getAuthList')
          loading.close()
          if (state.menuList && state.menuList[0] && state.menuList[0].children && state.menuList[0].children[0]) {
            router.replace({
              path: state.menuList[0].children[0].path,
              query: {
                _t: new Date().getTime().toString(32)
              }
            })
          }
          resolve()
        } else {
          loading.close()
          reject()
        }
      }).catch(() => {
        loading.close()
      })
    })
  },
  getAuthList ({ commit }) {
    return new Promise((resolve, reject) => {
      user.getAuthList().then(res => {
        if (res.result === 1) {
          commit('setUrlList', res.mdata.pc)
          setRoutes(res.mdata.pc.urlList)
          const menus = formatMenuList(JSON.parse(JSON.stringify(authJSON)))
          const menuList = clearEmpty(menus)
          commit('setMenuList', menuList)
          resolve({
            pc: res.mdata.pc,
            menuList: menuList,
          })
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const mutations = {
  setCancelSource (state, source) {
    state.cancelSource = {
      ...state.cancelSource,
      ...source
    }
  },
  removeCancelSource (state, key) {
    delete state.cancelSource[key]
  },
  runCancelSource (state, key) {
    if (key !== undefined) {
      state.cancelSource[key].cancel('取消啦')
      delete state.cancelSource[key]
    } else {
      Object.keys(state.cancelSource).forEach(key => {
        state.cancelSource[key].cancel('取消啦')
        delete state.cancelSource[key]
      })
    }
  },
  setAppLoading (state, loading) {
    state.appLoading = loading
  },
  setMenuList (state, menus) {
    state.menuList = menus
  },
  setUrlList (state, mdata) {
    state.urlList = mdata.urlList
    state.buttonIdList = mdata.buttonIdList
  },
  resize (state) {
    state.resize = new Date().getTime()
  },
  setKeepPage(state, pageName) {
    const index = state.keepPages.findIndex(el => el === pageName)
    if (index <= -1) {
      state.keepPages.push(pageName)
    }
  },
  removeKeepPage(state, pageName) {
    const index = state.keepPages.findIndex(el => el === pageName)
    if (index > -1) {
      state.keepPages.splice(index, 1)
    }
  },
  clearKeepPage(state) {
    state.keepPages = []
  }
}

export default {
  state,
  actions,
  mutations
}