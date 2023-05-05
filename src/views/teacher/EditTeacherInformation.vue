<template>
  <el-button type=primary plain class="submitButton" @click="submit">提交</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="500" />
    <el-table-column prop="name" label="姓名" width="500" />
    <el-table-column>
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { getChildrenList } from "@/request/api";

export default defineComponent({
  name:"EditTeacherInformation",
  setup(){
    const router = useRouter()
    const tableData = reactive([
      {
        id: '1',
        name: '1',
      }
    ])
    function submit(){
      router.push("/teacher/teacherInformation")
    }
    getChildrenList().then(res=>{
      while (tableData.length!=0){
        tableData.pop()
      }
      for(let i=0;i<res.data.length;i++){
        tableData.push({
          id:res.data[i].id,
          name:res.data[i].name
        })
      }
    })
    function handleDelete(row){
      const index = tableData.indexOf(row);
      if (index !== -1) {
        tableData.splice(index, 1);
      }
    }
    return {submit,tableData,handleDelete}
  },
  components:{

  },
})
</script>

<style>

</style>