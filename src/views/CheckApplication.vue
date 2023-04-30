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
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
        >同意</el-button
        >
        <el-button link type="primary" size="small">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--底部的分页-->
  <el-pagination background layout="prev, pager, next" :total="totalPages"/>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {getApplication} from "@/request/api";
export default defineComponent({
  name:"CheckApplicationView",
  setup(){
    //后端获取申请列表
    getApplication(1,10).then(res=>{
      tableData.pop()
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
    return {handleClick, tableData, totalPages}
  },
  components:{

  },
})
const handleClick = () => {
  console.log('click')
}
const totalPages = ref(5000)
const tableData = reactive([
  {
    id: '1',
    startDate: '2016-05-03',
    endDate: '2016-05-06',
    name: '小王',
    company: '滴滴',
    startTime: '10:00',
    endTime: '21:00',
    type: '是',
  }
])
</script>

<style scoped>
</style>