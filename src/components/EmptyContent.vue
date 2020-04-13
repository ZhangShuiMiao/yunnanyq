<template>
    <div :class="['empty-warp', isList ? 'empty-warp-list': '']">
      <div class="image-content"></div>
    </div>
</template>

<script>
export default {
  name: 'EmptyContent',
  props: {
    isList: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  }
}
</script>

<style scoped lang="stylus">
.empty-warp
  width: 100%;
  height 370px;
  position absolute;
  .image-content
    margin-top 16px;
    width 100%;
    height 211px;
    background url("~@/assets/images/empty_content.png") no-repeat center/contain ;
.empty-warp-list
  height auto;
  position relative!important;
</style>
