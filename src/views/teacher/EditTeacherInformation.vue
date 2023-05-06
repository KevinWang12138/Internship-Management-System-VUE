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
  <el-input
    class="userInput"
    v-model="input"
    :prefix-icon="Search"
  >输入框</el-input>
  <el-button type="primary" @click="searchStudentByPhone">搜索</el-button>
  <p>搜索结果</p>
  <el-table :data="addTableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="500" />
    <el-table-column prop="name" label="姓名" width="500" />
    <el-table-column>
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="handleAdd(row)">添加</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getChildrenList, searchStudent } from "@/request/api";
import { Search } from '@element-plus/icons-vue'


export default defineComponent({
  name:"EditTeacherInformation",
  setup(){
    const input = ref('')
    function searchStudentByPhone(){
      searchStudent(input.value).then(res=>{
        let ok = true
        const id = res.data.id
        for(let i = 0;i<tableData.length;i++){
          if(tableData[i].id==id){
            ok=false
            break
          }
        }
        if(ok){
          addTableData.pop()
          addTableData.push({
            id: res.data.id,
            name: res.data.name
          })
        }

      })
    }
    const router = useRouter()
    const tableData = reactive([
      {
        id: '',
        name: '',
      }
    ])
    const addTableData = reactive([
      {
        id: '',
        name: '',
      }
    ])
    addTableData.pop()
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
    function handleDelete(row: { id: string; name: string; }){
      const index = tableData.indexOf(row);
      if (index !== -1) {
        tableData.splice(index, 1);
      }
    }
    function handleAdd(row: { id: string; name: string; }){
      const index = tableData.indexOf(row);
      if(index==-1){
        tableData.push(row)
      }
    }
    return {submit,tableData,handleDelete,handleAdd,addTableData,input,Search,searchStudentByPhone}
  },
  components:{

  },
})
</script>

<style>
.userInput{
  width: 200px;
}
</style>