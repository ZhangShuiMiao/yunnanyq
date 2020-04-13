<template>
  <div class="charts-warp">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ChartsWarp'
}
</script>

<style scoped lang="stylus">
  .charts-warp
    position relative;
    clearFix();
    background: #fff;
    padding: 16px 24px 0;
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
    .charts-title
      font-weight: 500;
</style>
