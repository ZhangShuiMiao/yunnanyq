<template>
  <div>
    <el-card>
      <h4 class="font">关键词云</h4>
      <empty-content v-if="emptyContentShowFlag"></empty-content>
      <div id="emd" style="width: 45%;height:400px;"></div>
      <ul class="keyWords">
        <li v-for="(item, index) in dataList" :key="index">
          <span>{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'
import EmptyContent from '@/components/EmptyContent'
export default {
  props: ['time'],
  name: 'index',
  components: { EmptyContent },
  data() {
    return {
      emptyContentShowFlag: false,
      scheme: { schemeId: '', begTimeText: '', endTimeText: '', searchTime: 4 },
      dataList: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    }
  },
  computed: {
    ...mapState('planMonitor', {
      searchObj: state => state.searchObj
    }),
    sentimentMovementsEcharts() {
      return this.$echarts.init(document.querySelector('#emd'))
    }
  },
  methods: {
    initCharts() {
      let option = {
        title: {
          x: 'center'
        },
        backgroundColor: '#fff',
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: 'wordCloud',
            /* 用来调整词之间的距离 */
            gridSize: 10,
            /* //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size. */
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            // 用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            // 随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function() {
                  return 'rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ')'
                }
              }
            },
            // 位置相关设置

            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '100%',
            height: '100%',
            // 数据
            data: this.dataList
          }
        ]
      }
      this.sentimentMovementsEcharts.setOption(option)
      window.addEventListener('resize', () => {
        this.sentimentMovementsEcharts.resize()
      })
    },
    async getLines() {
      this.dataList = []
      /* console.log(this.scheme.begTimeText, this.scheme.endTimeText) */
      const { data: res } = await this.$ynHttp.post('/scheme/getWordCloud', this.scheme)
      /* console.log(res, '词云') */
      if (res.code !== '0' || !res.data) {
        this.emptyContentShowFlag = true
        this.initCharts()
        return false
      }
      var number = res.data.members[1]
      number.map(item => {
        this.dataList.push({
          name: item.word,
          value: item.value
        })
      })
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
  position: relative
.font
  margin-bottom 10px
#emd
  display inline-block
.keyWords
  display inline-block
  width 40%
  padding 60px;
  height: 292px;
  overflow auto;
.keyWords li
  float left;
  width 50%;
  height 25px;
  line-height 25px;
  cursor default;
.keyWords li span
  display inline-block;
  width 50%;
  text-align center;
  font-size 11px;
  font-family PingFang-SC-Regular;
  font-weight bold;
  color:rgba(43,43,43,1);
  overflow hidden;
  height 25px;
  white-space nowrap;
  text-overflow ellipsis;

.keyWords li:hover
  background-color #EDF5FF;

.keyWords li span:last-child
  color #828282;
  font-weight normal;
.empty-warp
  width 96%;
  z-index 9999;
</style>
