<template>
  <div class="page-warp">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.current_page"
      :page-sizes="[10, 20, 40, 60, 80]"
      :page-size=pagination.page_size
      :layout="layout"
      :total=pagination.total>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CommonPagination',
  props: {
    pagination: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hidePageSize: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    layout: function () {
      return this.hidePageSize ? 'total, prev, pager, next, jumper' : 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
      currentPage1: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pageSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('currentPageChange', val)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .page-warp
    width: 100%;
    margin: auto;
    padding: 20px;
    flexCenter();
</style>
