<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="100" />
    <el-table-column prop="studentId" label="学生id" width="200" />
    <el-table-column prop="studentName" label="学生姓名" width="300" />
    <el-table-column prop="jobId" label="职位id" width="200" />
    <el-table-column prop="jobName" label="职位" width="300" />
  </el-table>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import { checkJobApplicationInfo, getWorkingStudent } from "@/request/api";

export default defineComponent({
  name:"CompanyCommentView",
  setup(){
    const tableData = reactive([
      {
        id: '',
        studentId: '',
        studentName: '',
        jobId: '',
        jobName: ''
      }
    ])

    getWorkingStudent().then(res=>{
      while(tableData.length>0){
        tableData.pop()
      }
      for(let i=0;i<res.data.length;i++){
        tableData.push({
          id: res.data[i].id,
          studentId: res.data[i].studentId,
          studentName: res.data[i].studentName,
          jobId: res.data[i].jobId,
          jobName: res.data[i].jobName
        })
      }
    })
    return {tableData}
  },
  components:{

  },
})
</script>

<style scoped>

</style>