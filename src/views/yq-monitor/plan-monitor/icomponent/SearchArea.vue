<template>
  <search-area-warp>
    <template>
      <el-form :inline="true" name="searchForm" :model="formInline" class="demo-form-inline">
        <el-form-item label="舆论情绪">
          <!--TODO-->
          <el-select v-model="formInline.side" clearable placeholder="舆论情绪">
            <el-option label="全部" value=""></el-option>
            <el-option label="负面" value="-1"></el-option>
            <el-option label="中立" value="0"></el-option>
            <el-option label="正面" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序方式">
          <el-select v-model="formInline.orderType" clearable placeholder="排序方式">
            <el-option label="采集时间排序" value="5"></el-option>
            <el-option label="发布时间排序" value="1"></el-option>
            <el-option label="相关时间排序" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="formInline.timeRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="来源类型" style="display: block">
          <div class="cls-count-warp">
            <div v-for="(item, index) in siteClsArr" :key="index" class="cls-item" @click="siteClsChoose(item.key, index)">
              <el-button :type=" item.selected ? 'primary': ''">{{item.desc}}</el-button>
              <p>{{item.count}}</p>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </search-area-warp>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchAreaWarp from '@/components/SearchAreaWarp'
export default {
  name: 'SearchArea',
  components: {
    SearchAreaWarp
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: this.$commonJs.commonShortcuts
      },
      // siteClsArr: this.siteClsArr
    }
  },
  computed: {
    ...mapState('planMonitor', {
      formInline: state => state.searchObj,
      pageObj: state => state.pageObj,
      siteClsArr: state => state.siteClsArr,
    })
  },
  watch: {
    formInline: {
      handler(val, oldVal) {
        this.searchObjChange(val)
      },
      deep: true
    },
    pageObj: {
      handler(val, oldVal) {
        this.pageObjChange(val)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('planMonitor', ['searchObjChange', 'pageObjChange']),
    siteClsChoose(key, index) {
      this.formInline.siteCls = key
      this.siteClsArr.forEach((val, index, arr) => {
        val.selected = false
      })
      this.siteClsArr[index].selected = true
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/styles/common.styl";
.search-area-wap
  padding 0;
  .cls-count-warp
    display flex;
    .cls-item
      margin-right 20px;
      display flex;
      flex-direction column;
      align-items  center;
</style>
