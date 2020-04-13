<template>
  <div class="list-warp">
    <div class="list-content">
      <div class="list-title" v-if="!hideTitle">
        <el-checkbox v-model="myCheck" v-if="!hideCheckBox"  class="all-check" @change="handleCheckAllChange"></el-checkbox>
        <slot name="listTitle">舆情列表</slot>
        <span class="list-total">（共
          <slot name="listTotal"></slot>
          条）</span>
        <div class="hide-abstract">
          <!--<el-switch-->
            <!--active-color="#ddd"-->
            <!--inactive-color="#3285f1"-->
            <!--:inactive-text = "!abstractSwitch? '隐藏摘要': '展开摘要'"-->
            <!--@change="hideAbstract"-->
            <!--v-model="abstractSwitch">-->
          <!--</el-switch>-->
          <el-checkbox  @change="hideAbstract" v-model="abstractSwitch">隐藏摘要</el-checkbox>
        </div>
      </div>
      <slot name="listContent"></slot>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ListWarp',
  props: ['checkAll', 'hideTitle', 'hideCheckBox'],
  data() {
    return {
      myCheck: this.checkAll,
    }
  },
  watch: {
    checkAll: function (val) {
      this.myCheck = val
    }
  },
  computed: {
    ...mapState(['abstractSwitch']),
  },
  methods: {
    handleCheckAllChange() {
      this.$emit('handleCheckAllChange')
    },
    hideAbstract() {
      this.$store.commit('toggleAbstractSwitch')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .list-warp
    topAreaWarp();
    font-size 14px;
    .list-content
      box-sizing: border-box;
      box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
      padding-bottom: 24px;
      background #fff;
    .list-title
      box-sizing: border-box;
      width: 100%;
      height: 46px;
      line-height: 46px;
      padding-left: $listPaddingLeft;
      font-weight:400;
      color: #666;
      border-bottom: 1px solid $listBottomBorder;
      .list-total
        margin-left: 8px;
        color: #999;
        font-size: 12px;
      .all-check
        margin-right: $listCheckboxRight;
      .hide-abstract
        float right;
        margin-right 20px;
</style>
