<template>
  <div class="list-item-warp">
    <div class="checkbox-content" v-if="showCheckBox">
      <el-checkbox  @change="handleCheckOne(itemInfo.id)" v-model="myChecked" class="all-check"></el-checkbox>
    </div>
    <div :class="['list-main-content', !showCheckBox ? 'hide-checkbox' : '']">
      <div class="list-top">
        <!--有complaintId 为工单列表-->
        <h3 :class="['title-text', !!itemInfo.complaintId ?  itemInfo.dataLevel===8 ? 'sensitive-title' : '' : '']" @click="showDetail(itemInfo.id)">
          <svg-icon v-if="itemInfo.sourceType === 268435456" icon-class="wechat"></svg-icon>
          <svg-icon v-if="itemInfo.sourceType === 1048576" icon-class="weibo"></svg-icon>
          <svg-icon v-if="itemInfo.sourceType === 16" icon-class="bbs"></svg-icon>
          <svg-icon v-if="itemInfo.sourceType === 1" icon-class="news"></svg-icon>
          <!--标题如果是微博 展示昵称 没有昵称 展示为 作者 没有作者 展示成微博用户-->
          <span v-html="itemInfo.sourceType === 1048576 || Number(itemInfo.siteCls) === 1048576 ? (itemInfo.nickName ? itemInfo.nickName : (itemInfo.author ? itemInfo.author : '微博用户')) : itemInfo.title"></span>
        </h3>
        <span v-if="itemInfo.timeName && itemInfo.disposeStatus !==1" v-show="type===0 || type===11" :class="typeClass">{{itemInfo.timeName}}</span>
        <span v-if="itemInfo.degree!=null && itemInfo.degree === '敏感'" class="yq-sensitive">{{itemInfo.degree}}</span>
        <span v-if="itemInfo.dataLevel!=null && itemInfo.dataLevel === 8" class="yq-sensitive float-right">敏感</span>
        <template v-if="itemInfo.side!=null&&itemInfo.side!=='undefined'">
          <!-- 正面 -->
          <span v-if="Number(itemInfo.side) >0"><svg-icon icon-class="positive"></svg-icon></span>
          <!-- 中立 -->
          <span v-if="Number(itemInfo.side) === 0"><svg-icon icon-class="nature"></svg-icon></span>
          <!-- 负面 -->
          <span v-if="Number(itemInfo.side)< 0"><svg-icon icon-class="sensitive"></svg-icon></span>
        </template>
        <span v-if="itemInfo.category!=null" class="yq-category">{{itemInfo.category}}</span>
        <span v-if="itemInfo.dataTypeName!=null" class="yq-category">{{itemInfo.dataTypeName}}</span>
      </div>
      <div class="list-center" v-show="!abstractSwitch" @click="showDetail(itemInfo.id)">
        <span v-html="itemInfo.content"></span>
      </div>
      <div class="list-bottom">
        <span class="time-text">{{itemInfo.publishTime ? itemInfo.publishTime : itemInfo.issueTime}}</span>
        <span class="form-site order-site">{{itemInfo.siteName}}</span>
        <span class="geo-tag" v-for="entity in itemInfo.userAndArtEntities" :key="entity.id">{{entity.name}}</span>
        <span class="retreat-deparment-name" v-if="itemInfo.retreatDeparmentName">退回部门：{{itemInfo.retreatDeparmentName}}</span>
        <!--<span class="geo-tag">大理</span>-->
        <slot name="operateWarp"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ListItem',
  props: {
    itemInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    checked: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    showCheckBox: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    index: {
      type: Number,
      default: () => {
        return 0
      }
    },
    type: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
      myChecked: this.checked,
      pushed: this.itemInfo.pushed,
      leaderData: this.itemInfo.itemInfo,
      rubbish: this.itemInfo.rubbish
    }
  },
  computed: {
    ...mapState(['abstractSwitch']),
    typeClass: function() {
      let className = 'yq-nature'
      let timeTypeNum = this.itemInfo.timeName
      if (timeTypeNum.indexOf('新增') !== -1) {
        className = 'yq-create'
      } else if (timeTypeNum.indexOf('已提醒') !== -1) {
        className = 'yq-nature'
      } else if (timeTypeNum.indexOf('超期') !== -1) {
        className = 'yq-sensitive'
      } else if (timeTypeNum.indexOf('即将超期') !== -1) {
        className = 'yq-extended'
      }
      return className
    }
  },
  watch: {
    checked: function(val) {
      this.myChecked = val
    }
  },
  methods: {
    handleCheckOne(id) {
      this.$emit('handleCheckOne', {
        id: id,
        index: this.index
      })
    },
    showDetail(id) {
      this.$emit('showDetail', {
        id: id,
        index: this.index
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .list-item-warp >>> .highlight
    color #EB4B4B;
  .list-item-warp
    box-sizing border-box;
    width 100%;
    padding: 12px 40px 16px $listPaddingLeft;
    border-bottom: 1px solid $listBottomBorder;
    position: relative;
    .checkbox-content
      box-sizing border-box;
      position: absolute;
      height: 100%;
      width: 45px;
      flexAlignCenter();
      margin-top: -12px;
    .hide-checkbox
      padding-left: 0px!important;
    .list-main-content
      padding-left 45px
      .list-top
        .title-text
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-right: 24px;
          cursor: pointer;
          .svg-icon
            margin-right:8px;
        .sensitive-title
          color: #EB4B4B;
        .float-right
          margin-right: 0;
          float: right;
        .yq-sensitive
          yqLevel($yqSensitive);
        .yq-positive
          yqLevel($orderDistribution);
        .yq-nature
          yqLevel($yqNature);
        .yq-create
          yqLevel($create);
        .yq-extended
          yqLevel($extended);
        .yq-category
          yqCategory();
      .list-center
        margin-top: 10px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height:1.5;
        font-weight: 400;
        font-size: 14px;
        color: #666;
        cursor: pointer;
      .list-bottom
        margin-top: 16px;
        .time-text
          font-weight: 400;
          color: #999;
          margin-right 16px;
        .form-site
          font-weight: 400;
          color: #999;
          margin-right 16px;
        .order-site
          color: #3285F1;
          font-weight: bold;
        .geo-tag
          yqCategory();
        .retreat-deparment-name
          color #999;
          font-weight bold;
        .operate-warp
          float: right;
          padding-top: 6px;
          .svg-icon
            margin-left: 28px;
          span
            color: #666;
            cursor: pointer;
            padding-left: 4px;
          .active
            color: #3285f1;
</style>
