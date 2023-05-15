<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="150" />
    <el-table-column prop="studentId" label="学生id" width="150" />
    <el-table-column prop="jobId" label="职位id" width="150" />
    <el-table-column prop="status" label="申请状态" width="120" />
    <el-table-column prop="studentName" label="学生姓名" width="120" />
    <el-table-column prop="studentPhone" label="学生手机号" width="120" />
    <el-table-column prop="jobName" label="职位名称" width="120" />
    <el-table-column prop="studentSchool" label="学生学校" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="agree(row.id)">推进</el-button>
        <el-button link type="primary" size="small" @click="refuse(row.id)">淘汰</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--底部的分页-->
  <el-pagination background layout="prev, pager, next" :total="totalPages"/>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import { checkJobApplicationInfo } from "@/request/api";
const tableData = reactive([
  {
    id: '',
    studentId: '',
    jobId: '',
    status: '',
    studentName: "",
    studentPhone: '',
    jobName: '',
    studentSchool: '',
  }
])
export default defineComponent({
  name:"CheckApplicationSituation",
  setup(){
    checkJobApplicationInfo().then(res=>{
      while (tableData.length>0){
        tableData.pop()
      }
      let status = ""
      for(let i =0;i<res.data.length;i++){
        switch (res.data[i].status) {
          case 0:
            status = "待审批"
            break;
          case 1:
            status = "审批中"
            break;
          case 2:
            status = "面试中"
            break;
          case 3:
            status = "面试通过"
            break;
          case 4:
            status = "入职"
            break;
          case 5:
            status = "不通过"
            break;
        }
        tableData.push({
          id: res.data[i].id,
          studentId: res.data[i].studentId,
          jobId: res.data[i].jobId,
          status: status,
          studentName: res.data[i].studentName,
          studentPhone: res.data[i].studentPhone,
          jobName: res.data[i].jobName,
          studentSchool: res.data[i].studentSchool,
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