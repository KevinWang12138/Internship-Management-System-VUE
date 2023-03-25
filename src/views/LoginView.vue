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
import {defineComponent, reactive, toRefs} from "vue";
import {LoginData} from "@/type/login";

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
    }
    return {...toRefs(data),rules};
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