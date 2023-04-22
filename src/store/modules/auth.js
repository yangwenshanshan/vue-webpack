import user from '@/api/user'
import authJSON from '../../../public/auth.json'

const state = {
  urlList: [],
  buttonIdList: [],
  menuList: null
}

const actions = {
  getAuthList ({ commit }) {
    return new Promise((resolve, reject) => {
      user.getAuthList().then(res => {
        resolve(res.mdata)
        if (res.result === 1) {
          commit('setAuthInfo', res.mdata.pc)
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
    if (state.urlList.includes(menu.authPath)) {
      if (menu.children) {
        menu.children = formatMenuList(menu.children)
      }
      result.push(menu)
    }
  })
  return result
}

const mutations = {
  setAuthInfo (state, mdata) {
    state.urlList = mdata.urlList
    state.buttonIdList = mdata.buttonIdList
    const menus = {}
    Object.keys(authJSON).forEach(key => {
      menus[key] = {
        title: authJSON[key].title,
        children: formatMenuList(authJSON[key].children)
      }
    })
    state.menuList = menus
  }
}

export default {
  state,
  actions,
  mutations
}