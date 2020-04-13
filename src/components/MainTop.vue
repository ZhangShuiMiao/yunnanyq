<template>
  <div class="main-top">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'main-top'
}
</script>

<style scoped lang="stylus">
.main-top
  height: 50px;
  line-height: 50px;
  padding-left 40px;
  width: 100%;
  background #fff;
  color: #333;
  font-size: 16px;
  font-weight:500;
</style>
