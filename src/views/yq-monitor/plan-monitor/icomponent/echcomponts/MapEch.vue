<template>
  <div>
    <el-card>
      <h4 class="font">地域分布</h4>
      <div id="emdt" style="width:45%;height:400px;"></div>
      <ul class="map_infoList">
        <li v-for="(item, index) in mapList" :key="index">
          <span>{{ item.name }}</span
          ><span>{{ item.value }}条</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import '&/echarts/map/js/china.js'
export default {
  props: ['time'],
  name: 'index',
  data() {
    return {
      scheme: { schemeId: '', begTimeText: '', endTimeText: '', searchTime: 4 },
      mapList: [],
      max: ''
    }
  },
  computed: {
    ...mapState('planMonitor', {
      searchObj: state => state.searchObj
    }),
    sentimentMovementsEcharts() {
      return this.$echarts.init(document.querySelector('#emdt'))
    }
  },
  methods: {
    initCharts() {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}：{c}'
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: false
            },
            dataView: {
              show: false
            },
            magicType: {
              show: false
            }
          },
          padding: [5, 25, 5, 5]
        },
        dataRange: {
          orient: 'vertical',
          x: '12',
          y: '250',
          padding: [5, 15, 20, 5],
          min: 0,
          max: this.max,
          color: ['red', 'yellow'],
          text: ['高', '低'] /* 文本，默认为数值文本 */,
          splitNumber: 0,
          textStyle: {
            color: '#CCC'
          },
          itemWidth: 15,
          /* 图例图形高度 */
          itemHeight: 100
        },
        series: [
          {
            name: 'yq',
            type: 'map',
            zoom: 1.2,
            mapType: 'china',
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 2,
                areaColor: '#5b83ff',
                color: 'transparent'
              }
            },
            roam: false,
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 8
                }
              },
              emphasis: {
                show: true
              }
            },
            data: this.mapList
          }
        ]
      }

      this.sentimentMovementsEcharts.setOption(option)
      window.addEventListener('resize', () => {
        this.sentimentMovementsEcharts.resize()
      })
    },
    async getLines() {
      console.log(this.scheme.begTimeText, this.scheme.endTimeText)
      // return
      const { data: res } = await this.$ynHttp.post('/scheme/getMap', this.scheme)
      if (res.code !== '0') {
        return false
      }
      /*  console.log(res,'地图') */
      /* return */
      this.mapList = []
      this.max = res.data.value
      var data = res.data.children
      data.map(item => {
        this.mapList.push({
          name: item.name,
          value: item.value
        })
      })
      console.log(this.mapList, '地图')

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
.map_infoList
  display inline-block;
  width 40%;
  height 292px;
  padding 60px
  overflow auto;
#emdt
  display inline-block;
.map_infoList li
    display flex;
    justify-content space-between;
    height 25px;
    color #9a8e89;
    cursor default;
.font
  margin-bottom 16px
</style>
