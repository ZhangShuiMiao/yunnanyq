<template>
  <div>
    <el-card>
      <h4 class="font">媒体分布</h4>
      <empty-content v-if="emptyContentShowFlag"></empty-content>
      <div id="med" style="width:45%;height:400px;"></div>
      <div id="mediaPole" style="width:45%;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EmptyContent from '@/components/EmptyContent'
export default {
  props: ['time'],
  name: 'index',
  components: { EmptyContent },
  data() {
    return {
      emptyContentShowFlag: false,
      scheme: { schemeId: '', begTimeText: '', endTimeText: '', searchTime: 4 },
      mediaPole_y: [],
      mediaPole_x: [],
      list: []
    }
  },
  computed: {
    ...mapState('planMonitor', {
      searchObj: state => state.searchObj
    }),
    sentimentMovementsEcharts() {
      return this.$echarts.init(document.querySelector('#med'))
    },
    mediaPoleEcharts() {
      return this.$echarts.init(document.querySelector('#mediaPole'))
    }
  },
  methods: {
    mapCharts() {
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
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            /* avoidLabelOverlap: false, */
            minAngle: 5 /* 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互 */,
            avoidLabelOverlap: true /* 是否启用防止标签重叠策略 */,
            label: {
              normal: {
                show: true,
                position: 'outer',
                formatter: '{b}\n{d}%',
                textStyle: {
                  color: '#333',
                  fontSize: 12
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
                },
                length: 5
              }
            },
            data: this.list
          }
        ]
      }
      // this.sentimentMovementsEcharts.clear()
      this.sentimentMovementsEcharts.setOption(option)
      window.addEventListener('resize', () => {
        this.sentimentMovementsEcharts.resize()
      })
    },
    poleCharts() {
      let mediaPoleOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0%',
          right: '8%',
          bottom: '10%',
          top: '4%',
          containLabel: true
        },
        yAxis: [
          {
            type: 'category',
            data: this.mediaPole_y,
            axisLabel: {
              interval: 0,
              rotate: 0 /* 倾斜度 -90 至 90 默认为0 */,
              margin: 2
            },
            inverse: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#333333',
                fontWeight: 400,
                fontSize: 12
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        xAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#666666',
                fontSize: 12
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '30%',
            barCateGoryGap: 10,
            data: this.mediaPole_x,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#3285F1'
                  },
                  {
                    offset: 1,
                    color: '#74B0FF'
                  }
                ])
              }
            }
          }
        ]
      }
      // this.mediaPoleEcharts.clear()
      this.mediaPoleEcharts.setOption(mediaPoleOption)
      window.addEventListener('resize', () => {
        this.mediaPoleEcharts.resize()
      })
    },
    async getLines() {
      console.log(this.scheme.begTimeText, this.scheme.endTimeText)
      // return
      const { data: res } = await this.$ynHttp.post('/scheme/getBars', this.scheme)
      /*  console.log(res) */
      if (res.code !== '0') {
        return false
      }
      // 圆饼图所需参数
      var map = res.data.list
      // console.log(map,1111)
      this.list = []
      this.mediaPole_y = []
      this.mediaPole_x = []
      var mapList = []
      for (var i in map) {
        mapList.push(map[i][0])
      }
      var total = 0
      var count = 0
      var other = 0
      for (var j = 0; j < mapList.length; j++) {
        count++
        total = total + mapList[j].total
        if (count <= 5) {
          this.list.push({
            name: mapList[j].classify,
            value: mapList[j].total
          })
        } else {
          other = other + mapList[j].total
        }
      }
      if (other > 0) {
        this.list.push({
          name: '其他',
          value: other
        })
      }
      this.list.sort((a, b) => {
        return b.value - a.value
      })
      /*  从大到小排序 */
      mapList.sort((a, b) => {
        return b.value - a.value
      })
      for (var k = 0; k < mapList.length; k++) {
        this.mediaPole_y.push(mapList[k].classify)
        this.mediaPole_x.push(mapList[k].value)
      }
      if (this.list.length === 0) {
        this.emptyContentShowFlag = true
      }
      this.mapCharts()
      this.poleCharts()
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
  position: relative
  margin-top 20px;
#med
  display inline-block
#mediaPole
  display inline-block
.font
  margin-bottom 16px
</style>
