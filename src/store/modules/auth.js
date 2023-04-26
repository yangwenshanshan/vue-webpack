import user from '@/api/user'
import authJSON from '@/routers/menu.json'

const state = {
  urlList: [],
  buttonIdList: [],
  menuList: [],
  cancelSource: {},
  resize: 0
}

const actions = {
  getAuthList ({ commit }) {
    return new Promise((resolve, reject) => {
      user.getAuthList().then(res => {
        if (res.result === 1) {
          commit('setAuthInfo', res.mdata.pc)
          const menus = formatMenuList(authJSON)
          commit('setMenuList', menus)
          resolve(res.mdata)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
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
  setMenuList (state, menus) {
    state.menuList = menus
  },
  setAuthInfo (state, mdata) {
    state.urlList = mdata.urlList
    state.buttonIdList = mdata.buttonIdList
  },
  resize (state) {
    state.resize = new Date().getTime()
  }
}

export default {
  state,
  actions,
  mutations
}