const state = {
  get userMobile () {
    return localStorage.getItem('userMobile')
  },
  set userMobile (value) {
    localStorage.setItem('userMobile', value)
  },
  get hasPermission () {
    return localStorage.getItem('hasPermission')
  },
  set hasPermission (value) {
    localStorage.setItem('hasPermission', value)
  }
}

const mutations = {
  setAccountMobile (state, data) {
    state.userMobile = data
  },
  setPermission (state, data) {
    state.hasPermission = data
  },
  loginOut(state) {
    state.hasPermission = ''
  }
}

const actions = {
  setAccountMobile ({ commit }, userMobile) {
    commit('setAccountMobile', userMobile)
  },
  setPermission ({ commit }, hasPermission) {
    commit('setPermission', hasPermission)
  },
  loginOut({ commit }) {
    commit('loginOut')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
