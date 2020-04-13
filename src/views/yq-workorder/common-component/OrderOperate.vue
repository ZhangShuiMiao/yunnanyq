<template>
  <div>
    <template v-if="buttonType===1">
      <span  class="order-distribution" @click="send(false)">分发</span>
      <span  class="order-undo" @click="returnOrder">退回</span>
    </template>
    <template v-if="buttonType===2">
      <span  class="order-distribution" @click="send(false)">分发</span>
      <span  class="order-undo" @click="cancelOrderDialogShow">撤销</span>
    </template>
    <template v-if="buttonType===3">
      <span  class="order-distribution" v-if="operationResultName!=='已处置'" @click="reminderShow">督办提醒</span>
      <span  class="order-distribution" v-else @click="supplement">补充处置</span>
    </template>
    <template v-if="buttonType===4">
      <span  class="order-distribution" @click="supplement">补充处置</span>
    </template>
    <template v-if="buttonType===5">
      <span  class="order-distribution" @click="agreeNotSend">通过且不再分发</span>
      <span  class="order-distribution" @click="refuseDialogShow">拒绝</span>
      <span  class="order-distribution" @click="agree">通过并再次分发</span>
    </template>
    <template v-if="buttonType===6">
      <span  class="order-distribution" @click="dispose">处置</span>
      <span  class="order-undo" @click="returnOrder">退回</span>
    </template>
    <template v-if="cancelSenFlag && Number(dataLevel) === 8">
      <span  class="order-undo" @click="cancelSenDialogShow">取消敏感</span>
    </template>
    <template v-if="(buttonType === 1 || buttonType === 2 ) && Number(dataType) === 7">
      <span  class="order-distribution" v-if="!hiddenOta"  @click="forWardOta">转至OTA</span>
    </template>
    <!--撤销工单弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="cancelDialogVisible"
      width="547px"
      @close="cancelDialogVisible=false"
      :close-on-click-modal="false">
      <span>是否撤销该工单</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="cancelOrder">确 定</el-button>
        </span>
    </el-dialog>
    <!--拒绝退回工单弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="refuseDialogVisible"
      width="547px"
      @close="refuseDialogVisible=false"
      :close-on-click-modal="false">
      <span>是否拒绝退回工单</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="refuseDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="refuseRetreat">确 定</el-button>
        </span>
    </el-dialog>
    <!--取消敏感弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="cancelSenDialogVisible"
      width="547px"
      @close="cancelSenDialogVisible=false"
      :close-on-click-modal="false">
      <span>是否取消敏感</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelSenDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="cancelSenConfirm">确 定</el-button>
        </span>
    </el-dialog>
    <!--督办提醒弹窗-->
    <el-dialog title="督办提醒" :visible.sync="reminderDialogVisible" @close="reminderDialogVisible= false" width="830px" :close-on-click-modal="false">
      <div class="send-dialog">
        <div class="send-item">
          <label class="title red-tip">督办建议：</label>
          <label class="content" style="width: 614px;">
            <el-input type="textarea" :rows='6' v-model="supervisionOpinion" ></el-input>
          </label>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reminderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reminder">确 定</el-button>
      </div>
    </el-dialog>
    <!--处置弹窗-->
    <el-dialog title="处置工单" :visible.sync="disposeDialogVisible" @close="disposeDialogVisible= false" width="830px">
      <div class="send-dialog">
        <div class="send-item">
          <label class="title red-tip">处置描述：</label>
          <label class="content" style="width: 614px;">
            <el-input type="textarea" rows='6' v-model="disposeContent" ></el-input>
          </label>
        </div>
        <div class="send-item">
          <label class="title">处置模板：</label>
          <label class="content">
            <el-select v-model="disposeTemplate" @change="disposeTemplateChange()" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in templateOptions"
                :key="index"
                :label="item.name"
                :value="index">
              </el-option>
            </el-select>
          </label>
        </div>
        <div class="send-item">
          <label :class="['title', disposalRequirements ? 'red-tip' : '']">处置凭证：</label>
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
            <el-dialog title="图片预览"  :visible.sync="uploadDialogVisible" size="tiny" @close="uploadDialogVisible= false" :modal="false" :modal-append-to-body='false'>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disPoseHandleCancle">取 消</el-button>
        <el-button type="primary" @click="disposeHandleConfim">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrderOperate',
  props: ['buttonType', 'operationResultName', 'dataLevel', 'dataType', 'disposalRequirements', 'hiddenOta', 'cancelSenFlag'],
  data() {
    return {
      cancelSenDialogVisible: false, // 取消敏感工单弹窗
      cancelDialogVisible: false, // 撤销工单弹窗标识
      refuseDialogVisible: false, // 拒绝退回工单弹窗标识
      reminderDialogVisible: false, // 督办提醒弹窗标识
      uploadDialogVisible: false, // 上传提醒弹窗标识
      supervisionOpinion: null, // 督办建议
      disposeDialogVisible: false, // 处置弹窗标识
      disposeContent: null, // 处置描述
      action: process.env.VUE_APP_API_URL + '/yq/upload', // 上传链接
      dialogImageUrl: null, // 预览图片链接
      fileList: [], // 上传文件列表
      disposeUrl: null,
      disposeParam: {},
      disposeTemplate: null, // 处置模板内容
      templateOptions: null
    }
  },
  methods: {
    disposeTemplateChange() {
      console.log(this.disposeTemplate)
      this.disposeContent = this.templateOptions[this.disposeTemplate].content
    },
    getDisposeTemplate() {
      this.$http.get('/yq/template/1/100').then(res => {
        if (Number(res.data.code) === 0) {
          this.templateOptions = res.data.data.templateList
        }
      })
    },
    uploadSuccess(res, file, fileList) {
      if (Number(res.errorcode) === 0) {
        let imageUrl = res.data.image_url
        this.fileList.push(imageUrl)
      }
    },
    handleRemove(file, fileList) {
      let index = this.fileList.indexOf(file.url)
      this.fileList.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.uploadDialogVisible = true
    },
    // 分发
    send (agreeAndSend) {
      this.$emit('send', agreeAndSend)
    },
    forWardOta() {
      this.$emit('forWardOta')
    },
    // 通过并再次分发
    agree() {
      this.send(true)
    },
    // 通过且不再分发
    agreeNotSend() {
      this.$http.post('/yq/agreeNotSend', {
        dataId: this.$parent.dataId,
        procedureId: this.$parent.procedureId
      }).then(res => {
        console.log(res)
        this.$message(res.data.msg)
        this.$router.go(-1)
      })
    },
    // 撤销工单弹窗展示
    cancelOrderDialogShow() {
      this.cancelDialogVisible = true
    },
    // 撤销工单
    cancelOrder () {
      this.$http.post('/yq/cancel', {
        dataId: this.$parent.dataId,
        type: this.$parent.type
      }).then(res => {
        this.cancelDialogVisible = false
        this.$message(res.data.msg)
        this.$router.go(-1)
      })
    },
    returnOrder () {
      this.$emit('returnOrder')
    },
    // 拒绝退回工单弹窗展示
    refuseDialogShow() {
      this.refuseDialogVisible = true
    },
    // 拒绝退回工单
    refuseRetreat() {
      this.$http.post('/yq/refuseRetreat', {
        dataId: this.$parent.dataId,
        type: this.$parent.type,
        procedureId: this.$parent.procedureId
      }).then(res => {
        this.refuseDialogVisible = false
        this.$message(res.data.msg)
        this.$router.go(-1)
      })
    },
    // 取消敏感弹窗展示
    cancelSenDialogShow() {
      this.cancelSenDialogVisible = true
    },
    // 取消敏感
    cancelSenConfirm() {
      this.$http.post('/yq/wx_cancelSen', {
        id: this.$parent.dataId
      }).then(res => {
        if (Number(res.data.errorcode) === 0) {
          this.$emit('cancelSenFlagChange')
        }
        this.cancelSenDialogVisible = false
        this.$message(res.data.msg)
      })
    },
    reminderShow () {
      this.reminderDialogVisible = true
    },
    reminder() {
      if (window.Bee.StringUtils.isEmpty(this.supervisionOpinion)) {
        this.$message.error('请输入督办建议')
        return
      }
      this.$http.post('/yq/webdatadetail/reminder', {
        dataId: this.$parent.dataId,
        supervisionOpinion: this.supervisionOpinion
      }).then(res => {
        this.reminderDialogVisible = false
        this.$message(res.data.msg)
        this.$router.go(-1)
      })
    },
    // 处置弹窗展示
    dispose () {
      this.disposeUrl = '/yq/webdatadetail/update'
      this.disposeDialogVisible = true
    },
    // 补充处置弹窗展示
    supplement () {
      this.disposeUrl = '/yq/supplement'
      this.disposeDialogVisible = true
    },
    // 处置弹窗关闭
    disPoseHandleCancle() {
      this.disposeDialogVisible = false
      this.$refs.upload.clearFiles()
    },
    // 处置
    disposeHandleConfim () {
      if (window.Bee.StringUtils.isEmpty(this.disposeContent)) {
        this.$message.error('请输入处置描述')
        return
      }
      if (this.fileList.length === 0 && this.disposalRequirements) {
        this.$message.error('请上传处置凭证')
        return
      }
      this.$http.post(this.disposeUrl, {
        dataId: this.$parent.dataId,
        type: this.$parent.type,
        disposeContent: this.disposeContent,
        disposeHappening: this.disposeContent,
        uploaded_image: this.fileList
      }).then(res => {
        this.disposeDialogVisible = false
        this.$message(res.data.msg)
        this.$router.go(-1)
      })
    }
  },
  mounted() {
    this.getDisposeTemplate()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  .order-distribution
    margin-right: 24px!important;
    yqLevel($orderDistribution);
    cursor: pointer;
  .order-undo
    yqLevel($yqSensitive);
    cursor: pointer;
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
        white-space: nowrap;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        /*margin-right: 26px;*/
        display: inline-block;
        width: 120px;
      .red-tip
        &::before
          display inline-block;
          content: '*';
          color #f33;
          vertical-align: sub;
          position absolute;
          transform: translate(-200%,11%);
</style>
