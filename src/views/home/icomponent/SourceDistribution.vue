<template>
    <charts-warp>
      <h3 class="charts-title">
        舆情工单来源分布
      </h3>
      <empty-content v-if="emptyContentShowFlag"></empty-content>
      <div class="source-distribution" id="sourceDistribution"></div>
    </charts-warp>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartsWarp from './ChartsWarp'
import EmptyContent from '../../../components/EmptyContent'
export default {
  name: 'SourceDistribution',
  components: { EmptyContent, ChartsWarp },
  computed: {
    ...mapState('home', {
      searchObj: state => state.searchObj
    }),
    sourceDistributionEcharts() {
      return this.$echarts.init(document.querySelector('#sourceDistribution'))
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
      console.log(sumData)
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
      this.sourceDistributionEcharts.setOption(option)
      window.addEventListener('resize', () => { this.sourceDistributionEcharts.resize() })
    },
    getTypeDistributionData() {
      this.$http.post('/yq/cpapi/getSourceTypeTotalNum', {
        area_code: this.searchObj.area_code,
        beginTime: this.searchObj.beginTime,
        endTime: this.searchObj.endTime
      }).then(res => {
        res = res.data
        res = {
          'normalDataVoList': [{
            'dateStr': null,
            'total': '6',
            'areaName': null,
            'dataType': null,
            'sourceType': '论坛',
            'areaCode': null,
            'totalNum': 0,
            'normalNum': 0,
            'sensitiveNum': 0,
            'newAddNum': 0,
            'distributeNum': 0,
            'disposeNum': 0,
            'disposePeriod': 0.0,
            'dataId': null,
            'disposeId': null,
            'disposeDetailId': null,
            'disposeStatus': null,
            'passDepartmentPath': null,
            'currentDepartment': null,
            'updateTime': null,
            'passTime': null,
            'id': null,
            'retreatFlag': null,
            'dispenseFlag': null,
            'userIds': null,
            'createTime': null
          }, {
            'dateStr': null,
            'total': '2',
            'areaName': null,
            'dataType': null,
            'sourceType': '微博',
            'areaCode': null,
            'totalNum': 0,
            'normalNum': 0,
            'sensitiveNum': 0,
            'newAddNum': 0,
            'distributeNum': 0,
            'disposeNum': 0,
            'disposePeriod': 0.0,
            'dataId': null,
            'disposeId': null,
            'disposeDetailId': null,
            'disposeStatus': null,
            'passDepartmentPath': null,
            'currentDepartment': null,
            'updateTime': null,
            'passTime': null,
            'id': null,
            'retreatFlag': null,
            'dispenseFlag': null,
            'userIds': null,
            'createTime': null
          }, {
            'dateStr': null,
            'total': '1',
            'areaName': null,
            'dataType': null,
            'sourceType': '新闻网站',
            'areaCode': null,
            'totalNum': 0,
            'normalNum': 0,
            'sensitiveNum': 0,
            'newAddNum': 0,
            'distributeNum': 0,
            'disposeNum': 0,
            'disposePeriod': 0.0,
            'dataId': null,
            'disposeId': null,
            'disposeDetailId': null,
            'disposeStatus': null,
            'passDepartmentPath': null,
            'currentDepartment': null,
            'updateTime': null,
            'passTime': null,
            'id': null,
            'retreatFlag': null,
            'dispenseFlag': null,
            'userIds': null,
            'createTime': null
          }],
          'sensitiveDataVoList': [{
            'dateStr': '',
            'total': '0',
            'areaName': '',
            'dataType': '',
            'sourceType': '论坛',
            'areaCode': null,
            'totalNum': 0,
            'normalNum': 0,
            'sensitiveNum': 0,
            'newAddNum': 0,
            'distributeNum': 0,
            'disposeNum': 0,
            'disposePeriod': 0.0,
            'dataId': null,
            'disposeId': null,
            'disposeDetailId': null,
            'disposeStatus': null,
            'passDepartmentPath': null,
            'currentDepartment': null,
            'updateTime': null,
            'passTime': null,
            'id': null,
            'retreatFlag': null,
            'dispenseFlag': null,
            'userIds': null,
            'createTime': null
          }, {
            'dateStr': '',
            'total': '0',
            'areaName': '',
            'dataType': '',
            'sourceType': '微博',
            'areaCode': null,
            'totalNum': 0,
            'normalNum': 0,
            'sensitiveNum': 0,
            'newAddNum': 0,
            'distributeNum': 0,
            'disposeNum': 0,
            'disposePeriod': 0.0,
            'dataId': null,
            'disposeId': null,
            'disposeDetailId': null,
            'disposeStatus': null,
            'passDepartmentPath': null,
            'currentDepartment': null,
            'updateTime': null,
            'passTime': null,
            'id': null,
            'retreatFlag': null,
            'dispenseFlag': null,
            'userIds': null,
            'createTime': null
          }, {
            'dateStr': '',
            'total': '0',
            'areaName': '',
            'dataType': '',
            'sourceType': '新闻网站',
            'areaCode': null,
            'totalNum': 0,
            'normalNum': 0,
            'sensitiveNum': 0,
            'newAddNum': 0,
            'distributeNum': 0,
            'disposeNum': 0,
            'disposePeriod': 0.0,
            'dataId': null,
            'disposeId': null,
            'disposeDetailId': null,
            'disposeStatus': null,
            'passDepartmentPath': null,
            'currentDepartment': null,
            'updateTime': null,
            'passTime': null,
            'id': null,
            'retreatFlag': null,
            'dispenseFlag': null,
            'userIds': null,
            'createTime': null
          }]
        }
        let normalCategoryList = res.normalDataVoList
        if (normalCategoryList.length === 0) {
          this.emptyContentShowFlag = true
          return false
        }
        let nomalData = []
        let xData = []
        for (let i = 0; i < normalCategoryList.length; i++) {
          let item = normalCategoryList[i]
          xData.push(item.sourceType)
          nomalData.push(item.total)
        }
        // 敏感数据
        let sensitiveData = []
        let sensitiveCateList = res.sensitiveDataVoList
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
  .source-distribution
    height: 270px;
</style>
