<template>
  <div>
    <el-card>
      <h4 class="font">舆论走势</h4>
      <div id="main" style="width:100%;height:300px;"></div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['time'],
  name: 'index',
  data() {
    return {
      scheme: { schemeId: '', begTimeText: '', endTimeText: '', searchTime: 4 },
      x: [] /* x轴时间 */,
      linArr: [] /* 全部 的数据量 */,
      upArr: [] /* 正面 的数据量 */,
      downArr: [] /* 负面的数据量 */,
      naturalArr: [] /* 中立 的数据量 */
    }
  },
  computed: {
    ...mapState('planMonitor', {
      searchObj: state => state.searchObj
    }),
    sentimentMovementsEcharts() {
      return this.$echarts.init(document.querySelector('#main'))
    }
  },
  methods: {
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
        },
        // legend: {
        //   itemWidth: 14,
        //   itemGap: 90,
        //   bottom: 15,
        //   textStyle: {
        //     color: '#61A8EB'
        //   },
        //   data: [
        //     {
        //       name: '全部',
        //       icon: 'pie'
        //     },
        //     {
        //       name: '正面',
        //       icon: 'pie'
        //     },
        //     {
        //       name: '负面',
        //       icon: 'pie'
        //     },
        //     {
        //       name: '中立',
        //       icon: 'pie'
        //     }
        //   ],
        //   selectedMode: true,
        //   borderWidth: 0
        // },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '20%',
          containLabel: true,
          show: false,
          height: 230 /* 图表高度 */
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.x,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#D9D9D9'
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
              color: '#D9D9D9'
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
                color: '#d0d2d5',
                lineStyle: {
                  color: '#d0d2d5'
                }
              }
            },
            showSymbol: false,
            data: this.linArr
          },
          {
            name: '正面',
            type: 'line',
            hoverAnimation: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#2bab51',
                lineStyle: {
                  color: '#2bab51'
                }
              }
            },
            showSymbol: false,
            data: this.upArr
          },
          {
            name: '负面',
            type: 'line',
            hoverAnimation: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#FF2929',
                lineStyle: {
                  color: '#FF2929'
                }
              }
            },
            showSymbol: false,
            data: this.downArr
          },
          {
            name: '中立',
            type: 'line',
            hoverAnimation: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#2f74ff',
                lineStyle: {
                  color: '#2f74ff'
                }
              }
            },
            showSymbol: false,
            data: this.naturalArr
          }
        ]
      }
      // this.sentimentMovementsEcharts.clear()
      this.sentimentMovementsEcharts.setOption(option)
      window.addEventListener('resize', () => {
        this.sentimentMovementsEcharts.resize()
      })
    },
    async getLines() {
      console.log(this.scheme.begTimeText, this.scheme.endTimeText)
      // return
      const { data: res } = await this.$ynHttp.post('/scheme/getLines', this.scheme)
      console.log(res, '舆论走势')

      if (res.code !== '0') {
        return false
      }
      let linetotal = res.data.line
      let updata = res.data.upLine
      let downdata = res.data.downLine
      let naturaldata = res.data.naturalLine
      console.log(res)
      // return
      this.x = []
      this.linArr = []
      this.upArr = []
      this.naturalArr = []
      this.downArr = []
      /*  x坐标数据 */
      for (let i = 0; i < linetotal.length; i++) {
        let item = linetotal[i]
        this.x.push(item.classify)
        this.linArr.push(item.value)
      }

      /* 正面数据 */
      for (let i = 0; i < updata.length; i++) {
        let item = updata[i]
        this.upArr.push(item.value)
      }

      /* 中立数据 */
      for (let i = 0; i < naturaldata.length; i++) {
        let item = naturaldata[i]
        this.naturalArr.push(item.value)
      }

      /* 负面数据 */
      for (let i = 0; i < downdata.length; i++) {
        let item = downdata[i]
        this.downArr.push(item.value)
      }

      this.initCharts()
    }
  },
  watch: {
    time: {
      handler(newName, oldName) {
        if (this.time === '' || this.time === null) {
          this.scheme.begTimeText = window.Bee.DateUtils.formt(new Date(new Date().toLocaleDateString()).getTime(), 'yyyy-MM-dd HH:mm:ss')
          this.scheme.endTimeText = window.Bee.DateUtils.formt(new Date(new Date().toLocaleDateString()).getTime() + (24 * 60 * 60 * 1000 - 1), 'yyyy-MM-dd HH:mm:ss')
          // console.log('ok');
        } else {
          // console.log(this.time);
          this.scheme.begTimeText = this.time[0]
          this.scheme.endTimeText = this.time[1]
        }
        if (this.scheme.schemeId) {
          this.getLines()
        }
      },
      immediate: true,
      deep: true
    },
    'searchObj.schemeId': {
      handler(val, oldVal) {
        this.scheme.schemeId = this.searchObj.schemeId
        this.getLines()
      },
      immediate: true
    }
  },
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.el-card
  margin-top 20px;
.font
  margin-bottom 16px
</style>
