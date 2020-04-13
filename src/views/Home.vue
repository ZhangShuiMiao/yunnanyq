<template>
  <div class="home">
    <search-area-warp>
      <template>
        <el-form :inline="true" name="searchForm" :model="form" class="demo-form-inline">
          <el-form-item label="地理位置">
            <el-select v-model="form.area_name" placeholder="地理位置">
              <el-option label="云南" value=""></el-option>
              <el-option label="昆明市" value="昆明市"></el-option>
              <el-option label="保山市" value="保山市"></el-option>
              <el-option label="楚雄州" value="楚雄州"></el-option>
              <el-option label="德宏州" value="德宏州"></el-option>
              <el-option label="迪庆州" value="迪庆州"></el-option>
              <el-option label="红河州" value="红河州"></el-option>
              <el-option label="丽江市" value="丽江市"></el-option>
              <el-option label="临仓市" value="临仓市"></el-option>
              <el-option label="怒江市" value="怒江市"></el-option>
              <el-option label="普洱市" value="普洱市"></el-option>
              <el-option label="西双版纳州" value="西双版纳州"></el-option>
              <el-option label="文山州" value="文山州"></el-option>
              <el-option label="玉溪市" value="玉溪市"></el-option>
              <el-option label="昭通市" value="昭通市"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="form.timeRange"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>
    </search-area-warp>
    <div class="home-info-warp">
      <div class="home-item-info">
        <div class="item-content">
          <el-row>
            <el-col :span="6">
              <i class="order_total"></i>
              <div class="info-detail">
                <h3>舆情工单总数</h3>
                <div>22<label>个</label></div>
              </div>
            </el-col>
            <el-col :span="6">
              <i class="create_order"></i>
              <div class="info-detail">
                <h3>新增工单数</h3>
                <div>22<label>个</label></div>
              </div>
            </el-col>
            <el-col :span="6">
              <i class="send_order"></i>
              <div class="info-detail">
                <h3>已分发工单数</h3>
                <div>22<label>个</label></div>
              </div>
            </el-col>
            <el-col :span="6">
              <i class="dispose_order"></i>
              <div class="info-detail">
                <h3>已处置工单数</h3>
                <div>22<label>个</label></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="home-info-warp">
      <div class="home-item-warp">
        <h3 class="item-title">标题</h3>
        <div class="item-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchAreaWarp from '../components/SearchAreaWarp'
export default {
  name: 'home',
  components: {
    SearchAreaWarp
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: this.$commonJs.commonShortcuts
      },
      form: {
        area_name: null,
        timeRange: null
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .home >>> .search-area-wap
    padding-top: 0!important;
  .home >>> .search-area
    padding: 0!important;
    background: transparent;
</style>
