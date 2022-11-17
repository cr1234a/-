<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号：" prop="phone" class="a">
        <el-input type="type" v-model.number="ruleForm.phone" autocomplete="off" class="b" ></el-input>
      </el-form-item>
      <!-- <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
      
        <span class="error-msg">错误提示信息</span>
      </div> -->
      <el-form-item label="验证码：" prop="code" class="a">
        <el-input type="type" v-model.number="ruleForm.code"  class="b" ></el-input>
        <button style="height:30px;padding:5px;margin-left:5px" @click="getCode">获取验证码</button>
      </el-form-item>
      <!-- <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
        <span class="error-msg">错误提示信息</span>
      </div> -->
      <el-form-item label="密码：" prop="password" class="a">
        <el-input placeholder="请输入密码" v-model.number="ruleForm.password" show-password class="b" ></el-input>
      </el-form-item>
      <!-- <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请再次输入密码" v-model="repassword">
        <span class="error-msg">错误提示信息</span>
      </div> -->
      <el-form-item label="确认密码：" prop="repassword" class="a">
        <el-input placeholder="请再次输入密码" v-model.number="ruleForm.repassword" show-password class="b"></el-input>
      </el-form-item>
      <div class="controls">
        <!-- <input name="m1" type="checkbox" :checked="ruleForm.isAgree" @change=" ruleForm.isAgree=! ruleForm.isAgree"> -->
        <!-- <el-input  name="m1" class=".input" type="checkbox" :checked="ruleForm.isAgree" @change=" ruleForm.isAgree=! ruleForm.isAgree"></el-input> -->
        <el-checkbox name="m1" class=".input" type="checkbox" :checked="ruleForm.isAgree" @change=" ruleForm.isAgree=! ruleForm.isAgree"> <span>同意协议并注册《尚品汇用户协议》</span></el-checkbox>
       
      </div>
      <div class="btn">
        <!-- <button @click="register">注册</button> -->
        <button  @click="submitForm('ruleForm')" class="button">注册</button>
      </div>
    </el-form>
   

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Register',
    data(){
      var checkphone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(value))) {
              callback(new Error('手机号码有误，请重填'));
            } else {
              callback();
            }
          }
        }, 500);
      };
      
      var validatepass = (rule, value, callback) => {
        if (!(/^\d{6,18}$/.test(value))) {
          callback(new Error('请输入6-18位数字的密码'));
        } else {
          if (this.ruleForm.checkPass != '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }      
      };
      return {
        ruleForm: {
          phone: '',
          code: '',
          password: '',
          repassword:'',
          isAgree:true,
        },
     
        rules: {
          phone:[
          { validator:checkphone , trigger: 'blur' }
          ],
          password:[
          { validator:validatepass, trigger: 'blur' }
          ],
          repassword:[
          { validator:validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      // 获取验证码
      async getCode() {
      //   this.$refs[formName].validate(async (valid) => {
      //     if (valid) {
      //       try {
      //       await this.$store.dispatch('LoginAndRegister/getCode', this.ruleForm.phone)
      //       this.ruleForm.code = this.$store.state.LoginAndRegister.VerificationCode
      //   } catch (error) {
      //     alert('未知错误，请重试')
      //   }
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   })
     
          if ((/^1[3|4|5|7|8]\d{9}$/.test(this.ruleForm.phone))) {
            try {
            await this.$store.dispatch('LoginAndRegister/getCode', this.ruleForm.phone)
            this.ruleForm.code = this.$store.state.LoginAndRegister.VerificationCode
          }  catch (error) {
          alert('未知错误，请重试')
        }
      }
    },
    // async register(){
    //   if(!ruleForm.isAgree) {
    //     callback(11)
    //   }
    //      try {
    //       if(this.phone && this.password && this.code == this.$store.state.LoginAndRegister.VerificationCode && this.isAgree) {
    //       await this.$store.dispatch('LoginAndRegister/register',{phone:this.ruleForm.phone,password:this.ruleForm.password,code:this.ruleForm.code})
    //       alert('注册成功')
    //       setTimeout(()=>{
    //           this.$router.push({ path: '/login'})
    //       },1000)
    //     }
    //      } catch (error) {
    //       alert('未知错误，请重试')
    //      }
    //   }
  submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
            if (valid) {
            try {
                await this.$store.dispatch('LoginAndRegister/register', { phone: this.ruleForm.phone, password: this.ruleForm.password, code: this.ruleForm.code })
                alert('注册成功')
                setTimeout(() => {
                  this.$router.push({ path: '/login' })
                }, 1000)            
            } catch (error) {
              alert('未知错误，请重试')
            }
          } else {
            alert('未通过验证')
            return false;
          }          
        });
      },
      }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      // height: 445px;
      // border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;
      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }
      div:nth-of-type(1) {
        margin-top: 40px;
      }
    }
    .demo-ruleForm {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;
       .a{
          padding-left: 390px;
        margin-bottom: 18px;
        margin-top:18px;
        .b{
          width: 270px;
          height: 38px
        }
      }
     } 
    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    
     
    }
    .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        .button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
          cursor:pointer
        }
      }
      .controls {
        text-align: center;
        position: relative;

        .input {
          vertical-align: middle;
        }

      }
  }
</style>