<template>
  <el-dialog title="转至ota" :visible.sync="dialogVisible" @close="handleCancel" width="830px">
    <div class="send-dialog">
      <div class="send-item">
        <label class="title">转发单位：</label>
        <label class="content">
          <el-checkbox-group v-model="toOTADepartment">
            <el-checkbox v-for="item in departmentList" :key="item.value" :label="item.value">{{item.content}}</el-checkbox>
          </el-checkbox-group>
        </label>
      </div>
      <div class="send-item">
        <label class="title">处置反馈要求：</label>
        <label class="content">
            <el-checkbox label="反馈凭证" v-model="adminChecked"></el-checkbox>
        </label>
      </div>
      <div class="send-item">
        <label class="title">分发意见：</label>
        <label class="content" style="width: 614px;">
          <el-input type="textarea" :rows='5' v-model="disposeMessage" ></el-input>
        </label>
      </div>
      <div class="send-item">
        <label class="title">上传附件：</label>
        <el-upload
          ref="upload"
          :action="action"
          list-type="picture-card"
          name="file"
          :limit="20"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="uploadDialogVisible" size="tiny" @close="uploadDialogVisible= false">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
  name: 'ForwardOta',
  props: ['dialogFormVisible', 'departmentList'],
  data() {
    return {
      dialogVisible: this.dialogFormVisible,
      toOTADepartment: [],
      disposeMessage: null,
      adminChecked: false,
      action: process.env.VUE_APP_API_URL + '/yq/upload', // 上传链接
      uploadDialogVisible: false,
      dialogImageUrl: null, // 预览图片链接
      fileList: [], // 上传文件列表
    }
  },
  watch: {
    dialogFormVisible: function(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    uploadSuccess(res, file, fileList) {
      if (Number(res.errorcode) === 0) {
        let imageUrl = res.data.image_url
        this.fileList.push(imageUrl)
      }
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item !== file.url)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.uploadDialogVisible = true
    },
    handleCancel() {
      this.$emit('handleCancel')
    },
    handelConfirm () {
      let admina = 0
      if (this.adminChecked) {
        admina = 2
      }
      this.$http.post('/yq/webdatadetail/send2OTA', {
        toOTADepartment: this.toOTADepartment,
        admina: admina,
        disposeMessage: this.disposeMessage,
        uploaded_image: this.fileList,
        dataId: this.$parent.dataId,
        type: this.$parent.type
      }).then(res => {
        this.handleCancel()
        this.$router.go(-1)
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
</style>
