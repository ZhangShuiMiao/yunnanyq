<template>
  <div class="search-area-wap">
    <div :class="['search-area', fold ? '' : 'fold-area']" :style="{height: transitionHeight+'px'}">
      <slot></slot>
      <div class="fold-icon" v-show="!searchWarpHidden" @click="foldOrUnfold">
        <svg-icon  :icon-class="fold ? 'down' : 'up'"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchAreaWarp',
  props: ['searchWarpHidden'],
  data() {
    return {
      fold: false,
      transitionHeight: 70
    }
  },
  methods: {
    foldOrUnfold() {
      var tempFold = this.fold
      this.fold = true
      if (!tempFold) {
        this.transitionHeight = 72
      } else {
        this.transitionHeight = 120
      }
      setTimeout(() => {
        if (tempFold) {
          this.fold = false
        }
      }, 200)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .search-area-wap
    topAreaWarp();
    position: relative;
  .fold-area
    height: auto!important;
  .fold-area-transition
    height 120px;
  .search-area
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    height: 72px;
    overflow: hidden;
    padding: 0 40px 16px 52px;
    transition: height 0.2s linear;
    .fold-icon
      position: absolute;
      bottom: 10px;
      right: 40px;
</style>
