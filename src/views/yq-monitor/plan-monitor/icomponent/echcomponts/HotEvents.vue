<template>
  <div>
    <el-card>
      <h4 class="font">热门事件</h4>
      <empty-content v-if="emptyContentShowFlag"></empty-content>
      <ul class="hotEvents">
        <li v-for="(item, index) in eventsList" :key="index">
          <i :class="index <= 2 ? 'active' : ''">{{ index + 1 }}</i>
          <a :href="item.url" target="_blank" class="hotcontent">{{ item.content }}</a>
          <span class="count">{{ item.simNum }}</span>
        </li>
      </ul>
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
      eventsList: []
    }
  },
  computed: {
    ...mapState('planMonitor', {
      searchObj: state => state.searchObj
    })
  },
  methods: {
    async getLines() {
      console.log(this.scheme.begTimeText, this.scheme.endTimeText)
      // return
      const { data: res } = await this.$ynHttp.post('/scheme/getHotForHome', this.scheme)
      if (res.code !== '0') {
        return false
      }
      this.eventsList = res.data.records
      if (this.eventsList.length === 0) {
        this.emptyContentShowFlag = true
      }
      console.log(this.eventsList)
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
  position relative
  margin-top 20px;
.font
  margin-bottom 16px

.hotEvents i
  display inline-block;
  height 16px;
  width 16px;
  margin-right 7px;
  font-style normal;
  line-height 16px;
  text-align center;

.hotEvents li
  box-sizing border-box;
  font-size 12px;
  height 30px;
  line-height 30px;
  padding 0 30px;

.hotEvents
  display inline-block;
  width 100%;
  height 400px
  overflow auto;
.hotEvents
  .content:hover
    color #2f74ff;

.hotEvents
  .count
    float right

.active
  background-color #FF8900;
  font-weight bold;
  color #fff !important;
.hotcontent
  display inline-block;
  width 80%
  color #2B2B2B;
  vertical-align top;
  text-overflow ellipsis;
  white-space nowrap;
  overflow hidden
</style>
