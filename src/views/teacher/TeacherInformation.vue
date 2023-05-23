<template>
  <div class="profile">
    <el-form :model="formData" ref="profileForm" label-width="120px" class="profile-form">
      <el-form-item label="姓名">
        <el-input v-model="formData.name" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="formData.bio" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="formData.school" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.phone" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-input v-model="formData.college" :disabled=true></el-input>
      </el-form-item>
      <div class="profile-actions">
        <el-button v-if="!editing" type="primary" @click="editProfile">编辑</el-button>
        <el-button v-else type="success" @click="saveProfile">保存</el-button>
        <el-button v-if="editing" type="info" @click="cancelEditing">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { getTeacherInformation } from "@/request/api";
import { useRouter } from "vue-router";
function getInformation(){
  getTeacherInformation().then(res=>{

  })
}


export default defineComponent({
  name:"TeacherInformation",
  setup(){
    getInformation()

    return {}
  },
  components:{

  },
})
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>