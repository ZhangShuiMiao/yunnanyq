<template>
    <div class="disposalTime">
      <charts-warp>
        <h3 class="charts-title">
          各区域舆情工单数量
        </h3>
        <el-row class="chart-info-warp">
          <empty-content v-if="emptyContentShowFlag"></empty-content>
          <el-col :span="16" class="order-num-warp">
            <div class="order-num-pie" id="orderNum"></div>
          </el-col>
          <el-col :span="8" class="area-time">
            <dl>
              <dt>
                <div class="area-left">
                  区域
                </div>
                <div class="num-right">
                  件数
                </div>
              </dt>
              <dd  v-for="(item,index) in areaProjectList" :key="index">
                <div class="area-left">
                  {{item.name}}
                </div>
                <div class="num-right">
                  {{item.value}}件
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
import EmptyContent from '../../../components/EmptyContent'
export default {
  name: 'OrderNum',
  components: { EmptyContent, ChartsWarp },
  computed: {
    ...mapState('home', {
      searchObj: state => state.searchObj
    }),
    orderNumEcharts() {
      return this.$echarts.init(document.querySelector('#orderNum'))
    }
  },
  watch: {
    searchObj: {
      handler(val, oldVal) {
        this.getAreaNum()
      },
      deep: true
    }
  },
  data() {
    return {
      emptyContentShowFlag: false,
      areaProjectList: [],
      newChartDataList: [],
      allAreaProjectCount: 0
    }
  },
  methods: {
    ...mapActions('home', ['searchObjChange']),
    initCharts() {
      let option = {
        tooltip: {
          trigger: 'item',
          position: 'right',
          // formatter: "{a} <br/>{b}: {c} ({d}%)",
          formatter: function(params) {
            // console.log(params)
            return (
              '<div class="mbody"><div class="mtitle">' +
              params.data.name +
              '</div>' +
              '<div class="mContent"><span>工件总量:<i>' +
              params.data.value +
              '件</i></span><span>平均时长:<i>' +
              params.data.averageTime +
              '</i></span>' +
              '</div><div class="mContent"><span>新增:<i>' +
              params.data.add +
              '件</i></span><span>已分发:<i>' +
              params.data.published +
              '件</i></span><span>已处置:<i>' +
              params.data.dispose +
              '件</i></span></div><div class="mContent"><span class="mgeneral">一般:<i>' +
              params.data.normal +
              '件</i></span><span class="msensitive">敏感:<i>' +
              params.data.sensitive +
              '件</i></span></div></div>'
            )
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#000'
          }
        },
        title: {
          text: this.allAreaProjectCount + '件',
          show: true,
          subtext: '全省工单数',
          x: 'center',
          y: '45%',
          textStyle: {
            fontSize: 25,
            color: '#000'
          },
          subtextStyle: {
            fontSize: 18,
            color: '#a6a6a6'
          }
        },
        dataRange: {
          orient: 'vertical',
          x: '0',
          y: '200',
          padding: [5, 15, 20, 5],
          min: 0,
          max: 180,
          color: ['#f9ce51', '#eb4b4b', '#8ee386', '#3285f1'],
          text: ['高', '低'], // 文本，默认为数值文本
          splitNumber: 0,
          textStyle: {
            color: '#CCC'
          },
          itemWidth: 20,
          // 图例图形高度
          itemHeight: 120
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['70%', '90%'],
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            // avoidLabelOverlap: false,
            minAngle: 5, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            label: {
              normal: {
                show: true,
                position: 'outer',
                formatter: '{b}\n{d}%',
                // formatter:function(pramas){
                //     // console.log(pramas)
                //     return pramas.data.add
                // },
                textStyle: {
                  color: '#7186A3',
                  fontSize: 10
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '10',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                lineStyle: {
                  width: 2
                }
              }
            },
            data: this.newChartDataList
          }
        ]
      }
      this.orderNumEcharts.setOption(option)
      window.addEventListener('resize', () => { this.orderNumEcharts.resize() })
    },
    getAreaNum() {
      this.$http.post('/yq/cpapi/getAreaTotalNum', {
        beginTime: this.searchObj.beginTime,
        endTime: this.searchObj.endTime
      }).then(res => {
        res = res.data
        var areaDataList = res.data.allChartDataVos
        var chartDataList = []
        // console.log(areaDataList,66666666)
        if (areaDataList.length === 0) {
          this.emptyContentShowFlag = true
          return false
        }
        areaDataList.forEach((val, index) => {
          this.allAreaProjectCount += val.totalNum
          console.log(this.allAreaProjectCount)
          var obj = {}
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
        // allAreaProjectCount
        // 数据列表从大到小排序
        this.areaProjectList = chartDataList
        // console.log(chartDataList)
        // 拷贝数组进行从小到大排序
        var newChartDataList = JSON.parse(JSON.stringify(chartDataList))
        newChartDataList.sort(function(a, b) {
          return a.value - b.value
        })
        this.newChartDataList = newChartDataList
        this.initCharts()
      })
    }
  },
  mounted() {
    this.getAreaNum()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .disposalTime
    //topAreaWarp();
    .chart-info-warp
      height: 270px;
      position relative;
      .order-num-warp
        display: flex;
        justify-content center;
        .order-num-pie
          width 100%;
          height 200px;
          margin-top 10px;
      .area-time
        margin-top 5px;
        display flex;
        justify-content center;
        .area-left
          display inline-block;
          width 75px;
        .num-right
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
