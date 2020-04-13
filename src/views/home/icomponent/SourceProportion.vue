<template>
    <charts-warp>
      <h3 class="charts-title">
        舆情工单来源占比
      </h3>
      <empty-content v-if="emptyContentShowFlag"></empty-content>
      <div class="source-proportion" id="sourceProportion"></div>
    </charts-warp>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartsWarp from './ChartsWarp'
import EmptyContent from '../../../components/EmptyContent'
export default {
  name: 'SourceProportion',
  components: { EmptyContent, ChartsWarp },
  data() {
    return {
      emptyContentShowFlag: false,
      sourceStatData: [
        { value: 335, name: '微博' },
        { value: 310, name: '新闻' },
        { value: 234, name: '微信' },
      ]
    }
  },
  computed: {
    ...mapState('home', {
      searchObj: state => state.searchObj
    }),
    sourceProportionEcharts() {
      return this.$echarts.init(document.querySelector('#sourceProportion'))
    }
  },
  watch: {
    searchObj: {
      handler(val, oldVal) {
        this.getTypeDistributionData()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('home', ['searchObjChange']),
    initCharts() {
      let option = {
        color: ['#338BFF', '#5AD5E0', '#FF7656', '#FADA66'],
        tooltip: {},
        legend: {
          selectedMode: 'multiple',
          itemWidth: 12,
          itemHeight: 8,
          itemGap: 16,
          bottom: 8,
        },
        dataset: {
          source: this.sourceStatData
        },
        series: [
          {
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.sourceStatData
          }
        ]
      }
      this.sourceProportionEcharts.setOption(option)
      window.addEventListener('resize', () => { this.sourceProportionEcharts.resize() })
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
        let sensitiveCateList = res.sensitiveDataVoList
        if (normalCategoryList.length === 0) {
          this.emptyContentShowFlag = true
          return false
        }
        let sourceStatData = []
        normalCategoryList.forEach((val, index, arr) => {
          let sum = parseInt(val.total) + parseInt(sensitiveCateList[index].total)
          sourceStatData.push({ value: sum, name: val.sourceType })
        })
        this.sourceStatData = sourceStatData
        console.log(this.sourceStatData)
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
  .source-proportion
    height: 270px;
</style>
