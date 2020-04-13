<template>
  <div class="navigation-warp">
    <ul class="navigation-list" @click="dataTypeChange">
      <li :class="Number(chooseId) === 1? 'active': ''" id="1">舆情</li>
      <li :class="Number(chooseId) === 2? 'active': ''" id="2">工单</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TabNavigation',
  data() {
    return {
      chooseId: 1
    }
  },
  methods: {
    dataTypeChange(e) {
      let id = e.target.id
      if (window.Bee.StringUtils.isEmpty(id)) {
        return
      }
      this.chooseId = Number(id)
      this.$emit('getOrderType', this.chooseId)
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
