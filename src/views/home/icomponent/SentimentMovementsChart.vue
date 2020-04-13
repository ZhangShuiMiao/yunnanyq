<template>
    <charts-warp>
      <!--<h3 class="charts-title">-->
        <!--舆情走势-->
      <!--</h3>-->
      <chart-header>
        <template slot="chartTitle">舆情走势</template>
        <template slot="chartUnit">单位：件</template>
      </chart-header>
      <empty-content v-if="emptyContentShowFlag"></empty-content>
      <div class="sentiment-movements" id="sentimentMovements">
      </div>
    </charts-warp>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartsWarp from './ChartsWarp'
import ChartHeader from './ChartHeader'
import EmptyContent from '../../../components/EmptyContent'
export default {
  name: 'SentimentMovements',
  components: { EmptyContent, ChartHeader, ChartsWarp },
  data() {
    return {
      sentimentMovementsSource: null,
      emptyContentShowFlag: false
    }
  },
  watch: {
    searchObj: {
      handler(val, oldVal) {
        this.getMovementsData()
      },
      deep: true
    }
  },
  computed: {
    ...mapState('home', {
      searchObj: state => state.searchObj
    }),
    sentimentMovementsEcharts() {
      return this.$echarts.init(document.querySelector('#sentimentMovements'))
    }
  },
  methods: {
    ...mapActions('home', ['searchObjChange']),
    initCharts() {
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [{ name: '全部', icon: 'rect' }, { name: '一般', icon: 'rect' }, { name: '敏感', icon: 'rect' }],
          bottom: 16,
          selectedMode: 'multiple',
          itemWidth: 9,
          itemHeight: 9
        },
        grid: {
          left: '3%',
          right: '5%',
          top: '4%',
          containLabel: true
        },
        dataset: {
          source: this.sentimentMovementsSource
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        color: ['#D9D9D9', '#3285F1', '#EB4B4B'],
        series: [
          {
            name: '全部',
            type: 'line'
          },
          {
            name: '一般',
            type: 'line'
          },
          {
            name: '敏感',
            type: 'line'
          }
        ]
      }
      this.sentimentMovementsEcharts.setOption(option)
      window.addEventListener('resize', () => { this.sentimentMovementsEcharts.resize() })
    },
    getMovementsData() {
      let source = [
        ['level', '全部', '一般', '敏感']
      ]
      this.$http.post('/yq/cpapi/getChartDataByTime', {
        area_code: this.searchObj.area_code,
        beginTime: this.searchObj.beginTime,
        endTime: this.searchObj.endTime
      }).then(res => {
        let dataList = res.data.data
        dataList = {
          'dataVoList': [{
            'dateStr': '2019-12-13',
            'total': '1',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-15',
            'total': '4',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-16',
            'total': '3',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-17',
            'total': '3',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-20',
            'total': '8',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
          'normalDataVoList': [{
            'dateStr': '2019-12-13',
            'total': '1',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-15',
            'total': '4',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-16',
            'total': '3',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-17',
            'total': '3',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-20',
            'total': '8',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-13',
            'total': '0',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-15',
            'total': '0',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-16',
            'total': '0',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-17',
            'total': '0',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
            'dateStr': '2019-12-20',
            'total': '0',
            'areaName': null,
            'dataType': null,
            'sourceType': null,
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
        let allArr = dataList.dataVoList
        let normalArr = dataList.normalDataVoList
        let sensitiveArr = dataList.sensitiveDataVoList
        this.emptyContentShowFlag = allArr.length === 0
        allArr.forEach((val, index, arr) => {
          var dataStr = val.dateStr
          source[index + 1] = [dataStr, val.total, normalArr[index].total, sensitiveArr[index].total]
        })
        console.log('source')
        console.log(source)
        this.sentimentMovementsSource = source
        this.initCharts()
      })
    }
  },
  mounted() {
    this.getMovementsData()
  },
}
</script>

<style scoped lang="stylus">
  .sentiment-movements
    height: 270px;
</style>
