<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="300" />
    <el-table-column prop="name" label="公司名称" width="300" />
    <el-table-column prop="desc" label="公司描述" width="500" />
  </el-table>
</template>
<script lang="ts">
import {defineComponent, reactive} from "vue";
import { getCompanyList, getJob } from "@/request/api";
const tableData = reactive([
  {
    id: '',
    name: '',
    desc: ''
  }
])
export default defineComponent({
  name:"CompanyList",
  setup(){
    getCompanyList().then(res=>{
      while(tableData.length>0){
        tableData.pop()
      }
      for(let i=0;i<res.data.length;i++){
        tableData.push(
          {
            id: res.data[i].id,
            name: res.data[i].name,
            desc: res.data[i].description
          }
        )
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