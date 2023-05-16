<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="200" />
    <el-table-column prop="name" label="职位名称" width="300" />
    <el-table-column prop="info" label="职位描述" width="400" />
    <el-table-column prop="count" label="职位数量" width="300" />
  </el-table>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import { checkJobApplicationInfo } from "@/request/api";
const tableData = reactive([
  {
    id: '',
    name: '',
    info: '',
    count: ''
  }
])
export default defineComponent({
  name:"TheJobs",
  setup(){
    return {tableData}
  },
  components:{

  },
})
</script>

<style scoped>

</style>