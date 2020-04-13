/* 订单管理 */
const Business = () => import('@/views/business-parent')
const SentimentSend = () => import('@/views/business-parent/sentiment-send')
const YqWorkorder = () => import('@/views/yq-workorder')
const CollectionCenter = () => import('@/views/yq-workorder/collection-center')
const CreateOrder = () => import('@/views/yq-workorder/create-order')
const DisposeTemplate = () => import('@/views/yq-workorder/dispose-template')
const OrderManage = () => import('@/views/yq-workorder/order-manage')
const YqReport = () => import('@/views/yq-report')
const DayReport = () => import('@/views/yq-report/day-report')
const WeekReport = () => import('@/views/yq-report/week-report')
const MonthReport = () => import('@/views/yq-report/month-report')
const YearReport = () => import('@/views/yq-report/year-report')
const YqMoinitor = () => import('@/views/yq-monitor/index')
const IntellectSearch = () => import('@/views/yq-monitor/intellect-search')
const PlanMonitor = () => import('@/views/yq-monitor/plan-monitor')
/* 需要权限判断的路由 */
const dynamicRoutes = [
  {
    path: '/business',
    component: Business,
    name: 'BUSINESS_PARENT',
    meta: {
      name: '舆情运营',
      icon: 'yq_operation'
    },
    children: [
      {
        path: 'list',
        name: 'SENTIMENT_SEND_PAGE',
        component: SentimentSend,
        meta: {
          name: '舆情工单推送',
        }
      }
    ]
  },
  {
    path: '/workOrder',
    component: YqWorkorder,
    name: 'MANAGER_PARENT',
    meta: {
      keepAlive: false,
      name: '舆情工单',
      icon: 'yq_order'
    },
    children: [
      {
        path: '/addWork',
        name: 'ADD_WORK_PAGE',
        component: CreateOrder,
        meta: {
          keepAlive: false,
          name: '新增工单',
          icon: 'el-icon-s-operation'
        }
      },
      {
        path: '/workManager',
        name: 'WORK_MANAGER_PAGE',
        component: OrderManage,
        meta: {
          name: '工单管理',
          icon: 'el-icon-s-custom'
        }
      },
      {
        path: 'disposeTemplate',
        name: 'DISPOSE_TEMPLATE_PAGE',
        component: DisposeTemplate,
        meta: {
          name: '处置模板',
          icon: 'el-icon-s-operation'
        }
      },
      {
        path: 'collectionCenter',
        name: 'COLLECTION_CENTER_PAGE',
        component: CollectionCenter,
        meta: {
          name: '关注中心',
          icon: 'el-icon-s-operation'
        }
      }
    ]
  },
  {
    path: '/reportor',
    component: YqReport,
    name: 'REPORTOR_PARENT',
    meta: {
      name: '舆情报告',
      icon: 'yq_report'
    },
    children: [
      {
        path: '/dayReporter',
        name: 'DAY_REPORTER_PAGE',
        component: DayReport,
        meta: {
          name: '日报',
          icon: 'el-icon-s-operation'
        }
      },
      {
        path: '/weekReporter',
        name: 'WEEK_REPORTER_PAGE',
        component: WeekReport,
        meta: {
          name: '周报',
          icon: 'el-icon-s-custom'
        }
      },
      {
        path: 'monthReporter',
        name: 'MONTH_REPORTER_PAGE',
        component: MonthReport,
        meta: {
          name: '月报',
          icon: 'el-icon-s-operation'
        }
      },
      {
        path: 'yearReporter',
        name: 'YEAR_REPORTER_PAGE',
        component: YearReport,
        meta: {
          name: '年报',
          icon: 'el-icon-s-operation'
        }
      }
    ]
  },
  {
    path: '/monitor',
    component: YqMoinitor,
    name: 'MONITOR_PARENT',
    meta: {
      name: '舆情监测',
      icon: 'yq_monitor'
    },
    children: [
      {
        path: '/intellectSearch',
        name: 'INTELLECT_SEARCH_PAGE',
        component: IntellectSearch,
        meta: {
          name: '智能搜索',
          icon: 'el-icon-s-operation'
        }
      },
      {
        path: '/planMonitor',
        name: 'PLAN_MONITOR_PAGE',
        component: PlanMonitor,
        meta: {
          name: '方案监测',
          icon: 'el-icon-s-custom'
        }
      }
    ]
  }
]

export default dynamicRoutes
