<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="collection-warp">
    <main-top>关注中心</main-top>
    <tab-navigation @getOrderType="getOrderType"></tab-navigation>
    <list-warp :checkAll="checkAll" :hideTitle="true" @handleCheckAllChange="handleCheckAllChange">
      <template v-if="false" v-slot:listTitle>工单列表</template>
      <template v-slot:listTotal>{{pagination.total}}</template>
      <template v-slot:listContent>
        <list-item v-for="(item,index) in dataList" :key="item.id" :showCheckBox="false" :itemInfo="item" :index="index" :checked="checkedList.includes(item.id)" @handleCheckOne="handleCheckOne" @showDetail="showDetail">
          <template v-slot:operateWarp>
            <div class="operate-warp">
              <label @click="collectedOrder(item.id, index)">
                <svg-icon :icon-title="item.collected ? '取消关注': '关注'"  :icon-class="item.collected ? 'collection_active': 'collection'"></svg-icon>
                <span :class="item.collected ? 'active' : ''">{{item.collected ? '取消关注': '关注'}}</span>
              </label>
              <label @click="openLink(item.url)">
                <svg-icon icon-title="查看原文链接" icon-class="link"></svg-icon>
                <span>原文链接</span>
              </label>
            </div>
          </template>
        </list-item>
      </template>
    </list-warp>
    <common-pagination :pagination="pagination" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"></common-pagination>
  </div>
</template>
<script>
import MainTop from '@/components/MainTop'
import ListWarp from '@/components/ListWarp'
import TabNavigation from './icomponent/TabNavigation'
import ListItem from '@/components/ListItem'
import CommonPagination from '@/components/CommonPagination'

export default {
  name: 'index',
  components: {
    TabNavigation,
    MainTop,
    ListWarp,
    ListItem,
    CommonPagination
  },
  data() {
    return {
      checkedItem: [],
      checkAll: false,
      checkedList: [], // 选中行的id数组
      checkedIndex: [], // 选中行在数组中的下标的数组
      detailInfo: {},
      currentDetailIndex: null, // 当前点击详情在页面数组的下标
      type: 1, // 1为舆情 2为工单
      pageObj: {
        page: 1,
        pageSize: 10
      },
      pagination: {},
      dataList: []
    }
  },
  watch: {
    pageObj: {
      handler(val, oldVal) {
        this.getDataList()
        this.$commonJs.onScrollTop()
      },
      deep: true
    }
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank')
    },
    pageSizeChange(pageSize) {
      this.pageObj.pageSize = pageSize
    },
    currentPageChange(currentPage) {
      this.pageObj.page = currentPage
    },
    getOrderType(type) {
      this.type = type
      this.pageObj.page = 1
      this.getDataList()
    },
    getDataList() {
      console.log(this.type === 1)
      if (this.type === 1) {
        this.getListOpinion()
      } else {
        this.getListOrder()
      }
    },
    // 获取舆情列表
    getListOpinion () {
      this.$ynHttp.post('/collect/listOpinion', {
        pageNo: this.pageObj.page,
        pageSize: this.pageObj.pageSize
      }).then(res => {
        if (res.data.code === '0') {
          let dataContent = res.data.data
          this.dataList = dataContent.records
          let currentPage = dataContent.current
          let pageSize = dataContent.size
          let total = dataContent.total
          this.pagination = { current_page: currentPage, page_size: pageSize, total: total }
        }
      })
    },
    // 获取舆情工单列表
    getListOrder () {
      this.$http.get('/yq/collect/listData', {
        page: this.pageObj.page,
        pageSize: this.pageObj.pageSize
      }).then(res => {
        if (res.data.code === '0') {
          this.dataList = res.data.data
          this.pagination = res.data.pagination
        }
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
      if (this.dataList[index].collected) {
        this.$http.post('/yq/collect/delData', {
          id: this.dataList[index].id
        }).then(res => {
          if (res.data.code === '0') {
            this.dataList[index].collected = false
          }
        })
        return
      }
      this.$http.post('/yq/collect/addData', {
        query_type: this.dataList[index].dataType,
        id: this.dataList[index].id,
        timeName: this.dataList[index].timeName,
        dataTypeName: this.dataList[index].dataTypeName,
        manual: this.dataList[index].manual
      }).then(res => {
        if (res.data.code === '0') {
          this.dataList[index].collected = true
        }
      })
    },
    // 详情
    showDetail({ id, index }) {
      let tempPath = '/yqDetail'
      if (this.type === 2) {
        tempPath = '/orderDetail'
      }
      this.$router.push({
        path: tempPath,
        query: {
          type: 0,
          dataId: id,
        }
      })
    }
  },
  created () {
    this.getDataList()
    this.$commonJs.onScrollTop()
  }
}
</script>

<style scoped lang="stylus">
</style>
