import Vue from 'vue'
export default {
  onScrollTop: function() {
    Vue.nextTick(function () {
      let container = document.querySelector('#scrollContent').querySelector('.el-scrollbar__wrap')
      container.scrollTop = 0
    })
  },
  commonShortcuts: [{
    text: '今天',
    onClick(picker) {
      const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + (24 * 60 * 60 * 1000) - 1)
      const start = new Date(new Date().toLocaleDateString())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '近7天',
    onClick(picker) {
      const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + (24 * 60 * 60 * 1000) - 1)
      const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 6 * 24 * 60 * 60 * 1000)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '近30天',
    onClick(picker) {
      const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + (24 * 60 * 60 * 1000) - 1)
      const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 29 * 24 * 60 * 60 * 1000)
      picker.$emit('pick', [start, end])
    }
  }]
}
