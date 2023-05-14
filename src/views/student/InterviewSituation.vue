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

    return {tableData}
  },
  components:{

  },
})

</script>

<style scoped>

</style>

