<template>
  <el-descriptions
    title="个人信息"
    direction="vertical"
    :column="4"
    :size="size"
    border
  >
    <el-descriptions-item label="姓名">{{ tableData.teacherName }}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{ tableData.teacherPhone }}</el-descriptions-item>
    <el-descriptions-item label="学校" :span="2">{{ tableData.teacherSchool }}</el-descriptions-item>
  </el-descriptions>

  <el-descriptions
    title="学生信息"
    direction="vertical"
    :size="size"
    border
  >
    <el-descriptions-item v-for="student in studentData" :label="'姓名'" :key="student.name">
      {{ student.name }}
    </el-descriptions-item>
    <el-descriptions-item v-for="student in studentData" :label="'手机'" :key="student.phone">
      {{ student.phone }}
    </el-descriptions-item>
    <el-descriptions-item v-for="student in studentData" :label="'学校'" :key="student.school">
      {{ student.school }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { getTeacherInformation } from "@/request/api";
function getInformation(){
  getTeacherInformation().then(res=>{
    tableData.teacherName = res.data.teacherName
    tableData.teacherPhone = res.data.teacherPhone
    tableData.teacherSchool = res.data.teacherSchool

    let studentInfos = res.data.studentInfos
    console.log(studentInfos)
    while(studentData.length!=0){
      studentData.pop()
    }
    for(let i=0;i<studentInfos.length;i++){
      studentData.push({
        "name":studentInfos[i].studentName,
        "phone":studentInfos[i].studentPhone,
        "school":studentInfos[i].studentSchool
      })
    }
    console.log(studentData)
  })
}
const tableData = reactive(
  {
    teacherPhone: "",
    teacherName: '',
    teacherSchool: ''
  }
)
const studentData = reactive([
  {
    name: '',
    phone: '',
    school: ''
  }
])
export default defineComponent({
  name:"TeacherInformation",
  setup(){
    getInformation()
    return {tableData,studentData}
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