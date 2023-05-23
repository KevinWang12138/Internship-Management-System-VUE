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
import { defineComponent, reactive, ref } from "vue";
import { getTeacherInformation, updateBasicInfo, uploadFile } from "@/request/api";
import { useRouter } from "vue-router";

const formData = reactive({
  name: '姓名',
  bio: '个人简介',
  school: '学校',
  phone: '',
  college: '',
});
function getInformation(){
  getTeacherInformation().then(res=>{
    formData.name = res.data.teacherName
    formData.bio = res.data.info
    formData.school = res.data.teacherSchool
    formData.phone = res.data.teacherPhone
    formData.college = res.data.college
  })
}


export default defineComponent({
  name:"TeacherInformation",
  setup(){
    getInformation()


    const editing = ref(false);

    const editProfile = () => {
      editing.value = true;
    };

    const saveProfile = () => {
      //传递给后端

    };

    const cancelEditing = () => {
      editing.value = false;
    };
    return {formData,editing,editProfile,saveProfile,cancelEditing}
  },
  components:{

  },
})
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-form {
  width: 100%;
}

.profile-actions {
  text-align: right;
  margin-top: 20px;
}
</style>