<template>
  <el-dialog title="新增舆情工单" :visible.sync="dialogVisible" @close="handleCancel" width="700px" :close-on-click-modal="false">
    <el-form :model="form" ref="form" :rules="rules" label-position="left"  label-width="100px" size="medium">
      <el-row>
        <el-col :span="11" >
          <el-form-item label="舆情类别"  prop="pushCategory">
            <el-select v-model="form.pushCategory" placeholder="请选择舆情类别">
              <el-option label="购物" value="1"></el-option>
              <el-option label="导游" value="2"></el-option>
              <el-option label="旅行社" value="3"></el-option>
              <el-option label="交通" value="4"></el-option>
              <el-option label="景区" value="5"></el-option>
              <el-option label="旧闻" value="6"></el-option>
              <el-option label="低价游" value="7"></el-option>
              <el-option label="治安" value="8"></el-option>
              <el-option label="餐饮" value="9"></el-option>
              <el-option label="住宿" value="10"></el-option>
              <el-option label="其他" value="99"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" >
          <el-form-item label="舆情级别"  prop="pushDegree">
            <el-select v-model="form.pushDegree" placeholder="请选择舆情级别">
              <el-option label="一般舆情" value="1"></el-option>
              <el-option label="敏感舆情" value="8"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="来源类型" prop="sourceType">
        <el-radio-group v-model="form.sourceType">
          <el-radio :label="1">新闻</el-radio>
          <el-radio :label="16">论坛</el-radio>
          <el-radio :label="1048576">微博</el-radio>
          <el-radio :label="268435456">微信</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-input type="text" v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" prop="publishTime">
        <el-date-picker style="width: 100%;"
          v-model="form.publishTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择发布时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="正文" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="作者" >
        <el-input type="text" v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="原文链接" >
        <el-input type="text" v-model="form.sourceUrl"></el-input>
      </el-form-item>
      <el-form-item label="转发量" >
        <el-input-number :min="0"  controls-position="right" v-model="form.forwardCount"></el-input-number>
      </el-form-item>
      <el-form-item label="评论量">
        <el-input-number :min="0"  controls-position="right" v-model="form.commentCount"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary"  @click="handelConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateDialog',
  props: ['dialogFormVisible'],
  data () {
    return {
      form: {
        pushCategory: '',
        pushDegree: '',
        sourceType: '',
        title: '',
        content: '',
        publishTime: '',
        author: '',
        sourceUrl: '',
        source: '',
        forwardCount: 0,
        commentCount: 0,
        sectionNames: ''
      },
      rules: {
        pushCategory: [
          { required: true, message: '请选择舆情类型', trigger: 'blur' }
        ],
        pushDegree: [
          { required: true, message: '请选择舆情级别', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请输入来源', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请输入来源类型', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        publishTime: [
          { required: true, message: '请输入发布时间', trigger: 'blur' }
        ],
      },
      dialogVisible: this.dialogFormVisible
    }
  },
  watch: {
    dialogFormVisible: function(val) {
      this.dialogVisible = val
      this.resetForm()
    }
  },
  methods: {
    handelConfirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.handleCancel()
          this.$emit('dialogConfirm', this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    handleCancel() {
      this.$emit('handleCancel')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
  clearFix
    clearFix()
</style>
