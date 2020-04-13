import '../../utils/bee'
const state = {
  searchObj: {
    area_code: '',
    timeRange: [window.Bee.DateUtils.formt((new Date(new Date(new Date().toLocaleDateString()).getTime() - 6 * 24 * 60 * 60 * 1000)), 'yyyy-MM-dd HH:mm:ss'),
      window.Bee.DateUtils.formt((new Date(new Date().toLocaleDateString()).getTime() + ((24 * 60 * 60 * 1000) - 1)), 'yyyy-MM-dd HH:mm:ss')],
    beginTime: window.Bee.DateUtils.formt((new Date(new Date(new Date().toLocaleDateString()).getTime() - 6 * 24 * 60 * 60 * 1000)), 'yyyy-MM-dd HH:mm:ss'),
    endTime: window.Bee.DateUtils.formt((new Date(new Date().toLocaleDateString()).getTime() + ((24 * 60 * 60 * 1000) - 1)), 'yyyy-MM-dd HH:mm:ss'),
  },
}

const mutations = {
  searchObjChange (state, data) {
    state.searchObj = Object.assign(state.searchObj, data)
    state.beginTime = state.searchObj.timeRange ? this.searchObj.timeRange[0] : ''
    state.endTime = state.searchObj.timeRange ? this.searchObj.timeRange[1] : ''
  }
}

const actions = {
  searchObjChange ({ commit }, paramObj) {
    commit('searchObjChange', paramObj)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
