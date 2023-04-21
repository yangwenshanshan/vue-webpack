import user from '@/api/user'

const state = {
  userDto: null,
  roleDTO: [],
  // performanceReportDto: {},
  // eGuErrorContract: null,
  // badDebtDto: {}
}

const actions = {
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      user.getUserInfo().then(res => {
        resolve(res.mdata)
        if (res.result === 1) {
          commit('setUserInfo', res.mdata)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  loginOut ({ commit }) {
    commit('clearUserInfo')
  }
}

const mutations = {
  clearUserInfo (state) {
    state.userDto = null
    state.roleDTO = []
  },
  setUserInfo (state, userInfo) {
    state.userDto = userInfo.userDto
    state.roleDTO = userInfo.roleDTO
    // state.performanceReportDto = userInfo.performanceReportDto
    // state.eGuErrorContract = userInfo.eGuErrorContract
    // state.badDebtDto = userInfo.badDebtDto
  },
  // setLoginStatus (state, status) {
  //   state.isLogin = status
  // }
}

export default {
  state,
  actions,
  mutations
}