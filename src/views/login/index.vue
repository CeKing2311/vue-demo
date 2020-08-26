<template>
    <div class="login" id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
            <!--表单-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium" class="login-form">
                <el-form-item prop="UserName" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.UserName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="Password" class="item-form">
                    <label>密码</label>
                    <el-input type="text" v-model="ruleForm.Password" autocomplete="off" minlength="6" maxlength="20" ></el-input>
                </el-form-item>
                 <el-form-item  prop="ConfirmPassword" class="item-form" v-if="model==='register'">
                    <label>重复密码</label>
                    <el-input type="text" v-model="ruleForm.ConfirmPassword" autocomplete="off" minlength="6" maxlength="20" ></el-input>
                </el-form-item>
                <el-form-item  prop="Code" class="item-form">
                    <label>验证码</label>                   
                    <el-row :gutter="10">
                    <el-col :span="15"> <el-input type="text" v-model="ruleForm.Code" minlength="6" maxlength="6" ></el-input></el-col>
                    <el-col :span="9"><el-button type="success block">获取验证码</el-button></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="margin-top-19 block">{{modelText}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {stripscript,validateEmail,validatePass,validateVCode} from '@/utils/validate';
export default {
  data() {
    //验证码用户名
    var validateUserName = (rule, value, callback) => {
      //let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      }else if(validateEmail(value)){
          callback(new Error("用户名格式有误！"));
      } else {
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
     this.ruleForm.Password=stripscript(value);
     value =this.ruleForm.Password;
      //let reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位的数字加字母!"));
      } else {
        callback();
      }
    };
    //验证重复密码
    var validatePasswords = (rule, value, callback) => {
     this.ruleForm.Password=stripscript(value);
     value =this.ruleForm.Password;
      //let reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value!=this.ruleForm.Password) {
        callback(new Error("重复密码不正确"));
      } else{
        callback();
      }
    };
    //验证验证码
    var validateCode = (rule, value, callback) => {
      this.ruleForm.Code=stripscript(value);
      value =this.ruleForm.Code;
      //let reg=/^[0-9A-Za-z]{6}$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateVCode(value)) {
        callback(new Error("验证码格式有误!"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true,type:"login" },
        { txt: "注册", current: false,type:"register" }
      ],
      model:"login",
      modelText:"登录",
      ruleForm: {
        UserName: "",
        Password: "",
        ConfirmPassword:"",
        Code: ""
      },
      rules: {
        UserName: [{ validator: validateUserName, trigger: "blur" }],
        Password: [{ validator: validatePassword, trigger: "blur" }],
        ConfirmPassword: [{ validator: validatePasswords, trigger: "blur" }],
        Code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(e => {
        e.current = false;
      });
      data.current = true;
      this.model=data.type;
      this.modelText=data.txt;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    stripscript(str){
        //格式 RegExp("[在中间定义特殊过滤字符]")
        var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——| {}【】‘；：”“'。，、？]")      
        var rs = ""; 
        for (var i = 0; i < str.length; i++) { 
            rs = rs+str.substr(i, 1).replace(pattern, ''); 
        }
        return rs;
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form{
    label{
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
    }
    .item-form{
        margin-bottom: 13px;
    }
    .block{
        width: 100%;
        display: block;
    }
    .margin-top-19{
        margin-top: 19px;
    }
}
</style>


