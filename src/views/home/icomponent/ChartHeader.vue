<template>
  <div class="chart-header">
    <div class="chart-title">
      <slot name="chartTitle"></slot>
    </div>
    <div class="chart-unit">
      <slot name="chartUnit"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartHeader'
}
</script>

<style scoped lang="stylus">
  .chart-header
    display flex;
    justify-content space-between;
    align-items center;
    .chart-title
      font-weight 500;
    .chart-unit
      font-size 12px;
      font-weight 300;
      color #8f8f8f;
</style>
