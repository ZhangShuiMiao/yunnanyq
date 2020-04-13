<template>
    <el-menu
        :collapse="isSidebarNavCollapse"
        background-color="#2E2E2E"
        text-color="#DDDDDD"
        active-text-color="#fff"
        :unique-opened="true"
        :default-active="currentMenu"
    >
        <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
    </el-menu>
</template>

<script>
import DynamicMenu from '@/components/DynamicMenu'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isCollapse: true
    }
  },
  mounted() {
    console.log(this.currentMenu)
  },
  computed: {
    ...mapState(['isSidebarNavCollapse']),
    ...mapState('permission', ['sidebarMenu', 'currentMenu'])
  },
  methods: {},
  components: {
    DynamicMenu
  }
}
</script>

<style scoped lang="stylus">
.el-menu
  height 100%;
  box-sizing: border-box;
  border:none;
  .is-active
    background #3285F1!important;
</style>
