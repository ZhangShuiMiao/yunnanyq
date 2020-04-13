<template>
  <div class="loading-warp">
    <div class="wave">
    </div>
    <div class="center-loader">
      <!--<div class="loader loader-1">-->
        <!--<div class="loader-outter"></div>-->
        <!--<div class="loader-inner"></div>-->
      <!--</div>-->
      <div class="title">
        加载中
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      mobile: ''
    }
  },
  computed: mapState('login', ['userMobile']),
  methods: {
    ...mapActions('login', ['setAccountMobile', 'setPermission']),
    geAccountPhone() {
      let that = this
      return new Promise((resolve, reject) => {
        that.$http.get('/yq/sentimentPortal/entrance')
          .then(res => {
            console.log(res)
            let data = res.data.data
            that.setAccountMobile(data.UserInfo.UserMobile)
            resolve()
          })
      }).catch((reason) => console.log(reason))
    },
    hasPermission(mobile) {
      let that = this
      return new Promise((resolve, reject) => {
        let url = '/yq/sentimentPortal/checkSentimentPermission?mobile=' + mobile
        that.$http.get(url)
          .then(res => {
            console.log(res)
            var data = res.data.data
            that.setPermission(data)
            if (data) {
              that.$router.replace('/')
            }
            resolve()
          })
      }).catch((reason) => console.log(reason))
    },
    async loginAndForward() {
      await this.geAccountPhone()
      this.hasPermission(this.userMobile)
    }
  },
  created() {
    this.loginAndForward()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/styles/common.styl";
.loading-warp
  background: #000;
  box-sizing: border-box;
  .wave
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    width 200px;
    height 200px;
    background: #080915;
    border-radius: 50%;
    box-shadow: 0px 0px 30px 1px #00a67c inset;
    animation: ripple 2s infinite;
    overflow: hidden;
    &::after
      content: "";
      position: absolute;
      opacity: 0;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      transform: translate(-50%,-50%);
      /*border: #103136 5px solid;*/
      box-shadow: 0px 0px 30px 1px #00a67c inset;
      animation: ripple-2 2s infinite;
      @keyframes ripple
        0%
          opacity: 1;
        100%
          opacity: 0.5;
          width: 600px;
          height: 600px;
      @keyframes ripple-2
        0%
          opacity: 1;
        100%
          opacity: 0.5;
          width: 200px;
          height: 200px;
  .center-loader
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    width: 200px;
    height: 200px;
    flexCenter();
    .title
      font-size:20px;
      letter-spacing 10px;
      color:#fff;
      animation: Glow 2s ease infinite alternate;
      @keyframes Glow
        from
          opacity: 0.8;
          text-shadow: 0 0 10px #fff,
          0 0 20px #fff,
          0 0 30px #fff,
          0 0 40px #fff,
          0 0 70px #fff,
          0 0 80px #00a67c,
          0 0 100px #00a67c,
          0 0 150px #00a67c;
        to
          opacity: 0.6;
          text-shadow: 0 0 5px #fff,
          0 0 10px #fff,
          0 0 15px #fff,
          0 0 20px #fff,
          0 0 35px #fff,
          0 0 40px #00a67c,
          0 0 50px #00a67c,
          0 0 75px #00a67c;
    .loader
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: 75px;
      display: inline-block;
      vertical-align: middle;
    .loader-outter
      position: absolute;
      border: 4px solid #f50057;
      border-left-color: transparent;
      border-bottom: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: loader-1-outter 1s cubic-bezier(.42, .61, .58, .41) infinite;
      @keyframes loader-1-outter
        0%
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        100%
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
    .loader-inner
      position: absolute;
      border: 4px solid #f50057;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      left: calc(50% - 20px);
      top: calc(50% - 20px);
      border-right: 0;
      border-top-color: transparent;
      animation: loader-1-inner 1s cubic-bezier(.42, .61, .58, .41) infinite;
      @keyframes loader-1-inner
        0%
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        100%
          -webkit-transform: rotate(-360deg);
          transform: rotate(-360deg);
</style>
