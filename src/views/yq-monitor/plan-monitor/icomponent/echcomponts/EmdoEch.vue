<template>
  <div>
    <el-card>
      <h4 class="font">情感分布</h4>
      <div id="chart-pie-survey" style="width:45%;height:400px;"></div>
      <div id="chart-river" style="width:45%;height:400px;"></div>
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
      pieSide: [],
      scheme: { schemeId: '', begTimeText: '', endTimeText: '', searchTime: 4 },
      datas: [],
      med: []
    }
  },
  computed: {
    ...mapState('planMonitor', {
      searchObj: state => state.searchObj
    }),
    sentimentMovementsEcharts() {
      return this.$echarts.init(document.querySelector('#chart-pie-survey'))
    },
    mediaPoleEcharts() {
      return this.$echarts.init(document.querySelector('#chart-river'))
    }
  },
  methods: {
    getpies(name, color, data) {
      return {
        name: name,
        value: data,
        itemStyle: {
          normal: {
            color: color
          }
        }
      }
    },
    legendclicks(params) {
      var piedata = JSON.parse(this.pieSide)
      var pie = []
      if (params.selected.正面) {
        pie.push(this.getpies('正面', '#2d74fb', piedata[0]))
      }
      if (params.selected.负面) {
        pie.push(this.getpies('负面', '#ff2828', piedata[2]))
      }
      if (params.selected.中立) {
        pie.push(this.getpies('中立', '#2bac52', piedata[1]))
      }
      this.drawPie(pie)
      this.pieCharts()
    },
    resetPie() {
      /* 清除最开始圆饼图数据 */
      this.med = []
      var list = JSON.parse(this.pieSide)
      this.drawPie(list)
      this.pieCharts()
    },
    drawPie(data) {
      var total = 0
      if (typeof data[0] === 'number') {
        total = data[0] + data[1] + data[2]

        this.med.push({
          name: '正面',
          value: data[0],
          itemStyle: {
            normal: {
              color: '#2f74ff'
            }
          }
        })
        this.med.push({
          name: '中立',
          value: data[1],
          itemStyle: {
            normal: {
              color: '#1aa326'
            }
          }
        })
        this.med.push({
          name: '负面',
          value: data[2],
          itemStyle: {
            normal: {
              color: '#FF2929'
            }
          }
        })
      } else {
        for (var i in data) {
          total = total + data[i].value
        }
        this.med = data
      }
    },
    pieCharts() {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: '总数',
          subtext: 0,
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#ffffff'
          },
          subtextStyle: {
            color: '#ffffff'
          }
        },

        series: [
          {
            name: '访问来源',
            type: 'pie',
            avoidLabelOverlap: false,
            // radius: ['45', '60'],
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            label: {
              normal: {
                show: true,
                position: 'outer',
                formatter: '{b}{d}%',
                textStyle: {
                  color: '#585858'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '15',
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
            data: this.med
          }
        ]
      }
      this.sentimentMovementsEcharts.setOption(option)
      window.addEventListener('resize', () => {
        this.sentimentMovementsEcharts.resize()
      })
    },
    riverCharts() {
      var that = this
      let mediaPoleOption = {
        tooltip: {
          trigger: 'axis',
          formatter: function(parmas) {
            if (!parmas) {
              return false
            }
            var ret = parmas[0].data[0] + '<br/>'
            var pie = []
            for (var i in parmas) {
              ret = ret + parmas[i].data[2] + ':' + parmas[i].data[1] + '<br/>'
              if (parmas[i].data[2] === '正面') {
                pie.push(that.getpies('正面', '#2f74ff', parmas[i].data[1]))
              } else if (parmas[i].data[2] === '负面') {
                pie.push(that.getpies('负面', '#FF2929', parmas[i].data[1]))
              } else {
                pie.push(that.getpies('中立', '#1aa566', parmas[i].data[1]))
              }
              // console.log(pie);
            }
            if (ret) {
              // this.med=[]
              that.drawPie(pie)
              that.pieCharts()
            }
            return ret
          },
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'rgba(0,0,0,0.2)',
              width: 1,
              type: 'solid'
            }
          }
        },
        grid: {
          x: '0',
          y: '0',
          x2: '0',
          y2: '0'
        },
        legend: {
          data: [
            {
              name: '正面',
              icon: 'pie'
            },
            {
              name: '中立',
              icon: 'pie'
            },
            {
              name: '负面',
              icon: 'pie'
            }
          ],
          bottom: '8%',
          left: '0',
          textStyle: {
            color: '#7186a3',
            fontSize: 14,
            padding: [0, 0, 0, 0]
          },
          itemGap: 52,
          itemWidth: 14,
          borderWidth: 0
        },

        singleAxis: {
          top: 50,
          bottom: 100,
          axisTick: {},
          axisLabel: {},
          type: 'time',
          axisPointer: {
            animation: true,
            label: {
              show: true
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.2
            }
          },
          axisLine: {
            lineStyle: {
              color: '#7186a3'
            }
          }
        },
        // splitNumber: 6,
        series: [
          {
            type: 'themeRiver',
            label: {
              normal: {
                show: false,
                padding: [0, 0, 0, -20]
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.8)'
              }
            },
            data: this.datas
          }
        ],
        color: ['#1aa326', '#FF2929', '#2f74ff']
      }

      this.mediaPoleEcharts.setOption(mediaPoleOption)
      this.mediaPoleEcharts.on('legendselectchanged', this.legendclicks)
      this.mediaPoleEcharts.on('globalout', this.resetPie)
      window.addEventListener('resize', () => {
        this.mediaPoleEcharts.resize()
      })
    },
    async getLines() {
      console.log(this.scheme.begTimeText, this.scheme.endTimeText)
      // return
      const { data: res } = await this.$ynHttp.post('/scheme/getLines', this.scheme)
      console.log(res, 'heliu')
      if (res.code !== '0') {
        return false
      }
      // 圆饼图河流图所需参数
      /* 清空 */
      this.med = []
      this.pieSide = []
      this.datas = []
      var t = res.data
      var h = []
      /* 圆饼图数据 */
      var pie = [0, 0, 0]
      /* 负 */
      var d = t.downLine
      /* 正 */
      var l = t.upLine
      /* 中立 */
      var n = t.naturalLine
      console.log(d)
      /*   return */
      for (var i = 0; i < d.length; i++) {
        h[i * 3] = [l[i].classify, l[i].value, '正面']
        pie[0] += l[i].value

        h[i * 3 + 1] = [n[i].classify, n[i].value, '中立']
        pie[1] += n[i].value

        h[i * 3 + 2] = [d[i].classify, d[i].value, '负面']
        pie[2] += d[i].value
      }
      /* pie一开始圆饼图所需数据 */
      console.log(pie)
      /*  return */
      this.pieSide = JSON.stringify(pie)
      this.drawPie(pie)
      this.datas = h
      this.riverCharts()
      this.pieCharts()
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
  }
}
</script>

<style lang="stylus" scoped>
.el-card
   margin-top 20px;
#chart-pie-survey
  display inline-block
#chart-river
  display inline-block
.font
  margin-bottom 16px
</style>
