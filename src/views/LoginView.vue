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
      <el-form-item label="手机号" prop="phone">
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
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="loginButton" @click="submitForm(ruleFormRef)"
        >登录</el-button
        >
        <el-button class="loginButton" @click="resetForm(ruleFormRef)">重置</el-button>
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
    //登录
    const router = useRouter()
    const ruleFormRef = ref<FormInstance>()
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      //对表单的内容进行验证
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then(res=>{
            console.log(res.status)
            //记录token
            localStorage.setItem("token",res.data)
            //跳转页面 首页 todo
            router.push("/")
          })
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })

    }
    //重置
    const resetForm = () => {
      data.ruleForm.phone=""
      data.ruleForm.password=""
    }
    return {...toRefs(data),rules,ruleFormRef,submitForm,resetForm};
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