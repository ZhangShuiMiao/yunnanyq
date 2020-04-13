<template>
  <div class="base-info">
    <div class="home-item-info">
      <div class="item-content">
        <el-row>
          <el-col :span="6">
            <i class="order_total"></i>
            <div class="info-detail">
              <h3>舆情工单总数</h3>
              <div>{{baseInfoArr.totalNum}}<label>个</label></div>
            </div>
          </el-col>
          <el-col :span="6">
            <i class="create_order"></i>
            <div class="info-detail">
              <h3>新增工单数</h3>
              <div>{{baseInfoArr.pendingNum}}<label>个</label></div>
            </div>
          </el-col>
          <el-col :span="6">
            <i class="send_order"></i>
            <div class="info-detail">
              <h3>已分发工单数</h3>
              <div>{{baseInfoArr.distributeNum}}<label>个</label></div>
            </div>
          </el-col>
          <el-col :span="6">
            <i class="dispose_order"></i>
            <div class="info-detail">
              <h3>已处置工单数</h3>
              <div>{{baseInfoArr.disposeNum}}<label>个</label></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BaseInfo',
  data() {
    return {
      baseInfoArr: []
    }
  },
  computed: {
    ...mapState('home', {
      searchObj: state => state.searchObj
    })
  },
  watch: {
    searchObj: {
      handler(val, oldVal) {
        this.getBaseInfo()
      },
      deep: true
    }
  },
  methods: {
    getBaseInfo() {
      this.$http.post('/yq/cpapi/getTotalNum', {
        area_code: this.searchObj.area_code,
        beginTime: this.searchObj.timeRange[0],
        endTime: this.searchObj.timeRange[1]
      }).then(res => {
        this.baseInfoArr = res.data.data
      })
    }
  },
  created() {
    this.getBaseInfo();
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .base-info
    topAreaWarp();
    .home-item-info
      background #fff;
      box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
      .el-col
        padding-left 105px;
        .info-detail
          display: inline-block;
          padding: 41px 0 39px;
          margin-left: 35px;
          h3
            font-size 16px;
            font-weight bold;
            line-height 1.5;
          div
            margin-top 18px;
            font-size 24px;
            line-height 1.5;
            label
              color #999;
              font-size 14px;
        .order_total
          display: inline-block;
          width: 77px;
          height: 65px;
          background: url("~@/assets/images/order_total.png") no-repeat center/contain
        .create_order
          display: inline-block;
          width: 87px;
          height: 65px;
          background: url("~@/assets/images/create_order.png") no-repeat center/contain
        .send_order
          display: inline-block;
          width: 74px;
          height: 65px;
          background: url("~@/assets/images/send_order.png") no-repeat center/contain
        .dispose_order
          display: inline-block;
          width: 77px;
          height: 70px;
          background: url("~@/assets/images/dispose_order.png") no-repeat center/contain
</style>
