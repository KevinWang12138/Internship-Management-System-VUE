<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="200" />
    <el-table-column prop="status" label="申请状态" width="200" />
    <el-table-column prop="jobName" label="职位名称" width="300" />
    <el-table-column prop="companyName" label="公司名称" width="300" />
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="agree(row.id)">接受</el-button>
        <el-button link type="primary" size="small" @click="refuse(row.id)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--底部的分页-->
  <el-pagination background layout="prev, pager, next" :total="totalPages"/>
</template>
<script lang="ts">
import {defineComponent, reactive} from "vue";
import { checkInterviewSituation } from "@/request/api";
const tableData = reactive([
  {
    id: '',
    status: '',
    jobName: '',
    companyName: '',
  }
])
export default defineComponent({
  name:"InterviewSituation",
  setup(){
    while(tableData.length>0){
      tableData.pop()
    }
    //0待审批，1审批中，2面试中，3面试通过，4入职，5不通过
    checkInterviewSituation().then(res=>{
      let status = ""
      for(let i=0;i<res.data.length;i++){
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
          status: status,
          jobName: res.data[i].jobName,
          companyName: res.data[i].companyName,
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

