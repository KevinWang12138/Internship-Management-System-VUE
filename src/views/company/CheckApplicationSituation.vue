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
        <el-button link type="primary" size="small" @click="agree(row.id)"
        >推进到下一阶段</el-button
        >
        <el-button link type="primary" size="small" @click="refuse(row.id)">淘汰</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--底部的分页-->
  <el-pagination background layout="prev, pager, next" :total="totalPages"/>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";

export default defineComponent({
  name:"CheckApplicationSituation",
  setup(){

    return {}
  },
  components:{

  },
})
</script>


<style scoped>

</style>