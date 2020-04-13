<template>
  <el-dialog title="推送舆情工单" :visible.sync="dialogVisible" width="406px" @close="handleCancel" :close-on-click-modal="false">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="舆情类别" prop="pushCategory">
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
      <el-form-item label="舆情级别" prop="pushDegree">
        <el-select v-model="form.pushDegree" placeholder="请选择舆情级别">
          <el-option label="一般舆情" value="1"></el-option>
          <el-option label="敏感舆情" value="8"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handelConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'PushDialog',
  props: ['dialogFormVisible'],
  data() {
    return {
      form: {
        pushCategory: '',
        pushDegree: ''
      },
      rules: {
        pushCategory: [{ required: true, message: '请选择舆情类型', trigger: 'blur' }],
        pushDegree: [{ required: true, message: '请选择舆情级别', trigger: 'blur' }]
      },
      dialogVisible: this.dialogFormVisible
    }
  },
  watch: {
    dialogFormVisible: function(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    handelConfirm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
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
      this.resetForm()
      this.$emit('handleCancel')
    }
  }
}
</script>

<style scoped></style>
