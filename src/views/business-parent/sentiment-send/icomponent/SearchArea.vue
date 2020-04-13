<template>
  <search-area-warp>
    <template>
      <el-form :inline="true" name="searchForm" :model="formInline" class="demo-form-inline">
        <el-form-item label="数据类型">
          <!--TODO-->
          <el-select v-model="formInline.isAlert"  clearable placeholder="数据类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="预警数据" value="true"></el-option>
            <el-option label="其他数据" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序方式">
          <el-select v-model="formInline.orderType"  placeholder="排序方式">
            <el-option label="采集时间逆序" value="0"></el-option>
            <el-option label="发布时间逆序" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送状态">
          <el-select v-model="formInline.pushedStatus"  clearable placeholder="推送状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待推送" value="0"></el-option>
            <el-option label="已推送" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源类型">
          <el-select v-model="formInline.sourceType"  clearable placeholder="来源类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="新闻" value="1"></el-option>
            <el-option label="论坛" value="16"></el-option>
            <el-option label="微博" value="1048576"></el-option>
            <el-option label="微信" value="268435456"></el-option>
          </el-select>
        </el-form-item>
        <!--//TODO-->
        <el-form-item label="无效数据">
          <el-select v-model="formInline.isRubbish"  clearable placeholder="无效数据">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领导舆情">
          <el-select v-model="formInline.isLeaderData"  placeholder="领导舆情">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展示条数">
          <el-select v-model="pageObj.pageSize"  placeholder="展示条数">
            <el-option label="10" value="10"></el-option>
            <el-option label="20" value="20"></el-option>
            <el-option label="40" value="40"></el-option>
            <el-option label="60" value="60"></el-option>
            <el-option label="80" value="80"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采集方式">
          <el-select v-model="formInline.manual"  clearable placeholder="采集方式">
            <el-option label="全部" value=""></el-option>
            <el-option label="手动" value="true"></el-option>
            <el-option label="自动" value="false"></el-option>
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
        <el-form-item label="内容搜索">
          <el-input type="text" prefix-icon="el-icon-search"  v-model="tempSearchWords"></el-input>
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
      tempSearchWords: '',
      timer: null
    }
  },
  computed: {
    ...mapState('sentimentSend', {
      formInline: state => state.searchObj,
      pageObj: state => state.pageObj
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
    },
    tempSearchWords: function (val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.formInline.searchWords = val
      }, 300)
    }
  },
  methods: {
    ...mapActions('sentimentSend', ['searchObjChange', 'pageObjChange'])
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
</style>
