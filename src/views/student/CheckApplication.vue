<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="150" />
    <el-table-column prop="startDate" label="开始日期" width="150" />
    <el-table-column prop="endDate" label="结束日期" width="150" />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="company" label="实习公司" width="120" />
    <el-table-column prop="startTime" label="上班时间" width="120" />
    <el-table-column prop="endTime" label="下班时间" width="120" />
    <el-table-column prop="type" label="是否全日制" width="120" />
    <el-table-column prop="type" label="审批情况" width="120" />
  </el-table>
  <!--底部的分页-->
  <el-pagination background layout="prev, pager, next" :total="totalPages"/>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {getApplication, getSelfApplication} from "@/request/api";
function getApplicationInfo(){
  //后端获取申请列表
  getSelfApplication(1,10).then(res=>{
    while(tableData.length!=0){
      tableData.pop()
    }
    for (let index=0;index<res.data.infos.length;index++){
      const info = res.data.infos[index]
      tableData.push({
        id: info.id,
        startDate: info.startDate,
        endDate: info.endDate,
        name: info.name,
        company: info.company,
        startTime: info.startTime,
        endTime: info.endTime,
        type: info.type,
      })
    }
    totalPages.value= res.data.totalPages * 10
  })
}
export default defineComponent({
  name:"CheckSelfApplication",
  setup(){
    getApplicationInfo()
    return {tableData, totalPages}
  },
  components:{

  },
})
const totalPages = ref(5000)
const tableData = reactive([
  {
    id: '',
    startDate: '',
    endDate: '',
    name: '',
    company: "",
    startTime: '',
    endTime: '',
    type: '',
  }
])
</script>

<style scoped>

</style>