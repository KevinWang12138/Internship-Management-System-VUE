<template>
  <div class="profile">
    <el-form :model="formData" ref="profileForm" label-width="120px" class="profile-form">
      <el-form-item label="姓名">
        <el-input v-model="formData.name" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formData.age" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="formData.gender" :disabled="!editing">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="formData.bio" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="技术栈">
        <el-input v-model="formData.techStack" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="研究方向">
        <el-input v-model="formData.researchArea" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="formData.hometown" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="formData.idCardNumber" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="所在地">
        <el-input v-model="formData.location" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="formData.school" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formData.studentId" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="导师姓名">
        <el-input v-model="formData.tutorName" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="导师手机">
        <el-input v-model="formData.tutorPhone" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="导师简介">
        <el-input type="textarea" v-model="formData.tutorBio" :disabled="!editing"></el-input>
      </el-form-item>
      <div class="profile-actions">
        <el-button v-if="!editing" type="primary" @click="editProfile">编辑</el-button>
        <el-button v-else type="success" @click="saveProfile">保存</el-button>
        <el-button v-if="editing" type="info" @click="cancelEditing">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  name: 'ProfilePage',
  setup() {
    const formData = reactive({
      name: 'John Doe',
      age: 25,
      gender: '男',
      bio: '个人简介',
      techStack: '技术栈',
      researchArea: '研究方向',
      hometown: '籍贯',
      idCardNumber: '身份证号',
      location: '所在地',
      school: '学校',
      studentId: '学号',
      tutorName: '导师姓名',
      tutorPhone: '导师手机',
      tutorBio: '导师简介',
    });

    const editing = ref(false);

    const editProfile = () => {
      editing.value = true;
    };

    const saveProfile = () => {
      // Perform saving logic here
      editing.value = false;
    };

    const cancelEditing = () => {
      editing.value = false;
    };

    return {
      formData,
      editing,
      editProfile,
      saveProfile,
      cancelEditing,
    };
  },
};
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
