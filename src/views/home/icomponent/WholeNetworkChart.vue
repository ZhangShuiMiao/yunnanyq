<template>
    <div class="whole-network">
      <charts-warp>
        <h3 class="charts-title">
          全网舆情数据
        </h3>
        <empty-content v-if="emptyContentShowFlag"></empty-content>
        <div class="chart-info-warp" id="wholeNetwork">
        </div>
      </charts-warp>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartsWarp from './ChartsWarp'
import EmptyContent from '../../../components/EmptyContent'
export default {
  name: 'WholeNetwork',
  components: { EmptyContent, ChartsWarp },
  computed: {
    ...mapState('home', {
      searchObj: state => state.searchObj
    }),
    wholeNetworkEcharts() {
      return this.$echarts.init(document.querySelector('#wholeNetwork'))
    }
  },
  watch: {
    searchObj: {
      handler(val, oldVal) {
        this.getWholeNetworkData()
      },
      deep: true
    }
  },
  data() {
    return {
      x: null,
      allLine: null,
      normalLine: null,
      sensitiveLine: null,
      emptyContentShowFlag: false
    }
  },
  methods: {
    ...mapActions('home', ['searchObjChange']),
    initCharts() {
      let option = {
        tooltip: {
          backgroundColor: 'rgba(255,255,255,.8)',
          borderColor: '#2f74ff',
          borderWidth: 1,
          borderRadius: 0,
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: '1',
            lineStyle: {
              width: 1
            }
          },
          textStyle: {
            color: '#333333'
          }
          // formatter:function(params){
          //   let res='<div><p>'+params[0].name+'</p></div>'
          //   for(let i=0;i<params.length;i++){
          //     res+='<p>'+params[i].marker+params[i].seriesName+' : '+params[i].data+'条</p>'
          //   }
          //   return res
          // }
        },
        legend: {
          selectedMode: 'multiple',
          itemWidth: 12,
          itemHeight: 8,
          itemGap: 10,
          right: 42,
          top: 8,
          orient: 'vertical',
          textStyle: {
            color: '#666'
          },
          data: [
            {
              name: '全部',
              icon: 'pie'
            },
            {
              name: '一般',
              icon: 'pie'
            },
            {
              name: '敏感',
              icon: 'pie'
            }
          ],
          borderWidth: 0
        },
        grid: {
          left: '3%',
          right: '6%',
          top: '4%',
          bottom: '2%',
          containLabel: true,
          show: false
          // width: 500,  //设置图表的宽度
          // height: 230 //图表高度
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.x,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#585858'
            }
          },
          axisTick: {
            length: 5,
            lineStyle: {
              width: 1
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '单位: 万条',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ededed'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#677b98'
            }
          }
        },
        series: [
          {
            name: '全部',
            type: 'line',
            hoverAnimation: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#D9D9D9',
                lineStyle: {
                  color: '#D9D9D9'
                }
              }
            },
            showSymbol: false,
            data: this.allLine
          },
          {
            name: '一般',
            type: 'line',
            hoverAnimation: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#3285F1',
                lineStyle: {
                  color: '#3285F1'
                }
              }
            },
            showSymbol: false,
            data: this.normalLine
          },
          {
            name: '敏感',
            type: 'line',
            hoverAnimation: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#EB4B4B',
                lineStyle: {
                  color: '#EB4B4B'
                }
              }
            },
            showSymbol: false,
            data: this.sensitiveLine
          }
        ]
      }
      this.wholeNetworkEcharts.setOption(option)
      window.addEventListener('resize', () => { this.wholeNetworkEcharts.resize() })
    },
    getWholeNetworkData() {
      this.$http.post('/yq/cpapi/getAllNetDatas', {
        beginTime: this.searchObj.beginTime,
        endTime: this.searchObj.endTime
      }).then(res => {
        res = res.data
        let allDataList = res.data
        allDataList = {
          'downLines': [],
          'line': [{
            'classify': '2019-12-04',
            'total': 0,
            'series': '',
            'value': 3445135
          }, {
            'classify': '2019-12-05',
            'total': 0,
            'series': '',
            'value': 3554231
          }, {
            'classify': '2019-12-06',
            'total': 0,
            'series': '',
            'value': 3584055
          }, {
            'classify': '2019-12-07',
            'total': 0,
            'series': '',
            'value': 2786138
          }, {
            'classify': '2019-12-08',
            'total': 0,
            'series': '',
            'value': 2671872
          }, {
            'classify': '2019-12-09',
            'total': 0,
            'series': '',
            'value': 3527490
          }, {
            'classify': '2019-12-10',
            'total': 0,
            'series': '',
            'value': 3548883
          }, {
            'classify': '2019-12-11',
            'total': 0,
            'series': '',
            'value': 2702773
          }],
          'downLine': [{
            'classify': '2019-12-04',
            'total': 0,
            'series': '-1',
            'value': 513208
          }, {
            'classify': '2019-12-05',
            'total': 0,
            'series': '-1',
            'value': 540467
          }, {
            'classify': '2019-12-06',
            'total': 0,
            'series': '-1',
            'value': 532169
          }, {
            'classify': '2019-12-07',
            'total': 0,
            'series': '-1',
            'value': 418421
          }, {
            'classify': '2019-12-08',
            'total': 0,
            'series': '-1',
            'value': 386939
          }, {
            'classify': '2019-12-09',
            'total': 0,
            'series': '-1',
            'value': 504608
          }, {
            'classify': '2019-12-10',
            'total': 0,
            'series': '-1',
            'value': 558097
          }, {
            'classify': '2019-12-11',
            'total': 0,
            'series': '-1',
            'value': 406869
          }],
          'upLine': [],
          'naturalLine': [{
            'classify': '2019-12-04',
            'total': 0,
            'series': '0',
            'value': 2931927
          }, {
            'classify': '2019-12-05',
            'total': 0,
            'series': '0',
            'value': 3013764
          }, {
            'classify': '2019-12-06',
            'total': 0,
            'series': '0',
            'value': 3051886
          }, {
            'classify': '2019-12-07',
            'total': 0,
            'series': '0',
            'value': 2367717
          }, {
            'classify': '2019-12-08',
            'total': 0,
            'series': '0',
            'value': 2284933
          }, {
            'classify': '2019-12-09',
            'total': 0,
            'series': '0',
            'value': 3022882
          }, {
            'classify': '2019-12-10',
            'total': 0,
            'series': '0',
            'value': 2990786
          }, {
            'classify': '2019-12-11',
            'total': 0,
            'series': '0',
            'value': 2295904
          }],
          'upLines': []
        }
        // x轴时间数据
        let allDataTimeList = []
        // 全部
        let allArr = []
        // 一般
        let generalArr = []
        // 敏感
        let sensitiveArr = []
        // x坐标数据和全部数据
        if (allDataList.line.length === 0) {
          this.emptyContentShowFlag = true
          return
        }
        for (let i = 0; i < allDataList.line.length; i++) {
          let item = allDataList.line[i]
          allDataTimeList.push(item.classify)
          allArr.push(item.value / 10000)
        }

        // 一般数据
        for (let i = 0; i < allDataList.naturalLine.length; i++) {
          let item = allDataList.naturalLine[i]
          generalArr.push(item.value / 10000)
        }

        // 敏感数据
        for (let i = 0; i < allDataList.downLine.length; i++) {
          let item = allDataList.downLine[i]
          sensitiveArr.push(item.value / 10000)
        }
        this.x = allDataTimeList
        this.allLine = allArr
        this.normalLine = generalArr
        this.sensitiveLine = sensitiveArr
        this.initCharts()
      })
    }
  },
  mounted() {
    this.getWholeNetworkData()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .whole-network
    topAreaWarp();
    .chart-info-warp
      height: 270px;
</style>
