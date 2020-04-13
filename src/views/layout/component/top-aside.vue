<template>
    <aside class="aside__top">
      <div class="top-left">
        <i class="logo"></i>
        <h3>舆情分析管理平台</h3>
      </div>
        <span
            class="iconfont icon-nav toggleNavCollapse"
            :class="{active:isSidebarNavCollapse}"
            @click="toggleNavCollapse"
        >
        </span>
      <i class="el-icon-s-fold" v-show="!isSidebarNavCollapse" @click="toggleNavCollapse"></i>
      <i class="el-icon-s-unfold"  v-show="isSidebarNavCollapse" @click="toggleNavCollapse"></i>
        <!--<div class="aside__top&#45;&#45;right">-->
            <!--<div class="user-msg">-->
                <!--<img class="user-img" :src="avatar" alt="">-->
                <!--<span class="user-name">{{account}}</span>-->
                <!--<el-dropdown trigger="click" placement="top">-->
                    <!--<span class="el-dropdown-link">-->
                        <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                    <!--</span>-->
                    <!--<el-dropdown-menu slot="dropdown">-->
                        <!--<el-dropdown-item>个人中心</el-dropdown-item>-->
                        <!--<el-dropdown-item>修改密码</el-dropdown-item>-->
                    <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
            <!--</div>-->
            <!--<div class="quit-system" @click="loginOut">-->
                <!--<span class="iconfont icon-quit"></span>-->
            <!--</div>-->
        <!--</div>-->
    </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'top-aside',
  data() {
    return {}
  },
  computed: {
    ...mapState(['isSidebarNavCollapse', 'crumbList']),
    ...mapState('permission', ['avatar', 'account'])
  },
  methods: {
    ...mapActions('login', ['loginOut']),
    toggleNavCollapse() {
      this.$store.commit('toggleNavCollapse')
    },
    loginOut() {
      this.loginOut()
      /* 防止切换角色时addRoutes重复添加路由导致出现警告 */
      window.location.reload()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/styles/varibles.styl";
.aside__top
    height: $topAsideHeight;
    line-height: $topAsideHeight;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background: #262626;
    z-index: 1000;
    transition: left 0.25s;
    color:#fff;
    i
      font-size: 28px;
      vertical-align: middle;
    .top-left
      float:left;
      box-sizing border-box;
      padding-left 20px;
      line-height 0;
      margin-top 5px;
      .logo
        display inline-block;
        height:40px;
        width 40px;
        vertical-align: middle
        background: url('~@/assets/images/yyn-logo.png') no-repeat center/contain;
      h3
        display:inline-block;
        font-size 18px;
        font-weight 500;
        margin-left 20px;
        vertical-align: middle
    .toggleNavCollapse
        display: inline-block;
        margin-left: 8px;
        padding: 0 10px;
        font-size: 26px;
        vertical-align: middle;
        color: #333;
        cursor: pointer;
        transition: all 0.5s;
        &.active
            transform: rotate(90deg);
    .aside__top--right
        position: absolute;
        right: 10px;
        top: -1px;
        bottom: 0px;
        > div
            position: relative;
            display: inline-block;
            text-align: center;
            vertical-align: middle;
            margin-left: 10px;
            padding: 0 15px;
            cursor: pointer;
            &:hover::after
                transform-origin: 0 0;
                transform: scaleX(1);
            &:first-child:before
                border: none;
            &::after
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: #ef4747;
                transform: scaleX(0);
                transform-origin: right 0;
                transition: transform 0.5s
            &::before
                content: '';
                position: absolute;
                height: 20px;
                top: 50%;
                left: -8px;
                margin-top: -10px;
                border-left: 1px solid #ccc;
            &.email
                i
                    position: absolute;
                    left: 18px;
                    top: -12px;
                    border-radius: 20px;
                    background: red;
                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                    line-height: 1.5;
                    min-width: 20px;
                    min-height: 20px;
            &.user-msg
                .user-img
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    vertical-align: middle;
                .user-name
                    color: #758eb5;
                    padding: 0 4px;
            .iconfont
                position: relative;
                font-size: 24px;
                color: #758eb5;
.breadcrumb-enter,
.breadcrumb-leave-active
    opacity: 0;
    transform: translateX(20px);

.breadcrumb-enter-active,
.breadcrumb-leave-active
    transition: all 0.6s;

.breadcrumb-leave-active
    position: absolute;
</style>
