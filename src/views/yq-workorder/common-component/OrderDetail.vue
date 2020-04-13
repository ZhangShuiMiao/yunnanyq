<template>
  <div>
    <main-top>
      <label @click="goBack" class="back-label">
        <svg-icon icon-title="返回" icon-class="goBack"></svg-icon>
        工单详情
      </label>
    </main-top>
    <div class="button-warp" v-show="operateButtonShow" v-if="type === 7 ? !!detailData && !detailData.hideRetreatCheck : !!detailData">
      <order-operate
        :operationResultName="detailData.operationResultName"
        :dataType="detailData.dataType"
        :dataLevel="detailData.dataLevel"
        :buttonType="detailData.buttonType"
        :disposalRequirements="disposalRequirements"
        :hiddenOta="hiddenOta"
        :cancelSenFlag="cancelSenFlag"
        @cancelSenFlagChange="cancelSenFlagChange"
        @send="send"
        @returnOrder="returnOrder"
        @forWardOta="forWardOta"
      ></order-operate>
    </div>
    <!--工单基本信息-->
    <div class="order-detail-warp">
      <div class="order-detail-item">
        <div class="detail-item-title">
          <span><svg-icon icon-class="detail_title"></svg-icon></span> 工单基本信息
        </div>
        <div class="item-info-warp">
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="title">舆情工单号：</label>
              <label class="content" v-if="!!detailData">{{ detailData.complaintId }}</label>
            </el-col>
            <el-col :span="6">
              <label class="title">工单期限状态：</label>
              <label class="content" v-if="!!detailData">{{ detailData.disposeStatus === 1 ? '-' : detailData.timeName }}</label>
            </el-col>
            <el-col :span="6">
              <label class="title">舆情级别：</label>
              <label class="content" v-if="!!detailData">{{ Number(detailData.dataLevel) === 8 && cancelSenFlag ? '敏感舆情' : '一般舆情' }}</label>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="title">工单发布时间：</label>
              <label class="content" v-if="!!detailData">{{ detailData.createTime }}</label>
            </el-col>
            <el-col :span="6">
              <label class="title">工单处置状态：</label>
              <label class="content" v-if="!!detailData">{{ detailData.operationResultName }}</label>
            </el-col>
            <el-col :span="6">
              <label class="title">工单类别：</label>
              <label class="content" v-if="!!detailData">{{ detailData.dataTypeText }}</label>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!--舆情详情内容-->
    <div class="order-detail-warp">
      <div class="order-detail-item">
        <div class="detail-item-title">
          <span><svg-icon icon-class="info_title"></svg-icon></span> 舆情详细内容
        </div>
        <div class="item-info-warp">
          <el-row :gutter="20">
            <el-col :span="24">
              <label class="title">标题：</label>
              <label class="content" v-if="!!detailData">{{ detailData.title }}</label>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="title">舆情发布时间：</label>
              <label class="content" v-if="!!detailData">{{ detailData.publishTime }}</label>
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
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="title">舆情涉及区域：</label>
              <label v-if="!!detailData" class="content"
                ><span>{{ detailData.areaName }}</span></label
              >
            </el-col>
          </el-row>
          <!--<el-row :gutter="20">-->
          <!--<el-col :span="6">-->
          <!--<label class="title">涉及关键词：</label>-->
          <!--<label class="content"><span>玉溪</span><span>红塔区</span><span>违法承包</span></label>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <el-row :gutter="20">
            <el-col :span="24">
              <label class="title">舆情正文：</label>
              <div class="content text-content" v-if="!!detailData">
                {{ detailData.content }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!--分发意见-->
    <div class="order-detail-warp">
      <div class="order-detail-item">
        <div class="detail-item-title">
          <span><svg-icon icon-class="disposeOpinion"></svg-icon></span> 分发意见
        </div>
        <div class="item-info-warp" v-if="!!detailData">
          <div class="title" v-if="detailData.disposeOpinion.length === 0">暂无分发意见</div>
          <el-row v-for="(item, index) in detailData.disposeOpinion" :key="index">
            <el-col :span="8">
              <label class="title">分发时间：</label>
              <label class="content">{{ window.Bee.DateUtils.timeFormat(item.createTime) }}</label>
            </el-col>
            <el-col :span="8">
              <label class="title">部门名称：</label>
              <label class="content">{{ item.departmentName }}</label>
            </el-col>
            <el-col :span="8">
              <label class="title">分发意见：</label>
              <label class="content">{{ item.disposeOpinion }}</label>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!--督办意见-->
    <div class="order-detail-warp">
      <div class="order-detail-item">
        <div class="detail-item-title">
          <span><svg-icon icon-class="reminderList"></svg-icon></span>  督办意见
        </div>
        <div class="item-info-warp" v-if="!!detailData">
          <div class="title" v-if="detailData.reminderList.length === 0">暂无督办意见</div>
          <el-row v-for="(item, index) in detailData.reminderList" :key="index">
            <el-col :span="8">
              <label class="title">督办时间：</label>
              <label class="content">{{ item.createTimeFormat }}</label>
            </el-col>
            <el-col :span="8">
              <label class="title">督办部门名称：</label>
              <label class="content">{{ item.departmentName }}</label>
            </el-col>
            <el-col :span="8">
              <label class="title">督办内容：</label>
              <label class="content">{{ item.reminderContent }}</label>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!--工单处置流程-->
    <div class="order-detail-warp">
      <div class="order-detail-item">
        <div class="detail-item-title">
          <span><svg-icon icon-class="disposeProcessList"></svg-icon></span>  工单处置流程
        </div>
        <div class="item-info-warp" style="display: flex;" v-if="!!detailData">
          <div class="disposal-cell" v-for="(item, index) in detailData.disposeProcessList" :key="index + 100">
            <div class="disposal-warp" v-for="(innerItem, index) in item" :key="index + 1000">
              <div class="disposal-time">
                <label class="disposal-circle"></label>
                <!--{{ innerItem.createTime }}-->
                <label class="title">第{{ innerItem.indexName }}落点：</label>
                <label class="content blue-text">{{ innerItem.firstContent }}</label>
              </div>
              <div class="disposal-content-warp">
                <el-row>
                  <el-col :span="24">
                    <label class="title">落点时间：</label>
                    <label class="content">{{ innerItem.createTime }}</label>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <label class="title">工单操作：</label>
                    <label class="content">{{ innerItem.thirdContent }}</label>
                  </el-col>
                </el-row>
                <el-row v-show="!!innerItem.retreatReason">
                  <el-col :span="24">
                    <label class="title">退回理由：</label>
                    <label class="content">{{ innerItem.retreatReason }}</label>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <label class="title">操作结果：</label>
                    <label class="content">{{ innerItem.fourthContent }}</label>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <label class="title">办结时长：</label>
                    <label class="content">{{ innerItem.secondContent }}</label>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <!--<div class="disposal-cell">-->
          <!--<div class="disposal-warp">-->
          <!--<div class="disposal-time">-->
          <!--<label class="disposal-circle"></label>2019-11-11 10:23:45-->
          <!--</div>-->
          <!--<div class="disposal-content-warp">-->
          <!--<el-row >-->
          <!--<el-col :span="24">-->
          <!--<label class="title">第一落点：</label>-->
          <!--<label class="content">201911280941462384180</label>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row >-->
          <!--<el-col :span="24">-->
          <!--<label class="title">工单操作：</label>-->
          <!--<label class="content">201911280941462384180</label>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="disposal-warp">-->
          <!--<div class="disposal-time">-->
          <!--<label class="disposal-circle"></label>2019-11-11 10:23:45-->
          <!--</div>-->
          <!--<div class="disposal-content-warp">-->
          <!--<el-row >-->
          <!--<el-col :span="24">-->
          <!--<label class="title">第一落点：</label>-->
          <!--<label class="content">201911280941462384180</label>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row >-->
          <!--<el-col :span="24">-->
          <!--<label class="title">工单操作：</label>-->
          <!--<label class="content">201911280941462384180</label>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <!--处置结果-->
    <div class="order-detail-warp" v-if="!!detailData">
      <div class="order-detail-item">
        <div class="detail-item-title">
          <span><svg-icon icon-class="disposeDetail"></svg-icon></span>  处置结果
        </div>
        <template v-if="!!detailData.disposeDetail.length">
          <div class="item-info-warp" v-for="(item, index) in detailData.disposeDetail" :key="index">
            <el-row>
              <el-col :span="24">
                <label class="title">处置时间：</label>
                <label class="content">
                  {{ item.disposeTime }}
                </label>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <label class="title">处置单位：</label>
                <label class="content">
                  {{ item.departmentName }}
                </label>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <label class="title">处置结果：</label>
                <label class="content">
                  {{ item.disposeContent }}
                </label>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="display: flex">
                <label class="title">处置凭证：</label>
                <label class="content" v-if="!!item && !!item.disposePics">
                  <img style="width: 60px;" v-for="(innerItem, index) in item.disposePics.split('@@')" :key="index + 10" :src="innerItem" preview="0" preview-text="处置凭证" />
                </label>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-else>
          <div class="item-info-warp">
            <div class="title">暂无处置结果</div>
          </div>
        </template>
      </div>
    </div>
    <div class="button-bottom">
      <order-operate
        v-show="operateButtonShow"
        v-if="type === 7 ? !!detailData && !detailData.hideRetreatCheck : !!detailData"
        :operationResultName="detailData.operationResultName"
        :dataType="detailData.dataType"
        :dataLevel="detailData.dataLevel"
        :buttonType="detailData.buttonType"
        :disposalRequirements="disposalRequirements"
        :hiddenOta="hiddenOta"
        :cancelSenFlag="cancelSenFlag"
        @cancelSenFlagChange="cancelSenFlagChange"
        @send="send"
        @returnOrder="returnOrder"
        @forWardOta="forWardOta"
      ></order-operate>
    </div>
    <send-dialog :dialogFormVisible="dialogVisible" :agreeAndSend="agreeAndSend" :departmentList="departmentList" @handleCancel="handleCancel"></send-dialog>
    <forward-ota :dialogFormVisible="otaDialogVisible" :departmentList="OtaDepartments" @handleCancel="otaHandleCancel"></forward-ota>
    <return-dialog :dialogFormVisible="returnDialogVisible" @handleCancel="returnHandleCancel"></return-dialog>
  </div>
</template>

<script>
import '@/utils/bee'
import MainTop from '@/components/MainTop'
import OrderOperate from './OrderOperate'
import SendDialog from './SendDialog'
import ReturnDialog from '../order-manage/icomponent/ReturnDialog'
import ForwardOta from '../create-order/icomponent/ForwardOta'
export default {
  name: 'OrderDetail',
  components: {
    ForwardOta,
    ReturnDialog,
    SendDialog,
    OrderOperate,
    MainTop
  },
  data() {
    return {
      window: window,
      agreeAndSend: false,
      operateButtonShow: true, // 操作按钮展示标识
      cancelSenFlag: true, // 取消敏感按钮是否展示标识
      type: null,
      dataId: null,
      allData: null,
      detailData: null,
      dialogVisible: false,
      otaDialogVisible: false,
      returnDialogVisible: false,
      departmentList: {},
      procedureId: null,
      OtaDepartments: []
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('collectionCenter') !== -1) {
      global.orderListflag = true
    } else {
      global.orderListflag = false
    }
    next()
  },
  computed: {
    disposalRequirements: function() {
      return this.detailData.disposalRequirements.includes('2')
    },
    hiddenOta: function() {
      return [0, 2, 3, 7].includes(this.type)
    }
  },
  methods: {
    getOrderDetail() {
      this.$http.get('/yq/work/detail/' + this.type + '/' + this.dataId).then(res => {
        this.allData = res.data
        this.detailData = this.allData.detailData
        this.departmentList = this.allData.departmentList
        this.OtaDepartments = this.allData.OtaDepartments
        this.$previewRefresh()
      })
    },
    // 转至ota弹窗展示
    forWardOta() {
      this.otaDialogVisible = true
    },
    // 转至ota弹窗点击取消 隐藏
    otaHandleCancel() {
      this.otaDialogVisible = false
    },
    // 分发工单弹窗点击取消 隐藏
    handleCancel() {
      this.dialogVisible = false
    },
    // 分发工单弹窗显示
    send(agreeAndSend) {
      this.agreeAndSend = agreeAndSend
      this.dialogVisible = true
    },
    returnHandleCancel() {
      this.returnDialogVisible = false
    },
    returnOrder() {
      this.returnDialogVisible = true
    },
    goBack() {
      this.$router.go(-1)
    },
    cancelSenFlagChange() {
      this.cancelSenFlag = false
    }
  },
  mounted() {
    this.getOrderDetail()
    this.$nextTick(() => {
      if (global.orderListflag) {
        this.operateButtonShow = false
      }
    })
  },
  created() {
    this.$commonJs.onScrollTop()
    this.type = Number(this.$router.history.current.query.type)
    this.dataId = Number(this.$router.history.current.query.dataId)
    this.procedureId = Number(this.$router.history.current.query.procedureId)
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
      .blue-text
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
</style>
