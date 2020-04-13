import $http from '@/utils/yqHttp'
export const getYqList = (paramObj) => {
  return $http.post('/push/pushDataList', paramObj)
}
