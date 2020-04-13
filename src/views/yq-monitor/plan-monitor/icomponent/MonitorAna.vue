<template>
  <div>
    <el-card class="timeCard">
      <span class="font">时间选择:</span>
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="timeRange"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
    </el-card>
    <div>
      <pod-Ech :time="timeRange"></pod-Ech>
      <med-Ech :time="timeRange"></med-Ech>
      <emdo-Ech :time="timeRange"></emdo-Ech>
      <map-Ech :time="timeRange"></map-Ech>
      <tkco-Ech :time="timeRange"></tkco-Ech>
      <hot-Events :time="timeRange"></hot-Events>
    </div>
  </div>
</template>

<script>
import PodEch from './echcomponts/PodEch'
import MedEch from './echcomponts/MedEch'
import EmdoEch from './echcomponts/EmdoEch'
import MapEch from './echcomponts/MapEch'
import TkcoEch from './echcomponts/TkcoEch'
import HotEvents from './echcomponts/HotEvents'
export default {
  name: 'index',
  components: { PodEch, MedEch, EmdoEch, MapEch, TkcoEch, HotEvents },
  data() {
    return {
      pickerOptions: {
        shortcuts: this.$commonJs.commonShortcuts
      },
      timeRange: ''
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.timeBtn
  color #333333;
  font-size 14px;
  padding-left 24px;
  line-height 32px;
  font-weight 400;
.plBtn
  height 32px;
  margin 0;
  border-radius 0;
  color #666;
.el-input__inner
  height 32px;
  border-radius 0;
  padding 1px 10px;
.font
  display inline-block
  padding-right 10px
  color:#333;
  font-size: 14px;
  font-weight:500;
</style>
