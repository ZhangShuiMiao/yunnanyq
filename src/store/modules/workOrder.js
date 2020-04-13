import {
  getWorkOrderList
} from '../../api/workOrder'
import '../../utils/bee'
const state = {
  pagination: {},
  workOrderList: [],
  searchObj: {
    type: null,
    area_name: null,
    data_type: null,
    sourceType: '-1',
    level: '-1',
    timeRange: [],
    keyWord: null
  },
  listSearchParam: null,
  pageObj: {
    pageSize: 10,
    pageNo: 1
  }
}

const mutations = {
  searchObjChange (state, data) {
    state.searchObj = Object.assign(state.searchObj, data)
    state.pageObj = Object.assign(state.pageObj, { pageNo: 1 })
    state.listSearchParam = Object.assign(state.searchObj, state.pageObj)
  },
  pageObjChange (state, data) {
    state.pageObj = Object.assign(state.pageObj, data)
    state.listSearchParam = Object.assign({}, state.searchObj, state.pageObj)
  },
  setWorkOrderList (state, workOrderList) {
    state.workOrderList = workOrderList
  },
  setPagination (state, pagination) {
    state.pagination = pagination
  },
  initListParam (state, data) {
    state.listSearchParam = Object.assign(state.searchObj, state.pageObj, data)
  }
}

const actions = {
  searchObjChange ({ commit }, paramObj) {
    commit('searchObjChange', paramObj)
  },
  pageObjChange ({ commit }, paramObj) {
    commit('pageObjChange', paramObj)
  },
  initListParam ({ commit }, data) {
    commit('initListParam', data)
  },
  getWorkOrderList({ commit, state }) {
    getWorkOrderList(state.listSearchParam).then(res => {
      commit('setWorkOrderList', res.data.data.dataList)
      commit('setPagination', res.data.data.pagination)
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
