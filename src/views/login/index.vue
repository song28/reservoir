<template>
  <div class="login-container">
    <template v-if="!show">加载中...</template>
    <template v-if="show">
      <div class="bg-div" />
      <div class="bg-title">{{ title }}</div>
      <div class="englistName">
        Reservoir&emsp;safety&emsp;monitoring&emsp;and&emsp;early&emsp;warning&emsp;system
      </div>
      <div class="login-body">
        <div class="loginTitle">
          欢迎登录
          <!--<lang-select class="set-language"/>-->
        </div>
        <div class="loginForm">
          <el-form
            ref="loginForm"
            label-position="right"
            :model="loginForm"
            class="demo-ruleForm"
            @keyup.enter.native="handleLogin()"
          >
            <el-form-item prop="username" class="mt-3">
              <img src="@/assets/images/login/login_user.png">
              <el-input
                ref="username"
                v-model="loginForm.username"
                type="text"
                :placeholder="$t('login.placeUser')"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item prop="password">
              <img src="@/assets/images/login/login_key.png">
              <el-input
                ref="password"
                v-model="loginForm.password"
                type="password"
                show-password
                :placeholder="$t('login.palcePass')"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                v-model="loginForm.code"
                placeholder="请输入图形验证码"
                size="mini"
              />
            </el-form-item>
            <el-form-item
              label=""
              prop="code"
              style="margin: 0rem 0.2rem 0.4rem 0.2rem !important"
            >
              <el-image
                style="width: 180px; height: 100px"
                :src="imgCode"
                fit="contain"
                @click="verifyCode"
              />
            </el-form-item>
            <!--<el-form-item prop="mobileCode">-->
            <!--<div class="captcha-wrap el-form-item">-->
            <!--<img src="@/assets/images/login/login_verification_code.png">-->
            <!--<el-input :placeholder="$t('login.palceCode')" v-model="loginForm.codeNumber" ref="code"></el-input>-->
            <!--<div class="captcha-img">-->
            <!--<img @click="getCaptchaCode" :src="captchaUrl" class="captcha">-->
            <!--</div>-->
            <!--</div>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-button type="primary" class="login-btn" @click="handleLogin">{{
                $t("login.login")
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="login-fixed">
        北京国信华源科技有限公司 &nbsp;&nbsp; 京ICP备10208148号-1
      </div>
    </template>
  </div>
</template>

<script>
import router from '../../router'

import {validUsername} from '@/utils/validate'
// import LangSelect from '@/components/LangSelect'
// import settings from '@/settings'
import {setConstant} from '@/utils/constant.js'
import {login, logout, getInfo, getcaptchasUrl, verifyCode} from '@/api/user'
import {
  getToken,
  setToken,
  getUserInfo,
  setUserInfo,
  setVerifyCode,
  getRscdInfo
} from '@/utils/auth'
const defaultSettings = require('@/settings.js')
import {mapMutations} from 'vuex'
import store from '../../store'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      show: true,
      imgCode: '',
      title: defaultSettings.title,
      baseCaptchaUrl: getcaptchasUrl(),
      captchaUrl: getcaptchasUrl(),
      activeName: '2', // 默认显示登录
      loginForm: {
        username: '',
        password: '',
        code: '',
        key: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}],
        code: [{required: true, trigger: 'blur'}]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  async created() {
    /**
     * Auth2.0的引入，需要先查询后端服务器的登录信息
     */
    this.postLogin()
  },
  /**
   * token         token值
   * userInfo      用户信息
   * rsInfo        水库信息
   * getVerifyCode key
   */
  async mounted() {
    const token = this.getUrlParam('token')
    const userInfo = this.getUrlParam('userInfo')
    const rsInfo = this.getUrlParam('rsInfo')
    const getVerifyCode = this.getUrlParam('getVerifyCode')
    if (token != 'undefined' && token) {
      this.show = false
      await this.$nextTick()
      setToken(token)
      const userInfoObj = JSON.parse(userInfo)
      userInfoObj.title = '监测'
      setVerifyCode(getVerifyCode)
      setUserInfo(userInfoObj)
      sessionStorage.setItem('rsInfo', rsInfo)
      sessionStorage.setItem('SystemID', 163)
      this.$router.push({
        path: '/subskMap/subskMap'
      })
      if (sessionStorage.getItem('loaded') === null) {
        sessionStorage.setItem('loaded', true)
        window.location.reload()
      }
    } else {
      this.show = true
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      } else if (this.loginForm.code === '') {
        this.$refs.code.focus()
      }
      await this.$nextTick()
      this.verifyCode()
    }
  },
  destroyed() {},
  methods: {
    ...mapMutations(['SET_MENUS']),
    async verifyCode() {
      const blob = await verifyCode()
      this.loginForm.key = blob.key
      setVerifyCode(blob.key)
      this.imgCode = window.URL.createObjectURL(blob)
    },
    // 获取验证码
    getCaptchaCode() {
      this.captchaUrl = this.baseCaptchaUrl + Math.random()
    },
    checkCapslock({shiftKey, key} = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= 'a' && key <= 'z') ||
          (!shiftKey && key >= 'A' && key <= 'Z')
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      const self = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          self.postLogin()
        }
      })
    },
    postLogin() {
      const pass = this.loginForm.password
      const loginPam = JSON.parse(JSON.stringify(this.loginForm))
      loginPam.password = window.btoa(pass)
      console.log(loginPam)
      this.$store
        .dispatch('user/login', loginPam)
        .then(async(res) => {
          if (res.status == 200) {
            if (res.obj) {
              if (res.obj.menus != null && res.obj.menus.length) {
                this.$GXprompt.notify.success('登录成功')
                this.isStorage()
                sessionStorage.setItem('SystemID', 162)
                const userInfo = res.obj
                setToken(res.obj.token)
                userInfo.title = '水库安全监测预警系统'
                setUserInfo(userInfo)
                // this.$store.dispatch('user/getInfo', userInfo)
                this.$store.dispatch('app/setTitle', '水库安全监测预警系统')
                this.$router.push({
                  path: this.redirect || '/',
                  query: this.otherQuery
                })
                this.loading = false
              } else {
                this.$notify({
                  title: '温馨提示',
                  message: '此账号无菜单权限,请联系管理员',
                  type: 'warning'
                })
                // setTimeout(() => {
                //   window.location.reload()
                // }, 2000)
              }
            }
          } else {
            this.$GXprompt.notify.error(res.msg)
            return false
          }
        })
        .catch((res) => {
          if (res && res.status == false) {
            this.$GXprompt.notify.error(res.msg)
          }
          this.loading = false
        })
    },
    //   只在首页加载时候存储一次
    isStorage() {
      const constant = sessionStorage.getItem('constant')
      if (!constant) setConstant()
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 获取url参数 一个
    getUrlParam(paraName) {
      var url = decodeURIComponent(document.location)
      var arrObj = url.split('?')
      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split('&')
        var arr
        var arrValue
        arrPara.forEach((e) => {
          arr = e.split('=')
          if (arr != null && arr[0] == paraName) {
            arrValue = arr[1]
          }
        })
        return arrValue
      }
    },
    // 将字符串，分隔符封装数组
    stringSpiteArr(str) {
      let arrList = []
      const arr = []
      arrList = str.split(',') // 字符分割
      for (let i = 0; i < arrList.length; i++) {
        arr.push(arrList[i])
      }
      return arr
    }
  }
}
</script>

<style lang="scss" type="text/scss">
@import "~@/styles/variables.scss";

.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  .bg-title {
    color: #1f534e;
    font-family: "Microsoft YaHei";
    font-size: 0.55rem;
    top: 0.46rem;
    // -webkit-transform: translateX(-50%);
    // transform: translateX(-50%);
    position: absolute;
    font-weight: 700;
     left: 1.5rem;
    letter-spacing: 3px;
    // text-shadow: 3px 3px 5px #626e9e;
  }
  .englistName {
    // text-shadow: 3px 3px 5px #626e9e;
    position: absolute;
    left: 1.5rem;
    top: 126px;
    letter-spacing: 0.1px;
    color: #1f534e;
    font-family: "Microsoft YaHei";
    font-size: 0.2rem;
  }
  .set-language {
    color: #fff;
    position: absolute;
    top: 3px;
    font-size: 18px;
    right: 0px;
    cursor: pointer;
  }

  .login-btn {
    span {
      font-size: 0.16rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 500;
    }
  }
  .bg-div {
    background: url("../../assets/images/login/login-dc.jpg") no-repeat;
    width: 100%;
    height: auto;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
  }

  .login-body {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.48rem;
    width: 4.6rem;
    height: max-content;
    background: rgba(250, 250, 250, 1);
    box-shadow: 0px 2px 6px 0px rgba(72, 3, 216, 0.15);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    .loginTitle {
      font-size: 0.3rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: bold;
      color: #25867d;
      margin: 0.37rem 0 0rem;
      text-align: center;
    }

    .loginForm {
      flex: 1;
      width: 100%;
      padding: 0 0.45rem;
    }

    .login_tab {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 0;
      flex-direction: column;
    }

    .login_tab_pane {
      height: 100%;
      width: 100%;
      padding: 0;
    }
  }
}

.login-container .el-tabs__header {
  margin: 0;
}

.login-container .el-tabs__nav {
  width: 100%;
}

.login-container .el-tabs__item {
  padding: 0;
  height: 0.4rem;
  width: 50%;
  font-size: 0.2rem;
  line-height: 0.4rem;
  color: #333;
  float: left;
  text-align: center;
  margin-bottom: 0.2rem;
}

.login-container .el-tabs__item.is-active {
  color: #409eff;
}

.login-container .el-tabs__active-bar {
  height: 2px;
}

.login-container .el-tabs__content {
  flex: 1;
  display: flex;
}

.login-container .el-button--primary {
  width: 100%;
  font-size: 0.16rem;
  letter-spacing: 0.05rem;
  padding: 0.1rem 0.2rem;
  height: auto;
  background: #25867d;
}
.el-button--primary:hover,
.el-button--primary:focus {
  background: #29958b;
  border-color: #ffffff;
  color: #fff;
}
.login-container .el-form-item {
  margin: 0 0 0.2rem !important;
  height: 0.46rem;
  width: 90%;
}

.login-container .demo-ruleForm .mt-3 {
  margin-top: 0.3rem;
}

.login-container .el-input__inner {
  height: 0.46rem;
  line-height: 0.46rem;
  padding: 0 0 0 0.44rem;
  font-size: 0.16rem;
}

.demo-ruleForm {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/*验证图片*/
.login-container .captcha-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.login-container .el-form-item__content > img,
.login-container .el-form-item > img {
  position: absolute;
  left: 0.1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
  background: #fff;
  width: 0.24rem;
  height: 0.24rem;
}

.captcha-wrap .el-input {
  flex: 1;
}

.captcha-img {
  height: 100%;
  width: 1.18rem;
  margin-left: 0.3rem;
}

.captcha {
  width: 100%;
  height: 100%;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  -webkit-text-fill-color: #333;
  outline: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}

.login-fixed {
  position: fixed;
  bottom: 0.15rem;
  left: 0;
  margin: 0 auto;
  right: 0;
  z-index: 999;
  font-size: 12px;
  padding: 5px 15px;
  color: #fff;
  text-align: center;
}

.el-tabs__active-bar.is-top {
  width: 1.65rem;
}
</style>
