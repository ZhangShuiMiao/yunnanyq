<template>
    <div class="disposalTime">
      <charts-warp>
        <h3 class="charts-title">
          各区域舆情工单处置时长
        </h3>
        <el-row class="chart-info-warp">
          <el-col :span="16" class="time-info">
            <div class="time-info-item">
              <span class="chart-info-title">处置时长最长区域</span>
              <el-progress class="max-time" :show-text="false" :percentage="maxTimePercentage"></el-progress>
              <span class="chart-info-content min-name">{{projectMaxName}}</span>
              <span class="chart-info-time">{{projectMaxTime}}</span>
            </div>
            <div class="time-info-item">
              <span class="chart-info-title">处置时长最短区域</span>
              <el-progress class="min-time" :show-text="false" :percentage="minTimePercentage"></el-progress>
              <span class="chart-info-content max-name">{{projectMinName}}</span>
              <span class="chart-info-time">{{projectMinTime}}</span>
            </div>
            <div class="time-info-item">
              <span class="chart-info-title">平均处置时长</span>
              <el-progress class="aver-time" :show-text="false" :percentage="chartAverageTimePercentage"></el-progress>
              <span class="chart-info-time">{{formatAverageTime}}</span>
            </div>
          </el-col>
          <!--<el-col :span="8" class="time-pie-warp">-->
            <!--<div class="mean-disposal-time" id="meanDisposalTime"></div>-->
          <!--</el-col>-->
          <el-col :span="8" class="area-time">
            <dl>
              <dt>
                <div class="area-left">
                  区域
                </div>
                <div class="time-right">
                  处置时间
                </div>
              </dt>
              <dd  v-for="(item,index) in chartTimeList" :key="index">
                <div class="area-left">
                  {{item.name}}
                </div>
                <div class="time-right">
                  {{item.averageTime}}
                </div>
              </dd>
            </dl>
          </el-col>
        </el-row>
      </charts-warp>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartsWarp from './ChartsWarp'
export default {
  name: 'disposalTime',
  components: { ChartsWarp },
  computed: {
    ...mapState('home', {
      searchObj: state => state.searchObj
    }),
    meanDisposalTimeEcharts() {
      return this.$echarts.init(document.querySelector('#meanDisposalTime'))
    }
  },
  watch: {
    searchObj: {
      handler(val, oldVal) {
        // this.onScrollTop()
      },
      deep: true
    }
  },
  data() {
    return {
      formatAverageTime: null,
      chartAverageTime: null,
      sumChartAverageTime: null,
      chartTimeList: [],
      projectMaxName: null,
      projectMaxTime: null,
      projectMinName: null,
      projectMinTime: null,
      maxTimePercentage: 100,
      minTimePercentage: null,
      chartAverageTimePercentage: null
    }
  },
  methods: {
    ...mapActions('home', ['searchObjChange']),
    initCharts() {
      let option = {
        grid: {
          top: 5,
          bottom: 5
        },
        title: {
          text: this.formatAverageTime,
          show: true,
          subtext: '平均处置时长',
          x: 'center',
          y: '45%',
          textStyle: {
            fontSize: 20,
            color: '#000'
          },
          subtextStyle: {
            fontSize: 15,
            color: '#a6a6a6'
          }
        },
        color: ['#4191E7', '#82BEFF'],
        series: [
          {
            name: 'valueOfMarket',
            type: 'pie',
            center: ['50%', '50%'], // 饼图的圆心坐标
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              //  饼图图形上的文本标签
              normal: {
                // normal 是图形在默认状态下的样式
                show: true,
                position: 'center',
                color: '#000000',
                fontSize: 25,
                fontWeight: 'bold'
              }
            },
            data: [
              {
                value: this.chartAverageTime,
                name: '',
                label: {
                  normal: {
                    show: true
                  }
                }
              },
              {
                value: this.sumChartAverageTime,
                name: '',
                label: {
                  normal: {
                    show: false
                  }
                }
              }
            ]
          }
        ]
      }
      this.meanDisposalTimeEcharts.setOption(option)
      window.addEventListener('resize', () => { this.meanDisposalTimeEcharts.resize() })
    },
    getDisposalTime() {
      this.$http.post('/yq/cpapi/getAreaTotalNum', {
        beginTime: this.searchObj.beginTime,
        endTime: this.searchObj.endTime
      }).then(res => {
        res = res.data
        let areaDataList = res.data.allChartDataVos
        let chartDataList = []
        // console.log(areaDataList,66666666)
        if (areaDataList.length === 0) {
          this.areaFlag = true
          return false
        }
        areaDataList.forEach((val, index, arr) => {
          this.allAreaProjectCount += val.totalNum
          let obj = {}
          obj.name = val.areaName
          obj.value = val.totalNum
          obj.add = val.newAddNum
          obj.published = val.distributeNum
          obj.dispose = val.disposeNum
          // 实际时间
          obj.realTime = val.disposePeriod
          // 处理时间为时分
          obj.averageTime =
            Math.floor(val.disposePeriod) +
            '时' +
            Math.floor(
              (val.disposePeriod -
                Math.floor(val.disposePeriod)) *
              60
            ) +
            '分'
          obj.normal = val.normalNum
          obj.sensitive = val.sensitiveNum
          chartDataList.push(obj)
        })
        let newChartTimeList = JSON.parse(JSON.stringify(chartDataList))
        this.chartTimeList = newChartTimeList.sort(function(a, b) {
          return b.realTime - a.realTime
        })
        // console.log(newChartTimeList,11111)
        this.projectMaxName = newChartTimeList[0].name
        this.projectMaxTime = newChartTimeList[0].averageTime
        this.projectMinName = newChartTimeList[newChartTimeList.length - 1].name
        this.projectMinTime =
          newChartTimeList[newChartTimeList.length - 1].averageTime
        // console.log(projectMaxTime,projectMinTime, 11111)
        let sum = 0
        for (let i = 0; i < newChartTimeList.length; i++) {
          sum += Number(newChartTimeList[i].realTime)
        }
        let chartAverageTime = sum / newChartTimeList.length
        this.maxTimePercentage = 100
        this.minTimePercentage = Number(newChartTimeList[newChartTimeList.length - 1].realTime) / Number(newChartTimeList[0].realTime) * 100
        this.chartAverageTimePercentage = chartAverageTime / Number(newChartTimeList[0].realTime) * 100
        // console.log(sum,chartAverageTime)
        // 平均时间的格式处理
        let formatAverageTime =
          Math.floor(chartAverageTime) +
          '时' +
          Math.floor((chartAverageTime - Math.floor(chartAverageTime)) * 60) +
          '分'
        let nowTime = '20:05'
        this.formatAverageTime = formatAverageTime
        this.chartAverageTime = chartAverageTime
        this.sumChartAverageTime = chartAverageTime + sum
        this.initCharts()
      })
    }
  },
  mounted() {
    this.getDisposalTime()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .min-time >>> .el-progress-bar__inner
    background #3285F1;
  .max-time >>> .el-progress-bar__inner
    background #EB4B4B;
  .aver-time >>> .el-progress-bar__inner
    background #9CEE94;
  .el-progress
    width 220px;
  .aver-time
    .el-progress-bar__inner
      background #9CEE94;
  .disposalTime
    //topAreaWarp();
    .chart-info-warp
      height: 270px;
      .time-info
        padding-top:0.51rem;
        /*padding-left: 2.17rem;*/
        .time-info-item
          margin-bottom 48px;
          display flex;
          align-items center;
          .chart-info-title
            font-weight 500;
            width 160px;
            display inline-block;
            text-align right;
            margin-right 8px;
          .chart-info-time
            margin-left 12px;
            font-weight 400;
            color #666;
          .chart-info-content
            font-size 16px;
            font-weight bold;
            margin-left 8px;
          .max-name
            color: #3285F1;
          .min-name
            color: #EB4B4B;
      .time-pie-warp
        display: flex;
        justify-content center;
        .mean-disposal-time
          width 180px;
          height 180px;
          margin-top 30px;
      .area-time
        margin-top 5px;
        display flex;
        justify-content center;
        .area-left
          display inline-block;
          width 75px;
        .time-right
          display inline-block;
        dt
          font-weight bold;
          margin-bottom 24px;
        dd
          color: #666;
          font-weight 500;
          margin-bottom 24px;
      .el-col
        height 100%;
</style>
