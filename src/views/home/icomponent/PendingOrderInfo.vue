<template>
      <charts-warp>
        <h3 class="charts-title">
          待处理工单
        </h3>
        <div class="chart-info-warp" id="typeDistribution">
          <ul class="pending-order-list">
            <el-scrollbar ref="wrap"  class="no-xscorll" style="height: 100%;">
              <li v-for="(item, index) in pendingOrderArr" :key="index">
                <div class="pending-order-title">{{item.title}}</div>
                <div class="pending-order-time">{{item.publishTime}}&nbsp;&nbsp;{{item.siteName}}</div>
              </li>
              <li>
                <div class="pending-order-title">香格里拉买藏药被坑，价格高于市场价十倍</div>
                <div class="pending-order-time">2019-11-11 17:09:46&nbsp;&nbsp;人民网留言板</div>
              </li>
              <li>
                <div class="pending-order-title">香格里拉买藏药被坑，价格高于市场价十倍</div>
                <div class="pending-order-time">2019-11-11 17:09:46&nbsp;&nbsp;人民网留言板</div>
              </li>
              <li>
                <div class="pending-order-title">香格里拉买藏药被坑，价格高于市场价十倍</div>
                <div class="pending-order-time">2019-11-11 17:09:46&nbsp;&nbsp;人民网留言板</div>
              </li>
              <li>
                <div class="pending-order-title">香格里拉买藏药被坑，价格高于市场价十倍</div>
                <div class="pending-order-time">2019-11-11 17:09:46&nbsp;&nbsp;人民网留言板</div>
              </li>
            </el-scrollbar>
          </ul>
        </div>
      </charts-warp>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartsWarp from './ChartsWarp'
export default {
  name: 'PendingOrderInfo',
  components: { ChartsWarp },
  computed: {
    ...mapState('home', {
      searchObj: state => state.searchObj
    })
  },
  watch: {
    searchObj: {
      handler(val, oldVal) {
        this.getPendingOrder()
      },
      deep: true
    }
  },
  data() {
    return {
      pendingOrderArr: []
    }
  },
  methods: {
    ...mapActions('home', ['searchObjChange']),
    getPendingOrder() {
      this.$http.post('/yq/cpapi/newWorkOrder', {
        area_code: this.searchObj.area_code
      }).then(res => {
        this.pendingOrderArr = res.data.data.dataList
      })
    }
  },
  created() {
    this.getPendingOrder()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .chart-info-warp
    height: 270px;
    padding-top: 24px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  .pending-order-list
    height 100%;
    li
      margin-bottom 16px;
      .pending-order-title
        font-weight 500;
        margin-bottom 8px;
      .pending-order-time
        color #999;
        font-size 12px;
        font-weight 400;
</style>
