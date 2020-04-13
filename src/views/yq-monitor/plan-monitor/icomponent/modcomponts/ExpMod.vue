<template>
  <div>
    <el-form ref="simForm" :model="simForm" :rules="simFormRules" label-width="100px">
      <el-form-item label="方案名称:" prop="expertName">
        <el-input v-model="simForm.expertName" placeholder="请输入方案名称"></el-input>
      </el-form-item>
      <el-form-item label="方案关键词:" prop="areaWord">
        <el-input type="textarea" :rows="8" v-model="simForm.areaWord" placeholder="请输入方案关键词的表达式， 如 “天津|北京+演戏”"></el-input>
      </el-form-item>
      <div class="btnIpt">
        <div>
          <span class="fontSpan" @click="addFont('+')"> + (与)</span><span class="fontSpan" @click="addFont('|')"> | (或)</span> <span class="fontSpan" @click="addFont('(')">(</span>
          <span class="fontSpan" @click="addFont(')')">)</span>
        </div>
      </div>
      <div class="fontIpt">
        <span> 字数限制:{{ simForm.notWord.trim().length }}/1000</span>
      </div>
      <el-form-item label="方案排除词:" prop="notWord">
        <el-input type="textarea" :rows="8" v-model="simForm.notWord" placeholder="请输入方案排除词"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button type="primary" @click="downLoad('simForm')">保存</el-button>
          <el-button type="info" plain @click="goBack">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['list'],
  name: 'index',
  data() {
    return {
      simForm: { id: '', expertName: '', areaWord: '', modeType: 2, expertBegDate: '', expertEndDate: '', expertWord: '', notWord: '' },
      simFormRules: {
        expertName: [
          { required: true, message: '请输入方案名称', trigger: 'blur' },
          { max: 1000, message: '不能多于1000 个字符', trigger: 'blur' }
        ],
        areaWord: [{ max: 1000, message: '不能多于1000 个字符', trigger: 'blur' }],
        notWord: [{ max: 1000, message: '不能多于1000 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    /* 更新方案 */
    downLoad(formName) {
      if (this.simForm.expertName.trim().length === 0) {
        this.simForm.expertName = ''
        this.$refs.simForm.validateField('expertName')
        return
      }
      // console.log('保存')
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$ynHttp.post('/scheme/addScheme', this.simForm).then(res => {
            if (!res.data.isSuccess) {
              return false
            }
            console.log('保存成功')
            this.goBack()
          })
        } else {
          return false
        }
      })
    },
    /* 添加符号 */
    addFont(str) {
      console.log('add')
      this.simForm.areaWord += str
    },
    /* 返回信息列表 */
    goBack() {
      this.$bus.$emit('chooseId')
    }
  },
  watch: {
    list: {
      handler(newName, oldName) {
        this.simForm.id = this.list.id
        this.simForm.expertBegDate = this.list.begDate
        this.simForm.expertEndDate = this.list.endDate
        this.simForm.expertWord = this.list.andWord
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$bus.$on('change', () => {
      if (this.$refs.simForm !== undefined) {
        this.$refs.simForm.resetFields()
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.fontSpan
  display inline-block;
  width 80px;
  height 24px;
  background rgba(50,133,241,1);
  border-radius 4px;
  color #fff;
  line-height 24px;
  font-size 16px;
  text-align center;
  margin-right 16px;
  font-weight 500;
  margin-top 5px
.btn
  text-align center;
  padding-bottom 60px
.fontIpt
  margin-top 5px
  color #999;
  font-size 14px;
  text-align right
.el-button
  width 74px;
  margin-top 32px;
.btnIpt
  text-align left
  padding-left 100px
  padding-top 10px
.el-form-item
 margin-top 30px;
</style>
