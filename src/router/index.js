import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Home from '@/views/home/index'

import Layout from '@/views/layout/index'
import Login from '@/views/login/index'
const OrderDetail = () => import('@/views/yq-workorder/common-component/OrderDetail')
const YqDetail = () => import('@/views/yq-monitor/intellect-search/icomponent/yqDetail')
Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  {
    path: '/publicSentiment',
    name: 'Login',
    component: Login
  }
]

/* 准备动态添加的路由 */
export const DynamicRoutes = [
  {
    path: '',
    component: Layout,
    name: 'container',
    redirect: 'home',
    meta: {
      requiresAuth: true,
      name: '首页'
    },
    children: [
      {
        id: 1,
        path: 'home',
        component: Home,
        name: 'home',
        meta: {
          name: '概览',
          icon: 'overview'
        }
      },
      {
        path: '/orderDetail',
        name: '',
        component: OrderDetail,
        meta: {
          name: '工单详情'
        }
      },
      {
        path: '/yqDetail',
        name: '',
        component: YqDetail,
        meta: {
          name: '舆情详情'
        }
      }
    ]
  }
  // {
  //     path: '/403',
  //     component: Forbidden
  // },
  // {
  //     path: '*',
  //     component: NotFound
  // }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
