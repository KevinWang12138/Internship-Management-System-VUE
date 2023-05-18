<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="150" />
    <el-table-column prop="jobName" label="职位名称" width="300" />
    <el-table-column prop="companyName" label="公司名称" width="300" />
    <el-table-column prop="date" label="入职时间" width="200" />
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

export default defineComponent({
  name:"CheckInternshipSituation",
  setup(){

    const drawer = ref(false)
    const text=ref('')
    const isEditing=ref(false)
    function open(data:any){
      drawer.value=true
    }
    const tableData = reactive([
      {id: '', jobName: '', companyName: '', date:'',text:''}
    ]);
    return {drawer,text,isEditing,open,tableData}
  },
  components:{

  },
})
</script>

<style scoped>

</style>