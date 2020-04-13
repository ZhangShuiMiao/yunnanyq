import '../../utils/bee'
import {
  getTable
} from '../../api/yqMonitor'
const state = {
  pagination: {},
  planMonitorList: [],
  searchObj: {
    timeRange: [window.Bee.DateUtils.formt((new Date(new Date().toLocaleDateString()).getTime()), 'yyyy-MM-dd HH:mm:ss'),
      window.Bee.DateUtils.formt((new Date(new Date().toLocaleDateString()).getTime() + ((24 * 60 * 60 * 1000) - 1)), 'yyyy-MM-dd HH:mm:ss')],
    matchType: '2',
    searchType: '1',
    siteCls: null,
    side: null,
    searchTime: '2',
    orderType: '1',
    endOffset: 20,
    wordResult: null,
    queryId: 1,
    schemeId: 0,
  },
  listSearchParam: null,
  pageObj: {
    pageSize: 10,
    pageNo: 1
  },
  siteClsArr: []
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
  setPlanMonitorList (state, planMonitorList) {
    state.planMonitorList = planMonitorList
  },
  setPagination (state, pagination) {
    state.pagination = pagination
  },
  setSiteClsArr (state, siteClsArr) {
    state.siteClsArr = siteClsArr
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
  getPlanMonitorList({ commit, state }) {
    getTable(state.listSearchParam).then(res => {
      let data = res.data.data
      let records = data.table.records
      let siteClsArr = data.siteCls
      commit('setSiteClsArr', siteClsArr)
      records.forEach((val, index, arr) => {
        if (val.title.length > 40) {
          arr[index].title = arr[index].title.substring(0, 40) + '...'
        }
      })
      commit('setPlanMonitorList', records)
      let currentPage = data.table.current
      let pageSize = data.table.size
      let total = data.table.total
      commit('setPagination', { current_page: currentPage, page_size: pageSize, total: total })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
