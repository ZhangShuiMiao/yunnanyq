<template>
  <div>
    <main-top>舆情管理</main-top>
    <search-area></search-area>
    <button-area :checkedList="checkedList">
      <template>
        <el-button type="primary" @click="createDialogShow"><svg-icon icon-class="plus" class="icon-margin-right"></svg-icon>新增舆情工单</el-button>
        <el-button type="primary" @click="markInvalidBatch"><svg-icon icon-class="rubbish" class="icon-margin-right"></svg-icon>标注无效数据</el-button>
        <el-button type="primary" @click="exportData"><svg-icon icon-class="export" class="icon-margin-right"></svg-icon>导出舆情</el-button>
      </template>
    </button-area>
    <list-warp :checkAll="checkAll" @handleCheckAllChange="handleCheckAllChange">
      <template slot="listTitle">舆情列表</template>
      <template slot="listTotal">{{pagination.total}}</template>
      <template slot="listContent">
          <empty-content :isList="true" v-if="yqList.length===0"></empty-content>
          <list-item v-for="(item,index) in yqList" :key="item.id" :itemInfo="item" :index="index" :checked="checkedList.includes(item.id)" @handleCheckOne="handleCheckOne" @showDetail="showDetail">
            <template slot="operateWarp">
              <div class="operate-warp">
                <label @click="pushWorkOrder(item.id, index)">
                  <svg-icon :icon-title="item.pushed ? '已推送': '推送舆情工单'"  :icon-class="item.pushed ? 'push_active': 'push'"></svg-icon>
                  <span :class="item.pushed ? 'active' : ''">{{item.pushed ? '已推送': '推送工单'}}</span>
                </label>
                <label @click="updateBaseData(item.id,index,4)">
                  <svg-icon :icon-title="item.leaderData? '移除领导舆情' : '标记领导舆情'"  :icon-class="item.leaderData===true ? 'mark_active' : 'mark'"></svg-icon>
                  <span :class="item.leaderData ? 'active' : ''">{{item.leaderData? '移除领导舆情' : '加入领导舆情'}}</span>
                </label>
                <label @click="updateBaseData(item.id,index,3)">
                  <svg-icon :icon-title="item.rubbish ? '无效数据':'标记无效数据'"  :icon-class="item.rubbish===true ? 'invalid_active': 'invalid'"></svg-icon>
                  <span :class="item.rubbish ? 'active' : ''">{{item.rubbish ? '无效数据':'标记无效数据'}}</span>
                </label>
              </div>
            </template>
          </list-item>
      </template>
    </list-warp>
    <common-pagination :pagination="pagination" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"></common-pagination>
    <push-dialog :dialogFormVisible="dialogFormVisible" @dialogConfirm="dialogConfirm" @handleCancel="handleCancel"></push-dialog>
    <create-dialog :dialogFormVisible="createDialogVisible" @dialogConfirm="createDialogConfirm" @handleCancel="createHandleCancel"></create-dialog>
    <detail-dialog :dialogFormVisible="detailDialogVisible" :detailInfo="detailInfo"  @handleCancel="detailHandleCancel" @pushYqOrder="pushYqOrder" @markLeader="markLeader"></detail-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import MainTop from '@/components/MainTop'
import ListWarp from '@/components/ListWarp'
import SearchArea from './icomponent/SearchArea'
import ButtonArea from '@/components/ButtonArea'
import ListItem from '@/components/ListItem'
import PushDialog from './icomponent/PushDialog'
import CreateDialog from './icomponent/CreateDialog'
import DetailDialog from './icomponent/DetailDialog'
import CommonPagination from '@/components/CommonPagination'
import EmptyContent from '../../../components/EmptyContent'
export default {
  name: 'index',
  components: {
    EmptyContent,
    SearchArea,
    MainTop,
    ListWarp,
    ButtonArea,
    ListItem,
    PushDialog,
    CreateDialog,
    DetailDialog,
    CommonPagination
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
    ...mapState('sentimentSend', {
      searchObj: state => state.searchObj,
      yqList: state => state.yqList,
      pagination: state => state.pagination,
      pageObj: state => state.pageObj,
      listSearchParam: state => state.listSearchParam
    })
  },
  watch: {
    listSearchParam: {
      handler(val, oldVal) {
        this.getYqList()
        this.$commonJs.onScrollTop()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('sentimentSend', ['pageObjChange', 'searchObjChange', 'getYqList', 'initListParam']),
    pageSizeChange(pageSize) {
      this.checkAll = false
      this.pageObjChange({
        pageSize: pageSize
      })
    },
    currentPageChange(currentPage) {
      this.checkAll = false
      this.pageObjChange({
        p: currentPage
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
    // 批量标记无效数据
    markInvalidBatch () {
      let that = this
      if (window.Bee.ObjectUtils.isEmpty(that.checkedList)) {
        this.$message('请先选择需要标记的数据')
        return
      }
      this.$yqHttp.post('/base/updateBaseData', {
        caIds: that.checkedList,
        type: 3
      }).then(res => {
        if (res.data.errorcode === 0) {
          that.checkedIndex.forEach((val) => {
            that.yqList[val].rubbish = !that.yqList[val].rubbish
          })
        }
      })
    },
    openLink(url) {
      window.open(url, '_blank')
    },
    // 标记领导舆情和无效数据方法
    updateBaseData(id, index, type) {
      this.$yqHttp.post('/base/updateBaseData', {
        caIds: [id],
        type: type
      }).then((res) => {
        if (res.data.errorcode === 0) {
          if (type === 3) {
            this.yqList[index].rubbish = !this.yqList[index].rubbish
          } else {
            this.yqList[index].leaderData = !this.yqList[index].leaderData
          }
        }
      })
    },
    // 推送工单弹窗展示
    pushWorkOrder(id, index) {
      // 列表直接点击推送带index参数 详情页点击推送不带index 参数
      if (!window.Bee.ObjectUtils.isEmpty(index)) {
        this.currentDetailIndex = index
      }
      if (this.yqList[this.currentDetailIndex].pushed) {
        this.$message('工单已推送')
        return
      }
      this.dialogArticId = id
      this.dialogFormVisible = true
    },
    // 推送工单弹窗点击确认推送工单
    dialogConfirm ({ pushCategory, pushDegree }) {
      this.$yqHttp.post('/push/pushData', {
        pushCategory: pushCategory,
        pushDegree: pushDegree,
        articleId: this.dialogArticId
      }).then(res => {
        this.yqList[this.currentDetailIndex].pushed = !this.yqList[this.currentDetailIndex].pushed
        this.detailHandleCancel()
        this.handleCancel()
      })
    },
    // 推送工单弹窗点击取消 隐藏
    handleCancel() {
      this.dialogFormVisible = false
    },
    // 新增工单弹窗显示
    createDialogShow() {
      this.createDialogVisible = true
    },
    // 新增工单弹窗点击确认
    createDialogConfirm (formParam) {
      this.$yqHttp.post('/base/addBaseData', formParam).then(res => {
        console.log(res)
        this.$message(res.data.msg)
      })
    },
    // 新增工单弹窗点击取消隐藏
    createHandleCancel() {
      this.createDialogVisible = false
    },
    // 展示详情弹窗
    showDetail({ id, index }) {
      this.detailDialogVisible = true
      this.currentDetailIndex = index
      this.$yqHttp.post('/push/articleDetail', {
        articleId: id
      }).then(res => {
        if (res.data.data) {
          this.detailInfo = res.data.data
        }
      })
    },
    // 隐藏详情弹窗
    detailHandleCancel() {
      this.detailDialogVisible = false
    },
    pushYqOrder(id) {
      this.pushWorkOrder(id, null)
    },
    markLeader(id) {
      this.$yqHttp.post('/base/updateBaseData', {
        caIds: [id],
        type: 4
      }).then((res) => {
        if (res.data.errorcode === 0) {
          this.yqList[this.currentDetailIndex].leaderData = !this.yqList[this.currentDetailIndex].leaderData
          this.detailHandleCancel()
        }
      })
    }
  },
  created () {
    this.initListParam()
  }
}
</script>

<style scoped lang="stylus">
  .icon-margin-right
    margin-right 8px;
</style>
