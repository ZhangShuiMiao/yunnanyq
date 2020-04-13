<template>
  <div class="table-warp">
    <main-top>处置模板</main-top>
    <span class="crsbtn" @click="addDispose">新建模板</span>
    <el-card>
      <el-table
        :data="disposeList"
        style="width: 100%"
        :header-cell-style="{ background: '#9DC2F2', height: '62px', color: '#fff' }"
        :row-style="{ height: '95px', color: '#666' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" label="ID" align="center" width="150%"></el-table-column>
        <el-table-column prop="name" label="模板名称" align="center" width="200%"></el-table-column>
        <el-table-column prop="content" label="模板内容" align="center">
          <template slot-scope="scope">
            <el-tooltip placement="top" effect="light" :open-delay='Number(300)'>
              <div slot="content" style="width:500px ;font-size:16px;line-height:180%;text-align:center">{{ scope.row.content }}</div>
              <div class="name-wrapper">
                {{ scope.row.content }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="200%"></el-table-column>
        <el-table-column label="操作" align="center" width="200%">
          <template slot-scope="scope">
            <span @click="editDispose(scope.row)" class="svgBtn">
              <svg-icon icon-class="edit-square"></svg-icon>
            </span>
            <span @click="deleteDispose(scope.row.id)" class="svgBtn">
              <svg-icon icon-class="delete"></svg-icon>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <common-pagination :pagination="pagination" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"></common-pagination>
    <el-dialog :title="status === 0 ? '新建模板' : '编辑模板'" :visible.sync="dialogVisible" width="50%" @close="handleClose()" :close-on-click-modal="bol">
      <el-form :model="addDisposeForm" :rules="addDisposeRule" ref="addDisposeForm" label-width="100px">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="addDisposeForm.name" placeholder="请输入模板名称" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="模板内容" prop="content">
          <el-input v-model="addDisposeForm.content" placeholder="请输入模板内容" type="textarea" maxlength="300" show-word-limit rows="6"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="dioBtn">
            <el-button @click="qsDioag('addDisposeForm')">取 消</el-button>
            <el-button type="primary" @click="aeDispose('addDisposeForm')">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import MainTop from '@/components/MainTop'
import CommonPagination from '@/components/CommonPagination'
export default {
  name: 'index',
  components: {
    MainTop,
    CommonPagination
  },
  data() {
    return {
      bol: false,
      pagination: {
        current_page: 1,
        page_size: 10,
        total: 1
      },
      disposeList: [],
      dialogVisible: false,
      status: '' /* 判断模态框 */,
      addDisposeForm: {
        id: '',
        name: '',
        content: ''
      },
      addDisposeRule: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' },
          { min: 1, max: 20, message: '最多输入20个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入模板内容', trigger: 'blur' },
          { max: 300, message: '最多输入300个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* 行颜色隔行变色 */
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    async getDisposeList() {
      const { data: res } = await this.$http.get(`/yq/template/${this.pagination.current_page}/${this.pagination.page_size}`)
      console.log(res)
      this.pagination.total = res.data.pagination.total
      console.log(this.pagination)
      this.disposeList = res.data.templateList
    },
    handleClose() {
      /* 关闭模态框 */
      this.qsDioag('addDisposeForm')
    },
    /* 打开新增框 */
    addDispose() {
      this.addDisposeForm.name = ''
      this.addDisposeForm.content = ''
      this.dialogVisible = true
      this.status = 0
    },
    qsDioag(addDisposeForm) {
      this.dialogVisible = false
      this.$refs[addDisposeForm].resetFields()
    },
    editDispose(editList) {
      /* 修改模块 */
      console.log(editList)
      this.dialogVisible = true
      this.status = 1
      this.addDisposeForm.id = editList.id
      this.addDisposeForm.name = editList.name
      this.addDisposeForm.content = editList.content
    },
    pageSizeChange(val) {
      this.pagination.page_size = val
      this.pagination.current_page = 1
      this.getDisposeList()
    },
    currentPageChange(val) {
      this.pagination.current_page = val
      this.getDisposeList()
    },
    /* 新增和更新 */
    aeDispose(addDisposeForm) {
      if (this.addDisposeForm.name.trim().length === 0 || this.addDisposeForm.content.trim().length === 0) {
        if (this.addDisposeForm.name.trim().length === 0) {
          this.addDisposeForm.name = ''
          this.$refs.addDisposeForm.validateField('name')
        }
        if (this.addDisposeForm.content.trim().length === 0) {
          this.addDisposeForm.content = ''
          this.$refs.addDisposeForm.validateField('content')
        }
        return
      }

      if (this.status === 0) {
        /* console.log('新增') */
        const ames = '新增模板成功'
        const addObj = {
          name: this.addDisposeForm.name,
          content: this.addDisposeForm.content
        }
        this.aeDisposeMd(addDisposeForm, '/yq/saveTemplate', addObj, ames)
        this.pagination.current_page = 1
      } else {
        /*
         */
        const emes = '更新模板成功'
        this.aeDisposeMd(addDisposeForm, '/yq/updateTemplate', this.addDisposeForm, emes)
      }
      this.dialogVisible = false
      this.getDisposeList()
      this.$refs[addDisposeForm].resetFields()
    },
    /* 封装增加更新方法 */
    aeDisposeMd(addDisposeForm, url, obj, mes) {
      this.$refs[addDisposeForm].validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(url, obj)
          /* console.log(res.message) */
          if (res.code !== '0') {
            return false
          }
          this.$message({ message: mes, type: 'success' })
        } else {
          return false
        }
      })
    },
    /* 删除模板 */
    deleteDispose(id) {
      this.$confirm('是否删除该处置模版内容?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(async () => {
        const { data: res } = await this.$http.get('yq/deleteTemplate/' + id)
        /*  console.log(res,"处置删除"); */
        if (res.code !== '0') {
          return false
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getDisposeList()
      })
    }
  },
  created() {
    this.getDisposeList()
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/styles/common.styl';

.crsbtn
  display block;
  margin 20px;
  width 74px;
  height 32px;
  background rgba(50, 133, 241, 1);
  border-radius 4px;
  font-size 14px;
  line-height 32px;
  color #fff;
  text-align center;
  font-weight 500
  cursor pointer

.el-card
  margin 0 20px;

.table-warp >>> .el-card__body
                  padding 0 !important ;

.el-form-item
  margin-top 20px

.dioBtn
  margin-top 20px
  text-align right

.name-wrapper
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
.svgBtn
  display inline-block;
  margin 0 15px

.table-warp >>> .el-table .warning-row
                  background  #fff;


.table-warp >>> .el-table .success-row
                  background: #f2f2f2;

.table-warp >>> .el-dialog__title
                  font-size 16px
                  color #333333

.table-warp >>> .el-textarea .el-input__count
                  bottom -42px;
</style>
