<template>
    <div :class="{navCollapsed:isSidebarNavCollapse}">
      <el-container>
        <el-header>
          <TopAside/>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <sidebarNav  class="sidebar"/>
          </el-aside>
          <el-main class="main-container">
            <el-scrollbar ref="wrap" id="scrollContent" class="no-xscorll" style="height: 100%;">
              <router-view></router-view>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import TopAside from './component/top-aside'
import sidebarNav from './component/sidebar-nav'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['isSidebarNavCollapse'])
  },
  components: {
    sidebarNav,
    TopAside
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/styles/common.styl";
  .el-container
    height 100%;
  .el-header
    height $topAsideHeight!important;
  .el-aside
    width: 200px;
    position: fixed;
    top: $topAsideHeight;
    bottom: 0px;
  .main-container
    min-height: 100%;
    margin-left: 200px;
    transition: margin-left 0.25s;
    position: relative;
    box-sizing: border-box;
    background: #F2F2F2;
    padding:0;
    overflow-x hidden;
</style>
