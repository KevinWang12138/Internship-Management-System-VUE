<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="150" />
    <el-table-column prop="name" label="职位名称" width="150" />
    <el-table-column prop="companyName" label="公司名称" width="150" />
    <el-table-column prop="info" label="职位信息" width="500" />
    <el-table-column prop="count" label="职位数量" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="agree(row.id)">申请</el-button>
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
    name: '',
    companyName: '',
    info: '',
    count: '',
  }
])
export default defineComponent({
  name:"CheckJobs",
  setup(){

    return {tableData}
  },
  components:{

  },
})
</script>


<style scoped>

</style>