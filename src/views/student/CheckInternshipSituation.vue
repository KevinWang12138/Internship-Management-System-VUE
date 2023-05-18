<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="150" />
    <el-table-column prop="jobName" label="职位名称" width="300" />
    <el-table-column prop="companyName" label="公司名称" width="300" />
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="open(row.id)">查看评价信息</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-drawer v-model="drawer" title="hr评价" :with-header="false">
    <span>hr评价</span>
    <div>
      <textarea v-model="text" :disabled="!isEditing" rows="40" style="width: 90%"></textarea>
      <el-row></el-row>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { getInternshipSituation } from "@/request/api";

export default defineComponent({
  name:"CheckInternshipSituation",
  setup(){

    const drawer = ref(false)
    const text=ref('')
    const isEditing=ref(false)
    function open(data:any){
      text.value = tableData[data-1].text
      drawer.value=true
    }
    const tableData = reactive([
      {id: '', jobName: '', companyName: '', text:''}
    ]);

    getInternshipSituation().then(res=>{
      console.log(res)
      while(tableData.length>0){
        tableData.pop()
      }
      for(let i=0;i<res.data.length;i++){
        tableData.push({
          id: res.data[i].id,
          jobName: res.data[i].jobName,
          companyName: res.data[i].companyName,
          text:res.data[i].text
        })
      }
    })
    return {drawer,text,isEditing,open,tableData}
  },
  components:{

  },
})
</script>

<style scoped>

</style>