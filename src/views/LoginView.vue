<template>
  <div class="login-box">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <h2>登录系统</h2>
      <el-form-item label="账号" prop="phone">
        <el-input v-model="ruleForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="用户类型" prop="role">
        <el-select
            v-model="ruleForm.role"
            placeholder="请选择您的角色"
        >
          <el-option label="学生" value=1 />
          <el-option label="教师" value=2 />
          <el-option label="企业" value=3 />
          <el-option label="管理员" value=4 />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="loginButton" @click="submitForm(ruleFormRef)"
        >登录</el-button
        >
        <el-button class="loginButton" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref} from "vue";
import {LoginData} from "@/type/login";
import type { FormInstance, FormRules } from 'element-plus'
import {login} from "@/request/api";
import {useRouter} from "vue-router"

export default defineComponent({
  setup(){
    //登录
    const router = useRouter()

    if(localStorage.getItem("student")){
      //如果登录的是学生端，则跳转到学生主页
      router.push('/student')
    }
    if(localStorage.getItem("teacher")){
      //如果登录的是教师端，则跳转到教师主页
      router.push('/teacher')
    }
    if(localStorage.getItem("company")){
      //如果登录的是教师端，则跳转到教师主页
      router.push('/company')
    }
    if(localStorage.getItem("manager")){
      //如果登录的是教师端，则跳转到教师主页
      router.push('/manager')
    }


    const data=reactive(new LoginData());
    const rules={
      phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入11位正确手机号', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
      role :[
        { required: true }
      ]
    }
    const ruleFormRef = ref<FormInstance>()
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      //对表单的内容进行验证
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then(res=>{
            //记录token
            localStorage.setItem("token",res.data)
            localStorage.setItem("phone",data.ruleForm.phone)
            if(data.ruleForm.role=='1'){
              localStorage.setItem("student",'1')
              localStorage.removeItem("teacher")
              localStorage.removeItem("company")
              localStorage.removeItem("manager")

              //页面跳转
              router.push('/student')
            }else if(data.ruleForm.role=='2'){
              localStorage.setItem("teacher",'2')
              localStorage.removeItem("student")
              localStorage.removeItem("company")
              localStorage.removeItem("manager")

              //页面跳转
              router.push('/teacher')
            }else if(data.ruleForm.role=='3'){
              localStorage.setItem("company",'3')
              localStorage.removeItem("student")
              localStorage.removeItem("teacher")
              localStorage.removeItem("manager")

              //页面跳转
              router.push('/company')
            }else if(data.ruleForm.role=='4'){
              localStorage.setItem("manager",'4')
              localStorage.removeItem("student")
              localStorage.removeItem("teacher")
              localStorage.removeItem("company")

              //页面跳转
              router.push('/manager')
            }
          })
        } else {
          console.log('error submit!')
          return false
        }
      })

    }

    function register(){
      router.push("/register")
    }
    return {...toRefs(data),rules,ruleFormRef,submitForm,router,register};
  }
})
</script>

<style lang="scss">
.login-box{
  width: 100%;
  height: 100%;
  padding: 1px;
  text-align: center;
  background-color: #181818;
  .demo-ruleForm{
    width: 500px;
    margin: 200px auto;
    background-color: bisque;
    padding: 40px;
    border-radius: 20px;
  }
  .loginButton{
    width: 48%;
  }
  h2{
    margin-bottom: 5px;
  }
}
</style>