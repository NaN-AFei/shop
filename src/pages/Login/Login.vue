<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/lk_logo_sm.png" alt width="250">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current:show}" @click.prevent="isshow(true)">短信登录</a>
          <a href="javascript:;" :class="{current:!show}" @click.prevent="isshow(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current:show}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                :class="{phone_right:phoneRight}"
                v-if="!countDown"
                class="get-verification"
                @click.prevent="getphoneCode()"
              >获取验证码</button>
              <button v-else disabled="disabled" class="get-verification">已发送({{countDown}})s</button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login-hint">
              温馨提示：未注册撩课帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current:!show}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="user_name">
              </section>
              <section class="login-verification">
                <input v-if="pwdMode" type="password" maxlength="10" placeholder="密码" v-model="pwd">
                <input v-else type="text" maxlength="10" placeholder="密码" v-model="pwd">
                <img
                  @click.prevent="dealPwdMode(false)"
                  class="switch-show"
                  :class="{on:!pwdMode}"
                  src="./images/hide_pwd.png"
                  alt
                  width="20"
                >
                <img
                  @click.prevent="dealPwdMode(true)"
                  class="switch-show"
                  :class="{on:pwdMode}"
                  src="./images/show_pwd.png"
                  alt
                  width="20"
                >
              </section>
              <section class="login-message">
                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                <img
                  @click.prevent="getCaptcha()"
                  class="get-verification"
                  src="http://localhost:3000/api/captcha"
                  alt="captcha"
                  ref="captcha"
                >
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login()">登录</button>
        </form>
        <button class="login-back" @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapActions } from "vuex";
import { getPhoneCode, PhoneCodeLogin, UserCodeLogin } from "./../../api/index";
export default {
  data() {
    return {
      show: true, //登陆方式切换
      phone: "", //手机号
      countDown: 0, //手机验证码倒计时
      code: "", //手机验证码
      user_name: "", //用户名
      pwd: "", //密码
      pwdMode: true, //密码显示方式 true密文 false 明文
      captcha: "", //随机验证码
      userInfo: {} //保存返回的用户的信息
    };
  },
  computed: {
    phoneRight() {
      return /^1[34578]\d{9}$/.test(this.phone);
    }
  },
  methods: {
    //同步用户信息
    ...mapActions(["syncUserInfo"]),
    //登陆方式的切换
    isshow(flag) {
      this.show = flag;
    },
    //获取手机验证码
    async getphoneCode() {
      //开启倒计时
      if (this.phoneRight) {
        this.countDown = 60;
        this.intervalId = setInterval(() => {
          this.countDown--;
          if (this.countDown === 0) {
            clearInterval(this.intervalId);
          }
        }, 1000);
      }
      //获取短信验证码
      const result = await getPhoneCode(this.phone);
      console.log(result);
      //获取失败
      if (result.err_code === 0) {
        Toast({
          message: result.message,
          position: "center",
          duration: 3000
        });
        //后续处理
        setTimeout(() => {
          clearInterval(this.intervalId);
          this.countDown = 0;
        }, 3000);
      }
    },
    //密码显示方式
    dealPwdMode(flag) {
      this.pwdMode = flag;
    },
    //随机验证码
    getCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:3000/api/captcha?time=" + new Date();
    },
    //登录操作
    async login() {
      //登陆模式
      if (this.show) {
        //短信登陆
        if (!this.phone) {
          Toast("请输入手机号!");
          return;
        } else if (!this.phoneRight) {
          Toast("请输入正确的手机号!");
          return;
        }
        if (!this.code) {
          Toast("请输入验证码!");
          return;
        } else if (!/^\d{6}$/gi.test(this.code)) {
          Toast("请输入正确的验证码!");
          return;
        }
        //验证通过，发送请求
        const result = await PhoneCodeLogin(this.phone, this.code);
        // console.log(result);
        if (result.success_code === 200) {
          this.userInfo = result.data;
        } else {
          this.userInfo = {
            message: "登陆失败，手机号码或验证码不正确！"
          };
        }
      } else {
        //用户名登陆 || !/^[a-zA-Z0-9_-]{4,16}$/.test(this.user_name)   || !/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(this.pwd )
        if (!this.user_name) {
          Toast("请输入正确的用户名!");
          return;
        }
        if (!this.pwd) {
          Toast("用户名或密码错误!");
          return;
        }
        if (!this.captcha) {
          Toast("请输入正确的验证码!");
          return;
        }

        //验证正确，用户登陆
        const result = await UserCodeLogin(
          this.user_name,
          this.pwd,
          this.captcha
        );
        // console.log(result);
        if (result.success_code === 200) {
          this.userInfo = result.data;
        } else {
          this.userInfo = {
            message: "登陆失败 ，用户名或密码不正确！"
          };
        }
      }
      //后续处理
      // console.log(this.userInfo);
      if (!this.userInfo._id) {
        //用户信息不存在
        Toast(this.userInfo.message);
      } else {
        //同步用户信息
        this.syncUserInfo(this.userInfo);
        //检测到有数据 就返回页面
        this.$router.back();
      }
    }


  }
};
</script>

<style scoped lang ="less">
.login-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .login-inner {
    padding-top: 6rem;
    width: 80%;
    margin: 0 auto;
    .login-header {
      .login-logo {
        font-size: 4rem;
        font-weight: bold;
        color: mediumpurple;
        text-align: center;
      }
      .login-header-title {
        padding-top: 4rem;
        padding-bottom: 1rem;
        text-align: center;
        a {
          color: #333;
          text-decoration: none;
          font-size: 1.4rem;
          padding-bottom: 0.4rem;
          &:first-child {
            margin-right: 4rem;
          }
          &.current {
            color: mediumpurple;
            font-weight: 700;
            border-bottom: 0.2rem solid mediumpurple;
          }
        }
      }
    }
    .login-content {
      form {
        div {
          display: none;
          &.current {
            display: block;
          }
          input {
            width: 100%;
            height: 100%;
            padding-left: 8px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;
            &:focus {
              border: 1px solid mediumpurple;
            }
          }
          .login-message {
            position: relative;
            margin-top: 16px;
            height: 4.8rem;
            font-size: 14px;
            background: #fff;
            .get-verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
              &.phone_right {
                color: purple;
              }
            }
          }
          .login-verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            .switch-show {
              position: absolute;
              right: 10px;
              top: 12px;
              &.on {
                display: none;
              }
              /* img {
                display: none;
              }
              img.on {
                display: block;
              } */
            }
          }
          .login-hint {
            margin-top: 12px;
            color: #999;
            font-size: 12px;
            line-height: 20px;
            a {
              color: mediumpurple;
            }
          }
        }
        .login-submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: mediumpurple;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }
      .login-back {
        display: block;
        width: 100%;
        height: 42px;
        margin-top: 15px;
        border-radius: 4px;
        background: transparent;
        border: 1px solid mediumpurple;
        color: mediumpurple;
        text-align: center;
        font-size: 16px;
        line-height: 42px;
      }
    }
  }
}
</style>