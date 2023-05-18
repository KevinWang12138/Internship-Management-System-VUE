<template>
  <div class="change-password">
    <h2>修改密码</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="password-form">
      <el-form-item label="当前密码" prop="currentPassword">
        <el-input
          v-model="form.currentPassword"
          type="password"
          placeholder="请输入当前密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          type="password"
          placeholder="请输入新密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          placeholder="请再次输入新密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changePassword } from "@/request/api";
import { ElMessage } from "element-plus";
import { h } from "vue";

export default {
  data() {
    return {
      dialogVisible: false,
      changeResult: "",
      changeErrorMsg: "",
      form: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        currentPassword: [
          { required: true, message: '请输入当前密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.newPassword) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          changePassword({
            old_password:this.form.currentPassword,
            new_password:this.form.newPassword,
          }).then(res=>{
            console.log(res)
            console.log(res.data)
            if(res.data==null){
              ElMessage('修改成功.')
              location.reload()
            }else{
              ElMessage(res.data)
            }
          })
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.change-password {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.password-form .el-form-item__label {
  font-weight: bold;
}

.password-form .el-button {
  width: 100%;
}
</style>