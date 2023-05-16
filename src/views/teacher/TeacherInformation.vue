<template>
  <el-button type=primary plain class="editButton" @click="edit">编辑</el-button>
  <el-descriptions
    title="个人信息"
    direction="vertical"
    :column="5"
    :size="size"
    border
  >
    <el-descriptions-item label="姓名">{{ tableData.teacherName }}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{ tableData.teacherPhone }}</el-descriptions-item>
    <el-descriptions-item label="学校" :span="2">{{ tableData.teacherSchool }}</el-descriptions-item>
    <el-descriptions-item label="个人简介" :span="2">{{ tableData.info }}</el-descriptions-item>
  </el-descriptions>

  <el-descriptions
    title="学生信息"
    direction="vertical"
    :column="6"
    :size="size"
    border
  >
    <el-descriptions-item v-for="student in studentData" :label="'姓名'" :key="student.name">
      {{ student.name }}
    </el-descriptions-item>
    <el-descriptions-item v-for="student in studentData" :label="'手机'" :key="student.phone">
      {{ student.phone }}
    </el-descriptions-item>
    <el-descriptions-item v-for="student in studentData" :label="'学号'" :key="student.school">
      {{ student.studentID }}
    </el-descriptions-item>
    <el-descriptions-item v-for="student in studentData" :label="'研究方向'" :key="student.school">
      {{ student.researchDirection }}
    </el-descriptions-item>
    <el-descriptions-item v-for="student in studentData" :label="'年级'" :key="student.school">
      {{ student.grade }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { getTeacherInformation } from "@/request/api";
import { useRouter } from "vue-router";
function getInformation(){
  getTeacherInformation().then(res=>{
    tableData.teacherName = res.data.teacherName
    tableData.teacherPhone = res.data.teacherPhone
    tableData.teacherSchool = res.data.teacherSchool
    tableData.info = res.data.info

    let studentInfos = res.data.studentInfos
    while(studentData.length!=0){
      studentData.pop()
    }
    for(let i=0;i<studentInfos.length;i++){
      let grade = ""
      if(studentInfos[i].studentGrade==1){
        grade = '研一'
      }else if(studentInfos[i].studentGrade==2){
        grade = '研二'
      }else if(studentInfos[i].studentGrade==3){
        grade = '研三'
      }else if(studentInfos[i].studentGrade==4){
        grade = '研四'
      }
      studentData.push({
        "name":studentInfos[i].studentName,
        "phone":studentInfos[i].studentPhone,
        "researchDirection":studentInfos[i].studentResearchDirection,
        "grade":grade,
        "studentID":studentInfos[i].studentID
      })
    }
    console.log(studentData)
  })
}
const tableData = reactive(
  {
    teacherPhone: "",
    teacherName: '',
    teacherSchool: '',
    info: ''
  }
)
const studentData = reactive([
  {
    name: '',
    phone: '',
    researchDirection: '',
    grade: '',
    studentID: '',
  }
])
export default defineComponent({
  name:"TeacherInformation",
  setup(){
    getInformation()
    const router = useRouter()
    function edit(){
      router.push('/teacher/edit')
    }
    return {tableData,studentData,edit}
  },
  components:{

  },
})
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.editButton{
  position: absolute;
  top: 0;
  right: 50px;
  width: 200px;
  height: 50px;
  font-size: 20px;
}
</style>