<template>
  <div>
    <main-top>
      <label @click="goBack" class="back-label">
        <svg-icon icon-title="返回" icon-class="goBack"></svg-icon>
        舆情详情
      </label>
    </main-top>
    <!--工单基本信息-->
    <div class="order-detail-warp">
      <div class="order-detail-item">
        <div class="detail-item-title">
          <span class="iconTitle"><svg-icon icon-class="detail_title"></svg-icon></span>工单基本信息
        </div>
        <div class="item-info-warp">
          <el-row :gutter="20">
            <el-col :span="24">
              <label class="title">标题：</label>
              <label class="content" v-if="!!detailData"
                >{{ detailData.title === '' ? detailData.nickName : detailData.title }}
                <span v-if="Number(detailData.side) > 0"><svg-icon icon-class="positive"></svg-icon></span>
                <span v-if="Number(detailData.side) === 0"><svg-icon icon-class="nature"></svg-icon> </span>
                <span v-if="Number(detailData.side) < 0"><svg-icon icon-class="sensitive"></svg-icon></span>
              </label>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="title">舆情发布时间：</label>
              <label class="content" v-if="!!detailData">{{ detailData.issueTime }}</label>
            </el-col>
            <el-col :span="6">
              <label class="title">原文链接：</label>
              <label class="content" v-if="!!detailData"><a :href="detailData.url" target="_blank">点击查看</a></label>
            </el-col>
            <el-col :span="6">
              <label class="title">舆情来源：</label>
              <label class="content" v-if="!!detailData">{{ detailData.siteName }}</label>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!--舆情详情内容-->
    <div class="order-detail-warp">
      <div class="order-detail-item">
        <div class="detail-item-title">
          <span class="iconTitle"><svg-icon icon-class="info_title"></svg-icon></span>舆情详细内容
        </div>
        <div class="item-info-warp">
          <el-row :gutter="20">
            <el-col :span="24">
              <label class="title">舆情正文:</label>
              <div class="content text-content" v-if="!!detailData">
                {{ detailData.content }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 相关舆情 -->
    <div class="order-detail-warp">
      <div class="order-detail-item ">
        <div class="detail-item-title">
          <span class="iconTitle"><svg-icon icon-class="info_title"></svg-icon></span>相关舆情
        </div>
        <empty-content v-if="emptyContentShowFlag" class="infoClass"></empty-content>
        <div class="item-info-warp" v-for="(item, index) in relateList" :key="index">
          <el-row :gutter="20">
            <el-col :span="24">
              <label class="title">标题：</label>
              <label class="content" v-if="!!item">
                <a :href="item.url" target="_blank">
                  {{ item.title === '' ? item.nickName : item.title }}
                  <span v-if="Number(item.side) > 0"><svg-icon icon-class="positive"></svg-icon></span>
                  <span v-if="Number(item.side) === 0"><svg-icon icon-class="nature"></svg-icon></span>
                  <span v-if="Number(item.side) < 0"><svg-icon icon-class="sensitive"></svg-icon></span>
                </a>
              </label>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="title">来源：{{ item.siteName }}</label>
            </el-col>
            <el-col :span="6">
              <label class="title">发布时间：</label>
              <label class="content" v-if="!!item">{{ item.issueTime }}</label>
            </el-col>
          </el-row>
        </div>
        <common-pagination :pagination="pagination" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange" v-if="!emptyContentShowFlag"></common-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyContent from '@/components/EmptyContent'
import { mapState } from 'vuex'
import MainTop from '@/components/MainTop'
import CommonPagination from '@/components/CommonPagination'
export default {
  name: 'OrderDetail',
  components: {
    MainTop,
    CommonPagination,
    EmptyContent
  },
  data() {
    return {
      emptyContentShowFlag: false,
      index: null,
      type: null,
      dataId: null,
      detailData: null,
      /* 方案监测相关舆情接口参数 */
      getRelated: {
        searchType: 1,
        rowkey: '',
        simId: '',
        searchTime: 2,
        schemeId: '',
        pageSize: 10,
        pageNo: 1
      },
      /* 关注中心相关舆情接口参数 */
      getCol: {
        simId: '',
        rowkey: '',
        pageSize: 10,
        wordResult: '',
        wordTop: ''
      },
      relateList: [],
      pagination: {
        total: null
      }
    }
  },
  methods: {
    /* pageSize变化函数 */
    pageSizeChange(val) {
      this.getRelated.pageSize = val
      this.getRelated.pageNo = 1
      this.getInfoList()
    },
    /* 当前页变化事件 */
    currentPageChange(val) {
      this.getRelated.pageNo = val
      this.getInfoList()
    },
    /* 方案监测获取相关舆情 */
    getInfoList() {
      this.$ynHttp.post('/public/getRelated', this.getRelated).then(res => {
        /*  console.log(res) */
        if (res.data.code !== '0') {
          return false
        }
        this.relateList = res.data.data.records
        if (this.relateList.length === 0) {
          this.emptyContentShowFlag = true
        }
        /* console.log(res.data.data.total) */
        this.pagination.total = res.data.data.total
      })
    },
    /* 关注中心获取相关舆情  */
    getCenList() {
      this.$ynHttp.post('/search/getRelated', this.getCol).then(res => {
        /* console.log(res) */
        if (res.data.code !== '0') {
          return false
        }
        this.relateList = res.data.data.records
        if (this.relateList.length === 0) {
          this.emptyContentShowFlag = true
        }
        /* console.log(res.data.data.total) */
        this.pagination.total = res.data.data.total
      })
    },
    /* 通过id获取关注中心详情 */
    getColeList() {
      this.$ynHttp.get(`/collect/getCollectByID?Id=${this.dataId}`).then(res => {
        console.log(res, '关注中心')
        if (res.data.code !== '0') {
          return false
        }
        this.detailData = res.data.data
        this.getCol.rowkey = res.data.data.rowkey
        this.getCol.simId = res.data.data.simId
        this.getCenList()
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    /*    console.log(this.detailData) */
  },
  computed: {
    ...mapState('planMonitor', {
      planMonitorList: state => state.planMonitorList,
      searchObj: state => state.searchObj
    })
  },
  created() {
    this.type = Number(this.$router.history.current.query.type)
    if (this.type === 0) {
      this.dataId = Number(this.$router.history.current.query.dataId)
      this.getColeList()
    } else {
      this.index = Number(this.$router.history.current.query.index)
      this.detailData = this.planMonitorList[this.index]
      this.getRelated.schemeId = this.searchObj.schemeId
      this.getRelated.rowkey = this.planMonitorList[this.index].rowkey
      this.getRelated.simId = this.planMonitorList[this.index].simId
      this.getInfoList()
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/styles/common.styl";
.back-label
  cursor: pointer;
.button-warp
  topAreaWarp();
  padding-left 84px;
.button-bottom
  padding 20px;
  width: 100%;
  flexCenter()
.order-detail-warp
  topAreaWarp();
  .order-detail-item
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
    .detail-item-title
      padding-top:24px;
      padding-left:40px;
      color:#333;
      font-size: 16px;
    .item-info-warp
      padding: 24px 64px;
      clearFix();
      .title
        color: #7A7A7A;
        line-height: 1.5;
      .content
        color: #333333;
        line-height: 1.5;
        a
          color: #3285F1
      .text-content
        line-height 1.75;
        text-indent 2em;
        font-weight 400;
        margin-top 15px;
      .disposal-cell
        display: flex;
        margin-right: 20px;
        flex-direction: column;
        .disposal-warp
          margin-bottom: 16px;
          .disposal-circle
            display: inline-block;
            height: 10px;
            width: 10px;
            margin-right: 16px;
            border-radius: 50%;
            border: 1px solid #6ED24F;
          .disposal-content-warp
            margin-top: 4px;
            margin-left: 5px;
            padding: 20px 21px 24px;
            border-left: 1px solid #D9D9D9;
            max-width: 500px;
            .el-col
              display: flex;
              .title
                flex-shrink: 0;
                width: 70px;
                line-height 1.5;
              .content
                line-height: 1.5;
                letter-spacing: 1px;
    .el-row
      margin-bottom: 24px;
    .el-row:last-child
      margin-bottom: 0px;
.order-detail-warp >>> .iconTitle
                         display inline-block;
                         margin-right 5px;
.order-detail-warp >>> .order-detail-item .infoClass
                                            position initial;
</style>
