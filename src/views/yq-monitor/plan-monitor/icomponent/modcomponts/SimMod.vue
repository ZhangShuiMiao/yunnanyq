<template>
  <div>
    <el-form ref="simForm" :model="simForm" :rules="simFormRules" label-width="100px">
      <el-form-item label="方案名称:" prop="name">
        <el-input v-model="simForm.name" placeholder="请输入监测方案名称" maxlength="20"></el-input>
      </el-form-item>
      <div class="btnIpt">
        <!-- <div><span class="fontSpan" @click="addFont('expertName', '+')">与</span><span class="fontSpan" @click="orFont('expertName', '|')">或</span></div> -->
        <div class="fontIpt">地理、主体、事件3类关键词为"与"关系,字数限制:{{ totalLength }}/1000</div>
      </div>
      <el-form-item label="地理关键词:" prop="areaWord">
        <el-input type="textarea" :rows="3" v-model="simForm.areaWord" placeholder="请输入地理关键词，各词之间用空格隔开，如“北京 天津”" maxlength="1000"></el-input>
      </el-form-item>
      <!-- <div class="btnIpt">
        <div><span class="fontSpan" @click="addFont('areaWord', '+')">与</span><span class="fontSpan" @click="orFont('areaWord', '|')">或</span></div>
        <div class="fontIpt">字数限制:{{ simForm.areaWord.trim().length }}/1000</div>
      </div> -->
      <el-form-item label="主体关键词:" prop="andWord">
        <el-input type="textarea" v-model="simForm.andWord" :rows="3" placeholder="请输入主体关键词，各词之间用空格隔开，如“老板 格力”" maxlength="1000"></el-input>
      </el-form-item>
      <!--  <div class="btnIpt">
        <div><span class="fontSpan" @click="addFont('andWord', '+')">与</span><span class="fontSpan" @click="orFont('andWord', '|')">或</span></div>
        <div class="fontIpt">字数限制:{{ simForm.andWord.trim().length }}/1000</div>
      </div> -->
      <el-form-item label="事件关键词:" prop="orWord">
        <el-input type="textarea" v-model="simForm.orWord" :rows="3" placeholder="请输入事件关键词，各词之间用空格隔开，如“促销 违章”" maxlength="1000"></el-input>
      </el-form-item>

      <div class="btnIpt">
        <!--  <div><span class="fontSpan" @click="addFont('orWord', '+')">与</span><span class="fontSpan" @click="orFont('orWord', '|')">或</span></div> -->
        <div class="fontIpt">字数限制:{{ notTotal }}/1000</div>
      </div>
      <el-form-item label="排除关键词:" prop="notWord">
        <el-input type="textarea" v-model="simForm.notWord" :rows="3" placeholder="请输入需要排除的关键词" maxlength="1000"></el-input>
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
      simForm: { id: '', name: '', areaWord: '', andWord: '', orWord: '', notWord: '', modeType: 1, BegDate: '', EndDate: '' },
      simFormRules: {
        name: [
          { required: true, message: '请输入方案名称', trigger: 'blur' },
          { max: 20, message: '不能多于20 个字符', trigger: 'blur' }
        ],
        areaWord: [{ max: 1000, message: '地理、主体、事件3类关键词总共不能多于1000 个字符', trigger: 'blur' }],
        andWord: [{ max: 1000, message: '地理、主体、事件3类关键词总共不能多于1000 个字符', trigger: 'blur' }],
        orWord: [{ max: 1000, message: '地理、主体、事件3类关键词总共不能多于1000 个字符', trigger: 'blur' }],
        notWord: [{ max: 1000, message: '地理、主体、事件3类关键词总共不能多于1000个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    /* 保存方案 */
    downLoad(formName) {
      console.log(this.totalLength)
      if (this.totalLength > 1000 || this.simForm.name.trim().length === 0) {
        if (this.simForm.name.trim().length === 0) {
          this.simForm.name = ''
          this.$refs.simForm.validateField('name')
        } else {
          this.$message.error('地理、主体、事件3类关键词总共不能多于1000 个字符')
        }

        return
      }
      /* return */
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$ynHttp.post('/scheme/addScheme', this.simForm).then(res => {
            if (!res.data.isSuccess) {
              return false
            }
            console.log(res)
            this.goBack()
          })
        } else {
          return false
        }
      })
    },

    /* 添加+ */
    /*  addFont(name, str) {
      this.orAdd(name, str)
    }, */
    /*  orFont(name, str) {
      this.orAdd(name, str)
    }, */
    /* 封装判断+和| */
    /* orAdd(name, str) {
      switch (name) {
        case 'expertName':
          this.simForm.name += str
          break
        case 'areaWord':
          this.simForm.areaWord += str
          break
        case 'andWord':
          this.simForm.andWord += str
          break
        case 'orWord':
          this.simForm.orWord += str
          break
      }
    }, */
    /* 返回信息列表 */
    goBack() {
      /* console.log('bb'); */
      this.$bus.$emit('chooseId')
    }
  },
  watch: {
    list: {
      handler(newName, oldName) {
        if (this.$refs.simForm !== undefined) {
          this.$refs.simForm.resetFields()
        }
        this.simForm.id = this.list.id
        this.simForm.name = this.list.name
        this.simForm.areaWord = this.list.areaWord
        this.simForm.andWord = this.list.andWord
        this.simForm.notWord = this.list.notWord
        this.simForm.orWord = this.list.orWord
        this.simForm.BegDate = this.list.begDate
        this.simForm.EndDate = this.list.endDate
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    /* 排除关键词字长度 */
    notTotal() {
      console.log(this.simForm.notWord)
      if (this.simForm.notWord !== undefined) {
        return this.simForm.notWord.trim().length
      }
      return false
    },

    /* 计算字数总数 */
    totalLength() {
      if (this.simForm.areaWord !== undefined) {
        return this.simForm.areaWord.trim().length + this.simForm.andWord.trim().length + this.simForm.orWord.trim().length
      }
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
.fontSpan
  display inline-block;
  width 54px;
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
  padding-bottom 70px
.el-button
  width 74px;
  margin-top 32px;
.btnIpt
  text-align right
  margin-top 30px
  color #999;
  font-size 14px;
;
</style>
