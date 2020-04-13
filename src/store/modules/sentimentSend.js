import {
  getYqList
} from '../../api/sentimentSend'
import '../../utils/bee'
const state = {
  pagination: {},
  yqList: [],
  searchObj: {
    isAlert: '',
    orderType: '0',
    pushedStatus: '',
    isRubbish: null,
    sourceType: '',
    isLeaderData: 'false',
    timeRange: [window.Bee.DateUtils.formt((new Date(new Date().toLocaleDateString()).getTime()), 'yyyy-MM-dd HH:mm:ss'),
      window.Bee.DateUtils.formt((new Date(new Date().toLocaleDateString()).getTime() + ((24 * 60 * 60 * 1000) - 1)), 'yyyy-MM-dd HH:mm:ss')],
    manual: '',
    searchWords: null
  },
  listSearchParam: null,
  pageObj: {
    pageSize: 10,
    p: 1
  },
  hideAbstract: false
}

const mutations = {
  searchObjChange (state, data) {
    state.searchObj = Object.assign(state.searchObj, data)
    state.pageObj = Object.assign(state.pageObj, { p: 1 })
    state.listSearchParam = Object.assign(state.searchObj, state.pageObj)
  },
  pageObjChange (state, data) {
    state.pageObj = Object.assign(state.pageObj, data)
    state.listSearchParam = Object.assign({}, state.searchObj, state.pageObj)
    console.log(state.listSearchParam)
  },
  setYqList (state, yqList) {
    state.yqList = yqList
  },
  setPagination (state, pagination) {
    state.pagination = pagination
  },
  initListParam (state) {
    if (window.Bee.ObjectUtils.isEmpty(state.listSearchParam)) {
      state.listSearchParam = Object.assign(state.searchObj, state.pageObj)
    }
  },
  hideAbstractChange (state, data) {
    state.hideAbstract = data
  }
}

const actions = {
  searchObjChange ({ commit }, paramObj) {
    commit('searchObjChange', paramObj)
  },
  pageObjChange ({ commit }, paramObj) {
    commit('pageObjChange', paramObj)
  },
  initListParam ({ commit }) {
    commit('initListParam')
  },
  getYqList({ commit, state }) {
    getYqList(state.listSearchParam).then(res => {
      commit('setYqList', res.data.data.list)
      commit('setPagination', res.data.data.pagination)
    })
  },
  hideAbstractChange ({ commit }, data) {
    commit('hideAbstractChange', data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
