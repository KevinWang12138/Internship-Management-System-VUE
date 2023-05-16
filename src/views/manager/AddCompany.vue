<template>
  <el-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
      >公司名称</span
      >
    <el-input
      v-model="companyName"
      class="w-50 m-2"
      placeholder="公司名称"
    />
  </el-row>
  <el-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
      >公司描述</span
      >
    <el-input
      v-model="desc"
      class="w-50 m-2"
      placeholder="公司描述"
    />
  </el-row>
  <el-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
      >公司Hr手机号</span
      >
    <el-input
      v-model="phone"
      class="w-50 m-2"
      placeholder="公司Hr手机号"
    />
  </el-row>
  <el-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
      >公司Hr初始密码</span
      >
    <el-input
      v-model="password"
      class="w-50 m-2"
      placeholder="公司Hr初始密码"
    />
  </el-row>
  <el-button style="width: 100%;height: 45px" @click="submit">提交</el-button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { addCompany } from "@/request/api";
export default defineComponent({
  name:"AddCompany",
  setup(){
    const companyName = ref('')
    const desc = ref('')
    const phone = ref('')
    const password = ref('')
    function submit(){
      addCompany({
        company_name:companyName.value,
        company_desc:desc.value,
        hr_phone:phone.value,
        hr_password:password.value
      }).then(res=>{
        console.log(res)
      })
    }
    return {companyName,desc,phone,password,submit}
  },
  components:{

  },
})
</script>

<style scoped>

</style>