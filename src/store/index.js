import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
  },
  modules: {
    //挂载
    user,
  }
})
