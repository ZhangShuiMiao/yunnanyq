import Vue from 'vue'
import Vuex from 'vuex'

import permission from './modules/permission'
import login from './modules/login'
import sentimentSend from './modules/sentimentSend'
import workOrder from './modules/workOrder'
import home from './modules/home'
import intellectSearch from './modules/intellectSearch'
import planMonitor from './modules/planMonitor'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    abstractSwitch: false
  },
  mutations: {
    toggleNavCollapse(state) {
      state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    toggleAbstractSwitch(state) {
      state.abstractSwitch = !state.abstractSwitch
    }
  },
  modules: {
    permission,
    login,
    sentimentSend,
    workOrder,
    home,
    intellectSearch,
    planMonitor
  },
  actions: {
  }
})
