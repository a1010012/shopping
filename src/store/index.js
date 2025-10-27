import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import cart from './modules/cart.js'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    token(state) {
      return state.user.userInfo.token // ✅ 正确路径：从 userInfo 中获取 token
    },
    userId(state) {
      return state.user.userInfo.userId
    }
  },
  modules: {
    //挂载
    user,
    cart
  }
})
