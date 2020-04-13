<template>
  <div class="navigation-warp">
    <ul class="navigation-list" @click="dataTypeChange">
      <li :class="Number(chooseId) === 0? 'active': ''" id="0">全部</li>
      <li :class="Number(chooseId) === 2? 'active': ''" id="2">已分发</li>
      <li :class="Number(chooseId) === 3? 'active': ''" id="3">已处理</li>
      <li :class="Number(chooseId) === 7? 'active': ''" id="7">已退回</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TabNavigation',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('workOrder', {
      searchObj: state => state.searchObj
    }),
    chooseId: {
      get() {
        return this.searchObj.type
      },
      set(val) {
        this.searchObj.type = val
      }
    }
  },
  methods: {
    dataTypeChange(e) {
      let id = e.target.id
      if (window.Bee.StringUtils.isEmpty(id)) {
        return
      }
      this.chooseId = Number(id)
      // this.$emit('getOrderType', this.chooseId)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .navigation-warp
    topAreaWarp();
    .navigation-list
      border-bottom: 1px solid #D8D8D8;
      clearFix();
      li
        float: left;
        padding: 4px 10px 11px;
        color: #666;
        margin-left: 20px;
        cursor: pointer;
      .active
        border-bottom: 2px solid #3285F1;
        font-weight: 500;
        color: #333;
</style>
