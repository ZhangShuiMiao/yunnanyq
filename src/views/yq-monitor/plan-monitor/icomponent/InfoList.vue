<template>
  <div class="info-list">
    <search-area></search-area>
    <button-area :checkedList="checkedList">
      <template>
        <el-button type="primary"><svg-icon icon-class="export" class="icon-margin-right"></svg-icon>导出舆情</el-button>
        <el-button type="primary"><svg-icon icon-class="exportAll" class="icon-margin-right"></svg-icon>全部导出</el-button>
      </template>
    </button-area>
    <list-warp :checkAll="checkAll" @handleCheckAllChange="handleCheckAllChange" >
      <template slot="listTitle">监测结果</template>
      <template slot="listTotal">{{pagination.total}}</template>
      <template slot="listContent">
        <empty-content :isList="true" v-if="planMonitorList.length===0"></empty-content>
        <list-item v-for="(item,index) in planMonitorList" :key="item.id+index" :itemInfo="item" :index="index" :checked="checkedList.includes(item.id)" @handleCheckOne="handleCheckOne" @showDetail="showDetail">
          <template slot="operateWarp">
            <div class="operate-warp">
              <label @click="collectedOrder(item.id, index)">
                <svg-icon :icon-title="item.collected ? '取消收藏': '收藏'"  :icon-class="item.collected ? 'collection_active': 'collection'"></svg-icon>
                <span :class="item.collected ? 'active' : ''">{{item.collected ? '取消收藏': '收藏'}}</span>
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
import { mapState, mapActions } from 'vuex'
import ListWarp from '@/components/ListWarp'
import SearchArea from './SearchArea'
import ButtonArea from '@/components/ButtonArea'
import ListItem from '@/components/ListItem'
import CommonPagination from '@/components/CommonPagination'
import EmptyContent from '@/components/EmptyContent'
export default {
  name: 'index',
  components: {
    SearchArea,
    ListWarp,
    ButtonArea,
    ListItem,
    CommonPagination,
    EmptyContent
  },
  data() {
    return {
      wordTop: null,
      checkedItem: [],
      checkAll: false,
      checkedList: [], // 选中行的id数组
      checkedIndex: [], // 选中行在数组中的下标的数组
      dialogArticId: null,
      detailInfo: {},
      currentDetailIndex: null, // 当前点击详情在页面数组的下标
      listShow: false
    }
  },
  computed: {
    ...mapState('planMonitor', {
      searchObj: state => state.searchObj,
      planMonitorList: state => state.planMonitorList,
      pagination: state => state.pagination,
      pageObj: state => state.pageObj,
      listSearchParam: state => state.listSearchParam
    })
  },
  watch: {
    listSearchParam: {
      handler(val, oldVal) {
        this.getPlanMonitorList()
        this.onScrollTop()
      },
      deep: true
    },
  },
  methods: {
    ...mapActions('planMonitor', ['pageObjChange', 'searchObjChange', 'getPlanMonitorList', 'initListParam']),
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
    searchFun() {
      this.listShow = true
      this.searchObj.wordTop = this.wordTop
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
      let idIndex = this.checkedList.indexOf(id)
      if (idIndex >= 0) {
        this.checkedList.splice(idIndex, 1)
      } else {
        this.checkedList.push(id)
        this.checkedIndex.push(index)
      }
      this.checkAll = this.checkedList.length === this.yqList.length
    },
    // 导出数据
    exportData() {
      if (window.Bee.ObjectUtils.isEmpty(this.checkedList)) {
        this.$message('请先选择需要导出的数据')
        return
      }
      this.$yqHttp.post('/push/choosedExport', {
        caIds: this.checkedList
      }).then((res) => {
        window.open(res.data.data.replace('../..', process.env.VUE_APP_YQ_URL))
      })
    },
    openLink(url) {
      window.open(url, '_blank')
    },
    // 收藏
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
    // 展示详情
    showDetail({ id, index }) {
      let tempPath = '/yqDetail'
      this.$router.push({
        path: tempPath,
        query: {
          type: 1,
          index: index,
        }
      })
    },
    onScrollTop () {
      this.$nextTick(() => {
        let container = document.querySelector('#scrollContent').querySelector('.el-scrollbar__wrap')
        container.scrollTop = 0
      })
    }
  },
  created () {
    this.initListParam()
  }
}
</script>

<style scoped lang="stylus">
.info-list
  .icon-margin-right
    margin-right 8px;
  /*padding: 24px;*/
.list-warp
  padding-left 0;
</style>
