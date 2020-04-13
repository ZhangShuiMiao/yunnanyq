<template>
  <div>
    <main-top>智能搜索</main-top>
    <div :class="['search-area-warp',listShow ? 'fold' : '']">
      <div class="serach-contain">
        <div class="center-area">
          <el-input placeholder="请输入内容" v-model="wordTop" class="input-with-select">
            <el-button @click="searchFun" type="primary" slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
          <div class="noInformation-image"></div>
          <h3 class="tip-text">还没有进行任何搜索</h3>
        </div>
      </div>
    </div>
    <search-area v-show="listShow"></search-area>
    <button-area :checkedList="checkedList" v-show="listShow">
      <template>
        <el-button type="primary" @click="createDialogShow">隐藏摘要</el-button>
      </template>
    </button-area>
    <list-warp :checkAll="checkAll" @handleCheckAllChange="handleCheckAllChange" v-show="listShow">
      <template slot="listTitle">搜索结果</template>
      <template slot="listTotal">{{pagination.total}}</template>
      <template slot="listContent">
        <empty-content :isList="true" v-if="intellectSearchList.length===0"></empty-content>
        <list-item v-for="(item,index) in intellectSearchList" :key="item.id" :itemInfo="item" :index="index" :checked="checkedList.includes(item.id)" @handleCheckOne="handleCheckOne" @showDetail="showDetail">
          <template slot="operateWarp">
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
    <common-pagination :pagination="pagination" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange" v-show="listShow"></common-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MainTop from '@/components/MainTop'
import ListWarp from '@/components/ListWarp'
import SearchArea from './icomponent/SearchArea'
import ButtonArea from '@/components/ButtonArea'
import ListItem from '@/components/ListItem'
import CommonPagination from '@/components/CommonPagination'
import EmptyContent from '@/components/EmptyContent'
export default {
  name: 'index',
  components: {
    SearchArea,
    MainTop,
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
      dialogFormVisible: false,
      createDialogVisible: false,
      detailDialogVisible: false,
      dialogArticId: null,
      detailInfo: {},
      currentDetailIndex: null, // 当前点击详情在页面数组的下标
      listShow: false
    }
  },
  computed: {
    ...mapState('intellectSearch', {
      searchObj: state => state.searchObj,
      intellectSearchList: state => state.intellectSearchList,
      pagination: state => state.pagination,
      pageObj: state => state.pageObj,
      listSearchParam: state => state.listSearchParam
    })
  },
  watch: {
    listSearchParam: {
      handler(val, oldVal) {
        this.getIntellectSearch()
        this.onScrollTop()
      },
      deep: true
    },
  },
  methods: {
    ...mapActions('intellectSearch', ['pageObjChange', 'searchObjChange', 'getIntellectSearch', 'initListParam']),
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
        this.intellectSearchList.forEach((val, index) => {
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
      this.checkAll = this.checkedList.length === this.intellectSearchList.length
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
    // 展示详情弹窗
    showDetail({ id, index }) {
    },

    onScrollTop () {
      this.$nextTick(() => {
        let container = document.querySelector('#scrollContent').querySelector('.el-scrollbar__wrap')
        container.scrollTop = 0
      })
    }
  },
  created () {
    // this.initListParam()
  }

}
</script>

<style scoped lang="stylus">
@import "~@/assets/styles/common.styl";
.center-area .el-input-group__append
.center-area >>> .el-button
  width: 99px;
  height 32px;
  background: #3285F1;
  border-radius: 0px 4px 4px 0px;
  color #fff;
.search-area-warp
  topAreaWarp();
  margin-bottom -40px;
  .serach-contain
    position absolute;
    width 98%;
    height 90%;
    background #fff;
    .center-area
      position absolute;
      top 50%;
      left 50%;
      transform translate(-50%,-50%);
      width 500px;
      height 320px;
      .noInformation-image
        margin auto;
        margin-top 72px;
        width 192px;
        height 165px;
        background url('~@/assets/images/noInformation.png') no-repeat center/contain
      .tip-text
        width 200px;
        text-align center;
        margin auto;
        margin-top 32px;
        font-weight 400;
        color #999;
.fold
  .serach-contain
    position relative;
    width 100%;
    height 82px;
    background #fff;
    .center-area
      height 32px;
      .noInformation-image
        display none;
      .tip-text
        display none;
</style>
