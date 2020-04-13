<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <main-top>新增管理</main-top>
    <tab-navigation></tab-navigation>
    <search-area></search-area>
    <list-warp :checkAll="checkAll" :hideCheckBox="true" @handleCheckAllChange="handleCheckAllChange">
      <template v-slot:listTitle>工单列表</template>
      <template v-slot:listTotal>{{pagination.total}}</template>
      <template v-slot:listContent>
        <empty-content :isList="true" v-if="workOrderList.length===0"></empty-content>
        <list-item v-for="(item,index) in workOrderList" :showCheckBox="false" :type="searchObj.type" :key="item.id" :itemInfo="item" :index="index" :checked="checkedList.includes(item.id)" @handleCheckOne="handleCheckOne" @showDetail="showDetail">
          <template v-slot:operateWarp>
            <div class="operate-warp">
              <!--<label v-if="Number(item.dataType) === 7" @click="forwardOta(item.id, index)">-->
                <!--&lt;!&ndash;<svg-icon :icon-title="item.collected ? '取消关注': '关注'"  :icon-class="item.collected ? 'collection_active': 'collection'"></svg-icon>&ndash;&gt;-->
                <!--<span :class="item.collected ? 'active' : ''">转至OTA</span>-->
              <!--</label>-->
              <label @click="collectedOrder(item.id, index)">
                <svg-icon :icon-title="item.collected ? '取消关注': '关注'"  :icon-class="item.collected ? 'collection_active': 'collection'"></svg-icon>
                <span :class="item.collected ? 'active' : ''">{{item.collected ? '取消关注': '关注'}}</span>
              </label>
            </div>
          </template>
        </list-item>
      </template>
    </list-warp>
    <common-pagination :pagination="pagination" :hidePageSize='true' @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"></common-pagination>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import MainTop from '@/components/MainTop'
import ListWarp from '@/components/ListWarp'
import SearchArea from '../common-component/SearchArea'
import TabNavigation from './icomponent/TabNavigation'
import ListItem from '@/components/ListItem'
import CommonPagination from '@/components/CommonPagination'
import EmptyContent from '@/components/EmptyContent'
export default {
  name: 'index',
  components: {
    SearchArea,
    TabNavigation,
    MainTop,
    ListWarp,
    ListItem,
    CommonPagination,
    EmptyContent
  },
  data() {
    return {
      checkedItem: [],
      checkAll: false,
      checkedList: [], // 选中行的id数组
      checkedIndex: [], // 选中行在数组中的下标的数组
      dialogFormVisible: false,
      createDialogVisible: false,
      detailDialogVisible: false,
      dialogArticId: null,
      detailInfo: {},
      currentDetailIndex: null // 当前点击详情在页面数组的下标
    }
  },
  computed: {
    ...mapState('workOrder', {
      searchObj: state => state.searchObj,
      workOrderList: state => state.workOrderList,
      pagination: state => state.pagination,
      pageObj: state => state.pageObj,
      listSearchParam: state => state.listSearchParam
    })
  },
  watch: {
    listSearchParam: {
      handler(val, oldVal) {
        this.getWorkOrderList()
        this.$commonJs.onScrollTop()
      },
      deep: true
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(window.Bee.ObjectUtils.isEmpty(from.query))
    // 判断是从当前新增工单管理的详情页返回 就做不改变查询条件值得标识
    if (from.path === '/orderDetail' && Object.keys(from.query).length !== 0 && [11, 1, 6, 4, 5].includes(from.query.type)) {
      global.orderListflag = true
    } else {
      global.orderListflag = false
    }
    next()
  },
  methods: {
    ...mapActions('workOrder', ['pageObjChange', 'searchObjChange', 'getWorkOrderList', 'initListParam']),
    pageSizeChange(pageSize) {
      this.pageObjChange({
        pageSize: pageSize
      })
    },
    currentPageChange(currentPage) {
      this.pageObjChange({
        pageNo: currentPage
      })
    },
    // 点击全选
    handleCheckAllChange() {
      this.checkAll = !this.checkAll
      if (this.checkAll) {
        this.checkedList = []
        this.checkedIndex = []
        this.yqList.forEach((val, index) => {
          this.checkedList.push(val.id)
          this.checkedIndex.push(index)
        }, this)
      } else {
        this.checkedList = []
        this.checkedIndex = []
      }
    },
    // 点击单选
    handleCheckOne({ id, index }) {
      console.log(id)
      let idIndex = this.checkedList.indexOf(id)
      if (idIndex >= 0) {
        this.checkedList.splice(idIndex, 1)
      } else {
        this.checkedList.push(id)
        this.checkedIndex.push(index)
      }
      console.log(this.checkedList)
      this.checkAll = this.checkedList.length === this.yqList.length
    },
    // 工单关注
    collectedOrder(id, index) {
      if (this.workOrderList[index].collected) {
        this.$http.post('/yq/collect/delData', {
          id: this.workOrderList[index].id
        }).then(res => {
          if (res.data.code === '0') {
            this.workOrderList[index].collected = false
          }
        })
        return
      }
      this.$http.post('/yq/collect/addData', {
        query_type: this.workOrderList[index].dataType,
        id: this.workOrderList[index].id,
        timeName: this.workOrderList[index].timeName,
        dataTypeName: this.workOrderList[index].dataTypeName,
        manual: this.workOrderList[index].manual
      }).then(res => {
        if (res.data.code === '0') {
          this.workOrderList[index].collected = true
        }
      })
    },
    // 详情
    showDetail({ id, index }) {
      this.$router.push({
        path: 'orderDetail',
        query: {
          type: this.searchObj.type,
          dataId: id,
          procedureId: this.workOrderList[index].procedureId
        }
      })
    }
  },
  created () {
    // 不是从详情也返回 置类型为全部
    if (!global.orderListflag) {
      this.initListParam({ type: 11, pageSize: 10, pageNo: 1 })
    }
    this.$commonJs.onScrollTop()
  }
}
</script>

<style scoped lang="stylus">
</style>
