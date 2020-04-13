<template>
  <div class="table-warp">
    <main-top>周报</main-top>
    <el-card>
      <el-table
        :data="repostList"
        style="width: 100%"
        :header-cell-style="{ background: '#9DC2F2', height: '62px', color: '#fff' }"
        :row-style="{ height: '47px', color: '#666' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column label="报告名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.numDesc }}
          </template>
        </el-table-column>
        <el-table-column label="报告创建时间" align="center">
          <template slot-scope="scope">
            {{ formt(scope.row.createTime) }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="weeklyNum" label="涉及工单数量" align="center"> </el-table-column> -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span @click="down(scope.row)">
              <svg-icon icon-class="download"></svg-icon>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <common-pagination :pagination="pagination" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"></common-pagination>
  </div>
</template>

<script>
import MainTop from '@/components/MainTop'
import CommonPagination from '@/components/CommonPagination'
export default {
  name: 'index',
  components: {
    MainTop,
    CommonPagination
  },
  data() {
    return {
      pagination: {
        current_page: 1,
        page_size: 10,
        total: 1
      },
      repostList: []
    }
  },
  methods: {
    /* 行颜色隔行变色 */
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    /* 获取列表 */
    async getReportList() {
      const { data: res } = await this.$http.get(`/yq/weeklyReportList/
      ${this.pagination.current_page}/${this.pagination.page_size}`)
      if (res.code !== '0') {
        return false
      }
      this.pagination.total = res.data.pagination.total
      console.log(res)
      this.repostList = res.data.dataList
    },
    /* 格式件时间 */
    formt(row) {
      /*  return window.Bee.DateUtils.formt(new Date(row.replace('T', " ")), 'yyyy-MM-dd hh:mm:ss') */
      return row.split('T')[0]
    },
    /* pageSize变化函数 */
    pageSizeChange(val) {
      this.pagination.page_size = val
      this.pagination.current_page = 1
      this.getReportList()
    },
    /* 当前页变化时间 */
    currentPageChange(val) {
      this.pagination.current_page = val
      this.getReportList()
    },
    /* 下载 */
    down(report) {
      console.log(report)
      // return
      const res = `${process.env.VUE_APP_API_URL}/yq/exportWeekly/${report.startTimeText}/${report.endTimeText}/${report.weeklyNum}`
      window.open(res)
    }
  },
  created() {
    this.getReportList()
  }
}
</script>

<style scoped lang="stylus">
.el-card
  margin 20px;
  margin-bottom  0px;

.table-warp >>> .el-table .warning-row
                  background  #fff;
.table-warp >>> .el-card__body
                  padding 0 !important ;
.table-warp >>> .el-table .success-row
                  background: #f2f2f2;
</style>
