import HttpRequest from '@/utils/request'
const BASE_URL = process.env.VUE_APP_YN_URL
const http = new HttpRequest(BASE_URL)
export default http
