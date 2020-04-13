import $http from '@/utils/http'

export function fetchPermission() {
  return $http.get('/yq/sentimentPortal/sidebar')
}
