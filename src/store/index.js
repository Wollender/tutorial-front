import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    userToken:'',
    userName: ''
  },
  getters: {

  },
  mutations: {
    set (state, data) {
      Object.assign(state, data)
    },
    setMaterial (state, material) {
      state.material = material
    }
  },
  actions: {
    setMaterial ({commit}, argu) {
      commit('setMaterial', argu)
    }
  },
  articleBack: true
})

export default store
