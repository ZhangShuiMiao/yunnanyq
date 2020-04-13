<template>
  <div class="home">
    <search-area-warp :searchWarpHidden="true">
      <template>
        <el-form :inline="true" name="searchForm" :model="searchObj" class="demo-form-inline">
          <el-form-item label="行政区划">
            <el-select v-model="searchObj.area_code" placeholder="行政区划">
              <el-option v-for="(item,index) in areaList" :key="index" :label="item.areaName" :value="item.areaCode" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="searchObj.timeRange"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>
    </search-area-warp>
    <!--首页工单数量统计基本信息-->
    <base-info></base-info>
    <!--舆论走势与待处理工单-->
    <el-row class="movements-row">
      <el-col :span="16" class="chart-content">
        <sentiment-movements-chart></sentiment-movements-chart>
      </el-col>
      <el-col :span="8" class="order-list-content">
        <pending-order-info></pending-order-info>
      </el-col>
    </el-row>
    <!--各区域舆情工单数量-->
    <el-row class="movements-row">
      <el-col :span="12" class="chart-content">
        <order-num></order-num>
      </el-col>
      <el-col :span="12" class="order-list-content">
        <disposal-time-chart></disposal-time-chart>
      </el-col>
    </el-row>
    <!--<order-num></order-num>-->
    <!--各区域舆情工单处置时长-->
    <!--<disposal-time-chart></disposal-time-chart>-->
    <!--舆情工单类型分布-->
    <type-distribution></type-distribution>
    <!--舆情工单来源分布与占比分布-->
    <el-row class="movements-row">
      <el-col :span="16" class="chart-content">
        <source-distribution></source-distribution>
      </el-col>
      <el-col :span="8" class="order-list-content">
        <source-proportion></source-proportion>
      </el-col>
    </el-row>
    <!--全网舆情数据-->
    <whole-network></whole-network>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import SearchAreaWarp from '@/components/SearchAreaWarp'
import BaseInfo from './icomponent/BaseInfo'
import SentimentMovementsChart from './icomponent/SentimentMovementsChart'
import DisposalTimeChart from './icomponent/DisposalTimeChart'
import OrderNum from './icomponent/OrderNumChart'
import TypeDistribution from './icomponent/TypeDistributionChart'
import SourceDistribution from './icomponent/SourceDistribution'
import SourceProportion from './icomponent/SourceProportion'
import WholeNetwork from './icomponent/WholeNetworkChart'
import PendingOrderInfo from './icomponent/PendingOrderInfo'
export default {
  name: 'index',
  components: {
    PendingOrderInfo,
    WholeNetwork,
    SourceProportion,
    SourceDistribution,
    TypeDistribution,
    OrderNum,
    DisposalTimeChart,
    SentimentMovementsChart,
    BaseInfo,
    SearchAreaWarp
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: this.$commonJs.commonShortcuts
      },
      areaList: []
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
        console.log(val)
        // this.onScrollTop()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('home', ['searchObjChange']),
    getAreaList() {
      this.$http.get('/yq/cpapi/getYnAreaList').then(res => {
        if (res.data.code === '0') {
          this.areaList = res.data.data.ynAreas || []
        }
      })
    }
  },
  mounted() {
  },
  created() {
    this.getAreaList()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .home >>> .search-area-wap
    padding-top: 0!important;
  .home >>> .search-area
    padding: 0!important;
    background: transparent;
  .home
    padding-bottom 20px;
    .movements-row
      topAreaWarp();
      display flex;
      .chart-content
        margin-right 20px;
</style>
