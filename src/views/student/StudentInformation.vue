<template>
  <el-descriptions
    title="个人信息"
    direction="vertical"
    :column="4"
    :size="size"
    border
  >
    <el-descriptions-item label="姓名">{{ tableData.studentName }}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{ tableData.studentPhone }}</el-descriptions-item>
    <el-descriptions-item label="学号" :span="2">{{ tableData.studentID }}</el-descriptions-item>
  </el-descriptions>
  <el-descriptions
    title="研究信息"
    direction="vertical"
    :column="4"
    :size="size"
    border
  >
    <el-descriptions-item label="学校">{{ tableData.studentSchool }}</el-descriptions-item>
    <el-descriptions-item label="专业">{{ tableData.studentMajor }}</el-descriptions-item>
    <el-descriptions-item label="年级">{{ tableData.studentGrade }}</el-descriptions-item>
    <el-descriptions-item label="研究方向" :span="2">{{ tableData.studentResearchDirection }}</el-descriptions-item>
  </el-descriptions>

  <el-descriptions
    title="导师信息"
    direction="vertical"
    :column="4"
    :size="size"
    border
  >
    <el-descriptions-item label="姓名">{{ tableData.teacherName }}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{ tableData.teacherPhone }}</el-descriptions-item>
    <el-descriptions-item label="简介" :span="2">{{ tableData.teacherInfo }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { getStudentInformation } from "@/request/api";
import { useRouter } from "vue-router";
function getInformation(){
  getStudentInformation().then(res=>{
    tableData.studentName = res.data.studentName
    tableData.studentPhone = res.data.studentPhone
    tableData.studentSchool = res.data.studentSchool
    tableData.teacherName = res.data.teacherName
    tableData.teacherPhone = res.data.teacherPhone

    tableData.studentID=res.data.studentID
    tableData.studentMajor=res.data.studentMajor
    if(res.data.studentGrade == 1){
      tableData.studentGrade = "研一"
    }else if(res.data.studentGrade == 2){
      tableData.studentGrade = "研二"
    }else if(res.data.studentGrade == 3){
      tableData.studentGrade = "研三"
    }else if(res.data.studentGrade == 4){
      tableData.studentGrade = "研四"
    }
    tableData.studentResearchDirection=res.data.studentResearchDirection
    tableData.teacherInfo= res.data.teacherInfo
  })
}
const tableData = reactive(
  {
    studentPhone: '',
    studentName: '',
    studentSchool: '',
    studentID:'',
    studentMajor:'',
    studentGrade:'',
    studentResearchDirection:'',

    teacherPhone: "",
    teacherName: '',
    teacherInfo: ''
  }
)
export default defineComponent({
  name:"StudentInformation",
  setup(){
    const router = useRouter()
    function edit(){
      router.push('/teacher/edit')
    }
    getInformation()
    return {tableData,edit}
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