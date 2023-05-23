<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="200" />
    <el-table-column prop="studentID" label="学号" width="200" />
    <el-table-column prop="studentName" label="学生姓名" width="200" />
    <el-table-column prop="studentPhone" label="手机号" width="300" />
    <el-table-column fixed="right" label="Operations" width="300">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="open(row.id)">详细信息</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-drawer v-model="drawer" title="详细信息" :with-header="false">
    <div class="profile">
      <h2>基本信息</h2>
      <div class="profile-item">
        <span>姓名：</span>
        <span>{{ student.name }}</span>
      </div>
      <div class="profile-item">
        <span>手机号：</span>
        <span>{{ student.phone }}</span>
      </div>
      <div class="profile-item">
        <span>身份证号：</span>
        <span>{{ student.idCardNumber }}</span>
      </div>
      <div class="profile-item">
        <span>学校：</span>
        <span>{{ student.school }}</span>
      </div>
      <div class="profile-item">
        <span>年龄：</span>
        <span>{{ student.age }}</span>
      </div>
      <div class="profile-item">
        <span>性别：</span>
        <span>{{ student.gender }}</span>
      </div>
      <div class="profile-item">
        <span>专业：</span>
        <span>{{ student.major }}</span>
      </div>
      <div class="profile-item">
        <span>年级：</span>
        <span>{{ student.grade }}</span>
      </div>
      <div class="profile-item">
        <span>籍贯：</span>
        <span>{{ student.hometown }}</span>
      </div>
      <div class="profile-item">
        <span>现居地：</span>
        <span>{{ student.currentLocation }}</span>
      </div>
      <div class="profile-item">
        <span>研究方向：</span>
        <span>{{ student.researchArea }}</span>
      </div>
      <div class="profile-item">
        <span>个人简介：</span>
        <span>{{ student.bio }}</span>
      </div>
      <div class="profile-item">
        <span>技术栈：</span>
        <span>{{ student.techStack }}</span>
      </div>
      <div class="profile-item">
        <span>个人简历：</span>
        <a class="resume-link" :href="resumeUrl" download="我的简历.pdf" v-if="resumeUrl">下载简历</a>
        <span v-else>暂无简历</span>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { getTeacherInformation } from "@/request/api";

export default defineComponent({
  name:"TeacherStudentInformation",
  setup(){
    const tableData = reactive([
      {
        id: '',
        studentID: '',
        studentName: "",
        studentPhone: '',
      }
    ])
    const drawer = ref(false)
    getTeacherInformation().then(res=>{
      let studentInfos = res.data.studentInfos
      while(tableData.length!=0){
        tableData.pop()
      }
      for(let i=0;i<studentInfos.length;i++){
        tableData.push({
          "id":studentInfos[i].id,
          "studentName":studentInfos[i].studentName,
          "studentPhone":studentInfos[i].studentPhone,
          "studentID":studentInfos[i].studentID
        })
      }
    })
    function open(index:any){
      drawer.value = true
    }

    const student = reactive({
      name: '张三',
      school: 'ABC大学',
      age: 22,
      gender: '男',
      major: '计算机科学',
      grade: '大四',
      hometown: '北京',
      currentLocation: '上海',
      researchArea: '人工智能',
      tutorBio: 'XXX教授是一位在人工智能领域有丰富经验的导师。',
      bio: '',
      idCardNumber: '',
      phone: '',
      techStack:''
    })


    return {tableData,drawer,open,student}
  },
  components:{

  },
})
</script>

<style scoped>

</style>