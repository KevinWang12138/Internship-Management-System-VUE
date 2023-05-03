<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="150" />
    <el-table-column prop="startDate" label="开始日期" width="150" />
    <el-table-column prop="endDate" label="结束日期" width="150" />
    <el-table-column prop="company" label="实习公司" width="120" />
    <el-table-column prop="startTime" label="上班时间" width="120" />
    <el-table-column prop="endTime" label="下班时间" width="120" />
    <el-table-column prop="type" label="是否全日制" width="120" />
    <el-table-column prop="condition" label="审批情况" width="120" />
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
    console.log(res.data)
    while(tableData.length!=0){
      tableData.pop()
    }
    for (let index=0;index<res.data.infos.length;index++){
      const info = res.data.infos[index]
      let cond:string
      if(info.agreed == 1){
        cond = '已通过'
      }else if(info.agreed == -1){
        cond = '未通过'
      }else{
        cond = '待审核'
      }
      tableData.push({
        id: info.id,
        startDate: info.startDate,
        endDate: info.endDate,
        company: info.company,
        startTime: info.startTime,
        endTime: info.endTime,
        type: info.type,
        condition: cond
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
    company: "",
    startTime: '',
    endTime: '',
    type: '',
    condition: '',
  }
])
</script>

<style scoped>

</style>