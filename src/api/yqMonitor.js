import $http from '@/utils/ynHttp'
export const getIntellectSearch = (paramObj) => {
  return $http.post('/search/doSearch', paramObj)
}
export const getTable = (paramObj) => {
  return $http.post('/scheme/getTable', paramObj)
}
