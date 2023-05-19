<template>
  <div class="profile">
    <el-form :model="formData" ref="profileForm" label-width="120px" class="profile-form">
      <el-form-item label="姓名">
        <el-input v-model="formData.name" :disabled=true></el-input>
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
        <el-input type="textarea" v-model="formData.techStack" :disabled="!editing"></el-input>
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
        <el-input v-model="formData.school" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formData.studentId" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="formData.grade" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.phone" :disabled="!editing"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="formData.major" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="导师姓名">
        <el-input v-model="formData.tutorName" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="导师手机">
        <el-input v-model="formData.tutorPhone" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="导师简介">
        <el-input type="textarea" v-model="formData.tutorBio" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="上传简历">
        <el-upload
        :show-file-list="false"
        :disabled="!editing"
        @change="handleResumeChange"
        >
        <el-button size="small">选择文件</el-button>
        </el-upload>
        <span v-if="resume">: {{ resume }}</span>
      </el-form-item>
      <el-form-item label="查看简历">
        <a class="resume-link" :href="resumeUrl" download="我的简历.pdf" v-if="resumeUrl">下载简历</a>
        <span v-else>暂无简历</span>
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
import { getStudentInformation, updateBasicInfo, uploadFile } from "@/request/api";

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
      phone: '',
      major: '',
      grade:'',
    });

    getStudentInformation().then(res=>{
      console.log(res)
      formData.age = res.data.age
      formData.bio = res.data.bio
      formData.gender = res.data.gender
      formData.hometown = res.data.hometown
      formData.idCardNumber = res.data.idCardNumber
      formData.location = res.data.location
      formData.studentGrade = res.data.studentGrade
      formData.studentId = res.data.studentID
      formData.name = res.data.studentName
      formData.researchArea = res.data.studentResearchDirection
      formData.school = res.data.studentSchool
      formData.tutorBio = res.data.teacherInfo
      formData.tutorName = res.data.teacherName
      formData.tutorPhone = res.data.teacherPhone
      formData.techStack = res.data.techStack
      formData.phone = res.data.studentPhone
      formData.major = res.data.studentMajor
      formData.grade = res.data.studentGrade
      if(res.data.url!=null&&res.data.url!=""){
        resumeUrl.value = "http://localhost:8080/download/resume?fileName="+res.data.url
      }
    })


    const editing = ref(false);

    const editProfile = () => {
      editing.value = true;
    };

    const saveProfile = () => {
      //传递给后端
      updateBasicInfo({
        age:formData.age,
        gender:formData.gender,
        bio:formData.bio,
        techStack:formData.techStack,
        researchArea:formData.researchArea,
        hometown:formData.hometown,
        idCardNumber:formData.idCardNumber,
        location:formData.location,
        phone:formData.phone,
        major:formData.major,
        grade:formData.grade
      }).then(res=>{
        uploadFile(theFile).then(res=>{
          console.log(res)
        })
        editing.value = false;
      })

    };

    const cancelEditing = () => {
      editing.value = false;
    };

    const resume = ref("文件名")
    let theFile = null
    function handleResumeChange(file) {
      // 处理简历文件选择的逻辑
      // 将选中的简历文件名赋值给resume变量
      resume.value = file.name
      theFile = file.raw
    }
    const fileName = ref("未上传，请先上传")
    const resumeUrl = ref("")

    return {
      formData,
      editing,
      editProfile,
      saveProfile,
      cancelEditing,
      resume,
      handleResumeChange,
      fileName,
      resumeUrl
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
