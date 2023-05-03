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
    <el-descriptions-item label="学校" :span="2">{{ tableData.studentSchool }}</el-descriptions-item>
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
    <el-descriptions-item label="学校" :span="2">{{ tableData.teacherSchool }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { getStudentInformation } from "@/request/api";
function getInformation(){
  getStudentInformation().then(res=>{
    console.log(res.data)
    tableData.studentName = res.data.studentName
    tableData.studentPhone = res.data.studentPhone
    tableData.studentSchool = res.data.studentSchool
    tableData.teacherName = res.data.teacherName
    tableData.teacherPhone = res.data.teacherPhone
    tableData.teacherSchool = res.data.teacherSchool
  })
}
const tableData = reactive(
  {
    studentPhone: '',
    studentName: '',
    studentSchool: '',
    teacherPhone: "",
    teacherName: '',
    teacherSchool: ''
  }
)
export default defineComponent({
  name:"StudentInformation",
  setup(){
    getInformation()
    return {tableData}
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