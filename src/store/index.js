import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'

Vue.use(Vuex)

const modules = {}
const moduleFiles = require.context('./modules', false, /\.js$/)
moduleFiles.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = moduleFiles(key).default
})

export default new Vuex.Store({
  modules,
  // getters
})
