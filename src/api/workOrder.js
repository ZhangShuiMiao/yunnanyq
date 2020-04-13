import $http from '@/utils/http'
export const getWorkOrderList = (paramObj) => {
  return $http.post('/yq/search', paramObj)
}
