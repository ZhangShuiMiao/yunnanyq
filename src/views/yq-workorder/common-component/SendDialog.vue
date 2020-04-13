<template>
  <el-dialog title="工单分发" :visible.sync="dialogVisible" @close="handleCancel" width="830px" :close-on-click-modal="false">
    <div class="send-dialog">
      <div class="send-item">
        <label class="title red-tip">转发单位：</label>
        <label class="content">
          <el-checkbox-group v-model="toDepartment">
            <el-checkbox v-for="item in departmentList" :key="item.value" :label="item.value">{{item.content}}</el-checkbox>
          </el-checkbox-group>
        </label>
      </div>
      <div class="send-item">
        <label class="title">处置要求：</label>
        <label class="content">
            <el-checkbox label="上传处置凭证" v-model="adminChecked"></el-checkbox>
        </label>
      </div>
      <div class="send-item">
        <label class="title red-tip">分发意见：</label>
        <label class="content" style="width: 614px;">
          <el-input type="textarea" :rows='5' v-model="pushOpinion" ></el-input>
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
  name: 'SendDialog',
  // props: ['dialogFormVisible', 'departmentList', 'agreeAndSend'],
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    departmentList: {
    },
    agreeAndSend: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  },
  data() {
    return {
      dialogVisible: this.dialogFormVisible,
      toDepartment: [],
      pushOpinion: null,
      adminChecked: false
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
      if (this.agreeAndSend === true) {
        console.log('agreeAndSendFun')
        this.agreeAndSendFun()
      } else {
        this.sendFun()
      }
    },
    async agreeAndSendFun() {
      let res = await this.agreeFun()
      if (res.data.errorcode === 0) {
        setTimeout(() => {
          this.sendFun()
        }, 500)
      }
    },
    agreeFun() {
      return this.$http.post('/yq/agree', {
        dataId: this.$parent.dataId,
        type: this.$parent.type,
        procedureId: this.$parent.procedureId
      })
    },
    sendFun() {
      let admina = 0
      if (this.adminChecked) {
        admina = 2
      }
      if (window.Bee.StringUtils.isEmpty(this.pushOpinion)) {
        this.$message.error('请输入分发意见')
        return
      }
      if (this.toDepartment.length === 0) {
        this.$message.error('请选择分发部门')
        return
      }
      this.$http.post('/yq/webdatadetail/send', {
        toDepartment: this.toDepartment,
        admina: admina,
        pushOpinion: this.pushOpinion,
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
