<template>
  <div>
    <main-top>
      方案监测
    </main-top>
    <div class="list-warp">
      <div class="list-content">
        <h3 class="plan-title">方案列表</h3>
        <div class="time-warp">
          <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
        </div>
        <el-tree ref="tree" :current-node-key="0" highlight-current :data="planData" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent"> </el-tree>
      </div>
    </div>
    <div class="main-warp">
      <div class="main-content">
        <h3>涉旅</h3>
        <div class="tab-nav">
          <ul class="navigation-list" @click="navChange">
            <li :class="chooseId === 1 ? 'active' : ''" id="1">信息列表</li>
            <li :class="chooseId === 2 ? 'active' : ''" id="2">监测分析</li>
            <!-- <li :class="chooseId === 3 ? 'active' : ''" id="3">来源分析</li> -->
            <li :class="chooseId === 4 ? 'active' : ''" id="4">方案编辑</li>
          </ul>
        </div>
      </div>
      <info-list v-show="chooseId === 1"></info-list>

      <!-- 监测分析模块 -->
      <monitor-Ana v-if="chooseId === 2"></monitor-Ana>

      <!-- 方案编辑模块 -->
      <plan-Edit v-if="chooseId === 4"></plan-Edit>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MainTop from '../../../components/MainTop'
import InfoList from './icomponent/InfoList'
import MonitorAna from './icomponent/MonitorAna'
import PlanEdit from './icomponent/PlanEdit'
export default {
  name: 'index',
  components: { InfoList, MainTop, MonitorAna, PlanEdit },
  data() {
    return {
      /* 输入建议数组 */
      suggestList: [],
      state: '',
      timeout: null,
      planData: [
        {
          id: 1,
          label: '涉旅'
        }
      ],
      chooseId: 1
    }
  },
  methods: {
    ...mapActions('planMonitor', ['searchObjChange', 'pageObjChange']),
    renderContent: function(h, { node, data, store }) {
      return (
        <span id={'scheme' + data.id} on-click={() => this.choosePlan(data)} style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <label on-click={() => this.editPlan(data)} style="margin-right:16px;cursor:pointer">
              <svg-icon icon-class="edit"></svg-icon>
            </label>
            <label style="cursor:pointer">
              <svg-icon icon-class="menu"></svg-icon>
            </label>
          </span>
        </span>
      )
    },
    navChange(e) {
      let id = e.target.id
      if (window.Bee.StringUtils.isEmpty(id)) {
        return
      }
      this.chooseId = Number(id)
    },
    getSchemeData() {
      this.$ynHttp.get('/getSchemeData').then(res => {
        if (res.data.code === '0') {
          let schemeList = res.data.data.schemeList
          schemeList.forEach((val, index, arr) => {
            arr[index].label = arr[index].name
            arr[index] = Object.assign(arr[index], { label: arr[index].name })
          })
          schemeList.forEach(val => {
            this.suggestList.push({ value: val.name, id: val.id })
          })
          console.log(this.suggestList)

          this.planData = schemeList
          this.dataList = schemeList[0]
          /*  console.log(this.dataList, '默认') */
          let tempCurrentSchemeId = this.planData[0].id
          this.searchObjChange({
            schemeId: tempCurrentSchemeId
          })
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(tempCurrentSchemeId) // 数据请求成功后，设置默认current
          })
        }
      })
    },
    editPlan(data) {
      console.log(data.id)
      /* console.log(this.dataList); */
      this.chooseId = 4
      this.searchObjChange({
        schemeId: data.id
      })
    },
    choosePlan(data) {
      this.searchObjChange({
        schemeId: data.id
      })
    },
    /* 文本框搜索建议 */
    querySearchAsync(queryString, cb) {
      var suggestList = this.suggestList
      var results = queryString ? suggestList.filter(this.createStateFilter(queryString)) : suggestList

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 500 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    /* 点击输入框的文本 */
    handleSelect(item) {
      console.log(item.id)
      document.querySelector('#scheme' + item.id).click()
    }
  },
  mounted() {
    this.getSchemeData()
    /* 方案编辑简单模式 */
    this.$bus.$on('chooseId', () => {
      this.chooseId = 1
      this.getSchemeData()
      /*  console.log('aa'); */
    })
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/styles/common.styl";
.list-content >>> .el-tree-node__content
  margin-bottom 20px;
.list-content >>>.is-current
                  .el-tree-node__content
                    color: #3285f1;
                    border-left: 2px solid #3285f1;
.list-warp
  width: 283px;
  padding: 20px 0 0 20px;
  float: left;
  .list-content
    background #fff;
    position absolute;
    height 90%;
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
    .plan-title
      padding: 16px 0 0 24px;
      font-weight 500px;
    .time-warp
      padding: 16px;
    .el-tree
      padding 8px 16px;
.main-warp
  margin-left: 263px;
  padding: 20px 20px 0 20px;
  .main-content
    background #fff;
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
    h3
      font-weight 500;
      padding: 16px 0 0 24px;
    .tab-nav
      margin-top 12px;
      border-bottom: 1px solid #D8D8D8;
      .navigation-list
        margin-left 14px;
        clearFix();
        li
          float: left;
          padding: 4px 10px 11px;
          color: #666;
          margin-left: 20px;
          cursor: pointer;
          font-weight 400;
        .active
          border-bottom: 2px solid #3285F1;
          font-weight: 500;
          color: #333;
</style>
