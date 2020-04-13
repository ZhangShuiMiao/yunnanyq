<template>
  <search-area-warp>
    <template>
      <el-form :inline="true" name="searchForm" ref="searchForm"  :model="searchForm" class="demo-form-inline">
        <!--<el-form-item label="行政区划" prop="area_name">-->
          <!--<el-select v-model="searchForm.area_name" clearable placeholder="行政区划">-->
            <!--<el-option label="全省" value=""></el-option>-->
            <!--<el-option label="昆明市" value="昆明市"></el-option>-->
            <!--<el-option label="保山市" value="保山市"></el-option>-->
            <!--<el-option label="楚雄州" value="楚雄州"></el-option>-->
            <!--<el-option label="德宏州" value="德宏州"></el-option>-->
            <!--<el-option label="迪庆州" value="迪庆州"></el-option>-->
            <!--<el-option label="红河州" value="红河州"></el-option>-->
            <!--<el-option label="丽江市" value="丽江市"></el-option>-->
            <!--<el-option label="临仓市" value="临仓市"></el-option>-->
            <!--<el-option label="怒江市" value="怒江市"></el-option>-->
            <!--<el-option label="普洱市" value="普洱市"></el-option>-->
            <!--<el-option label="西双版纳州" value="西双版纳州"></el-option>-->
            <!--<el-option label="文山州" value="文山州"></el-option>-->
            <!--<el-option label="玉溪市" value="玉溪市"></el-option>-->
            <!--<el-option label="昭通市" value="昭通市"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="舆情类别" prop="data_type">
          <el-select v-model="searchForm.data_type" clearable placeholder="舆情类别">
            <el-option label="购物" value="1"></el-option>
            <el-option label="导游" value="2"></el-option>
            <el-option label="旅行社" value="3"></el-option>
            <el-option label="交通" value="4"></el-option>
            <el-option label="景区" value="5"></el-option>
            <el-option label="旧闻" value="6"></el-option>
            <el-option label="低价游" value="7"></el-option>
            <el-option label="治安" value="8"></el-option>
            <el-option label="餐饮" value="9"></el-option>
            <el-option label="住宿" value="10"></el-option>
            <el-option label="其他" value="99"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源类型" prop="sourceType">
          <el-select v-model="searchForm.sourceType" placeholder="来源类型">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="新闻" value="1"></el-option>
            <el-option label="论坛" value="16"></el-option>
            <el-option label="微博" value="1048576"></el-option>
            <el-option label="微信" value="268435456"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="舆情级别" prop="level">
          <el-select v-model="searchForm.level" placeholder="推送状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="一般" value="1"></el-option>
            <el-option label="敏感" value="8"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="展示条数">-->
          <!--<el-select v-model="pageObj.pageSize" placeholder="展示条数">-->
            <!--<el-option label="10" value="10"></el-option>-->
            <!--<el-option label="20" value="20"></el-option>-->
            <!--<el-option label="40" value="40"></el-option>-->
            <!--<el-option label="60" value="60"></el-option>-->
            <!--<el-option label="80" value="80"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="工单发布时间" prop="timeRange">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="searchForm.timeRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容搜索" >
          <el-input type="text" prefix-icon="el-icon-search" v-model="tempSearchWords"></el-input>
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
    ...mapState('workOrder', {
      searchForm: state => state.searchObj,
      pageObj: state => state.pageObj
    })
  },
  watch: {
    searchForm: {
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
        this.searchForm.keyWord = val
      }, 300)
    }
  },
  methods: {
    ...mapActions('workOrder', ['searchObjChange', 'pageObjChange', 'getWorkOrderList']),
    resetForm() {
      this.$nextTick(() => {
        this.$refs['searchForm'].resetFields()
      })
    }
  },
  created() {
    // 从详情页返回保留查询条件查询一次列表 否则重置查询条件查询列表
    if (global.orderListflag) {
      this.getWorkOrderList()
    } else {
      this.searchObjChange({
        area_name: null,
        data_type: null,
        sourceType: '-1',
        level: '-1',
        timeRange: [],
        keyWord: null })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
</style>
