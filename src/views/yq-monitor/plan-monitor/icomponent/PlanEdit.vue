<template>
  <div>
    <el-card>
      <el-tabs tab-position="top" @tab-click="changeTab">
        <el-tab-pane label="简单模式">
          <sim-Mod :list="data"></sim-Mod>
        </el-tab-pane>
        <el-tab-pane label="专家模式">
          <exp-Mod :list="data"></exp-Mod>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ExpMod from './modcomponts/ExpMod'
import SimMod from './modcomponts/SimMod'
import { mapState } from 'vuex'
export default {
  props: ['list'],
  data() {
    return {
      id: null,
      data: []
    }
  },
  name: 'index',
  components: {
    ExpMod,
    SimMod
  },
  methods: {
    getDataList() {
      this.$ynHttp.get('/getSchemeData').then(res => {
        if (res.data.code === '0') {
          let schemeList = res.data.data.schemeList
          /* 判断id 获取相对应列表数据 */
          schemeList.forEach(val => {
            if (val.id === this.id) {
              this.data = val
            }
          })
        }
      })
    },
    changeTab() {
      this.$bus.$emit('change')
    }
  },
  computed: {
    ...mapState('planMonitor', {
      searchObj: state => state.searchObj
    })
  },
  watch: {
    'searchObj.schemeId': {
      handler(newName, oldName) {
        this.id = this.searchObj.schemeId
        this.getDataList()
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus" scoped></style>
