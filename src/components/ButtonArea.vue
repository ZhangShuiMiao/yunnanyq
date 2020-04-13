<template>
  <div class="buttons-warp">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ButtonArea',
  methods: {
  },
  created() {
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
.buttons-warp
  topAreaWarp();
  .icon-margin-right
    margin-right 8px;
</style>
