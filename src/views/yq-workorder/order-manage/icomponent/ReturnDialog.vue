<template>
  <el-dialog title="退回工单" :visible.sync="dialogVisible" @close="handleCancel" width="830px" :close-on-click-modal="false">
    <div class="send-dialog">
      <div class="send-item">
        <label class="title red-tip">退回理由：</label>
        <label class="content" style="width: 614px;">
          <el-input type="textarea" :rows='6' v-model="content" ></el-input>
        </label>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handelConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ReturnDialog',
  props: ['dialogFormVisible'],
  data() {
    return {
      dialogVisible: this.dialogFormVisible,
      content: null
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
    handelConfirm () {
      if (window.Bee.StringUtils.isEmpty(this.content)) {
        this.$message.error('请输入退回理由')
        return
      }
      this.$http.post('/yq/returnDispose', {
        content: this.content,
        dataId: this.$parent.dataId,
        type: this.$parent.type
      }).then(res => {
        this.$router.go(-1)
        this.handleCancel()
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .send-dialog
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding: 0 28px;
    margin-top: -8px;
    .send-item
      display: flex;
      margin-top: 24px;
      .title
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        margin-right 26px;
      .red-tip
        &::before
          display inline-block;
          content: '*';
          color #f33;
          vertical-align: sub;
          position absolute;
          transform: translate(-200%,11%);
</style>
