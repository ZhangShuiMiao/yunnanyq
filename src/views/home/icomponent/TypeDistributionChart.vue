<template>
    <div class="type-distribution">
      <charts-warp>
        <h3 class="charts-title">
          舆情工单类型分布
        </h3>
        <empty-content v-if="emptyContentShowFlag"></empty-content>
        <div class="chart-info-warp" id="typeDistribution">
        </div>
      </charts-warp>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartsWarp from './ChartsWarp'
import EmptyContent from '../../../components/EmptyContent'
export default {
  name: 'TypeDistribution',
  components: { EmptyContent, ChartsWarp },
  computed: {
    ...mapState('home', {
      searchObj: state => state.searchObj
    }),
    typeDistributionEcharts() {
      return this.$echarts.init(document.querySelector('#typeDistribution'))
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
      xData: null,
      sensitive: null,
      nomal: null,
      categoryFlag: false, // 类别分布无数据控制
      emptyContentShowFlag: false
    }
  },
  methods: {
    ...mapActions('home', ['searchObjChange']),
    initCharts() {
      let sensitiveNum = 0
      let nomalNum = 0
      for (let i = 0; i < this.sensitive.length; i++) {
        sensitiveNum += parseInt(this.sensitive[i])
      }
      for (let i = 0; i < this.nomal.length; i++) {
        nomalNum += parseInt(this.nomal[i])
      }
      let sumData = [
        { name: '一般', value: nomalNum },
        { name: '敏感', value: sensitiveNum }
      ]
      // console.log(sumData);
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['一般', '敏感'],
          x: 'right',
          // y:"30",
          formatter: function(name) {
            let index = 0
            // 用来格式化图例文本，支持字符串模板和回调函数两种形式。模板变量为图例名称 {name}
            for (let i = 0; i < sumData.length; i++) {
              if (name === sumData[i].name) {
                index = i
                return name + ' : ' + sumData[index].value
              }
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          name: '单位: 件',
          axisTick: {
            // y轴刻度线
            show: false
          },
          axisLine: { show: false }
        },
        xAxis: {
          type: 'category',
          data: this.xData
        },
        series: [
          {
            name: '敏感',
            type: 'bar',
            stack: '总量',
            barWidth: 40,
            color: '#ff2929',
            data: this.sensitive
          },
          {
            name: '一般',
            type: 'bar',
            stack: '总量',
            barWidth: 40,
            color: '#348bff',
            data: this.nomal
          }
        ]
      }
      this.typeDistributionEcharts.setOption(option)
      window.addEventListener('resize', () => { this.typeDistributionEcharts.resize() })
    },
    getTypeDistributionData() {
      this.$http.post('/yq/cpapi/getDataTypeTotalNum', {
        area_code: this.searchObj.area_code,
        beginTime: this.searchObj.timeRange ? this.searchObj.timeRange[0] : '',
        endTime: this.searchObj.timeRange ? this.searchObj.timeRange[1] : '',
      }).then(res => {
        res = res.data
        let normalCategoryList = res.data.normalDataVoList
        if (normalCategoryList.length === 0) {
          this.emptyContentShowFlag = true
          return false
        }
        let nomalData = []
        let xData = []
        let dataInfoList = []
        for (let i = 0; i < normalCategoryList.length; i++) {
          let item = normalCategoryList[i]
          xData.push(item.dataType)
          nomalData.push(item.total)
        }
        // 敏感数据
        let sensitiveData = []
        let sensitiveCateList = res.data.sensitiveDataVoList
        for (let i = 0; i < sensitiveCateList.length; i++) {
          let item = sensitiveCateList[i]
          sensitiveData.push(item.total)
        }
        this.xData = xData
        this.sensitive = sensitiveData
        this.nomal = nomalData
        this.initCharts()
      })
    }
  },
  mounted() {
    this.getTypeDistributionData()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .type-distribution
    topAreaWarp();
    .chart-info-warp
      height: 270px;
</style>
