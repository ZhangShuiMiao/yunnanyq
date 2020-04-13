<template>
  <el-dialog title="舆情详情" :visible.sync="dialogVisible" @close="handleCancel" width="700px" :close-on-click-modal="false">
    <div class="yq-detail">
      <div class="detail-title">
        <!--{{detailInfo.title}}-->
        <!--标题如果是微博 展示昵称 没有昵称 展示为 作者 没有作者 展示成微博用户-->
        <span v-html="!!detailInfo.siteName&&detailInfo.siteName.indexOf('微博') !== -1 ? (detailInfo.nickName ? detailInfo.nickName : (detailInfo.author ? detailInfo.author : '微博用户')) : detailInfo.title"></span>
      </div>
      <div class="detail-center">
        <span class="time">{{detailInfo.publishTime}}</span>
        <span class="from-site">{{detailInfo.siteName}}</span>
        <a class="link" target="_blank" :href="detailInfo.url">查看原文链接</a>
      </div>
      <div class="geo-tags">
        <label>地理标签:</label>
        <span class="geo-tag" v-for="item in detailInfo.entities" :key="item.id">{{item.name}}</span>
      </div>
      <div class="content">
        <el-scrollbar class="no-xscorll" style="height: 100%;">
          {{detailInfo.content}}
        </el-scrollbar>
      </div>
      <div class="operate-warp">
        <el-button :type="detailInfo.pushed ? 'info' : 'primary'" :disabled="detailInfo.pushed" @click="pushYqOrder(detailInfo.id)">推送舆情工单</el-button>
        <el-button :type="detailInfo.leaderData ? 'warning' : 'primary'" @click="markLeader(detailInfo.id)">{{detailInfo.leaderData ? '移除领导舆情' : '加入领导舆情'}}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DetailDialog',
  props: ['dialogFormVisible', 'detailInfo'],
  data() {
    return {
      dialogVisible: this.dialogFormVisible
    }
  },
  watch: {
    dialogFormVisible: function(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    handleCancel() {
      this.$emit('handleCancel')
    },
    pushYqOrder(id) {
      this.$emit('pushYqOrder', id)
    },
    markLeader(id) {
      this.$emit('markLeader', id)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
.yq-detail
  width:100%;
  height:100%;
  box-sizing: border-box;
  padding: 0 28px;
  margin-top -6px;
  font-size: 14px;
  .detail-title
    font-size: 18px;
    color: #333;
    line-height: 1.5;
    font-weight bold;
  .detail-center
    margin-top: 16px;
    color: #999;
    .time
      margin-right: 16px;
    .from-site
      margin-right: 16px;
    .link
      color: #3285F1;
  .geo-tags
    margin-top: 16px;
    color: #999;
    label
      margin-right: 8px;
    .geo-tag
      yqCategory();
  .content
    height: 200px;
    color: #333;
    line-height: 1.75;
    margin-top: 16px;
  .operate-warp
    margin-top: 24px;
    text-align: right;
</style>
