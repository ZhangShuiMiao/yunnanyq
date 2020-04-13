import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.styl'
import './utils/bee'
import './plugins/rem'
import commonJs from './plugins/common'
import './assets/svg-icon'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './utils/http'
import yqHttp from './utils/yqHttp'
import ynHttp from './utils/ynHttp'
import echarts from 'echarts'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.prototype.$http = http
Vue.prototype.$yqHttp = yqHttp
Vue.prototype.$ynHttp = ynHttp

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.prototype.$commonJs = commonJs

Vue.use(ElementUI)
Vue.use(preview)

global.orderListflag = false

router.beforeEach((to, from, next) => {
  if (!store.state.login.hasPermission) {
    if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
      next()
    } else {
      next({ path: '/publicSentiment' })
    }
  } else {
    if (!store.state.permission.permissionList) {
      store.dispatch('permission/FETCH_PERMISSION').then(() => {
        next({ path: to.path })
      })
    } else {
      if (to.path !== '/publicSentiment') {
        console.log(from)
        console.log(to.query)
        next()
      } else {
        next(from.fullPath)
      }
    }
  }
})

router.afterEach((to, from, next) => {
  // var routerList = to.matched
  if (to.name !== '') {
    store.commit('permission/SET_CURRENT_MENU', to.name)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
