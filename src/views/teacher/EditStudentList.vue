<template>

  <el-input
    class="userInput"
    v-model="input"
    :prefix-icon="Search"
    placeholder="输入学生手机号"
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
  <el-row><el-text>编辑学生列表：</el-text></el-row>
  <el-table :data="tableData" style="width: 100%" >
    <el-table-column prop="id" label="id" width="500" />
    <el-table-column prop="name" label="姓名" width="500" />
    <el-table-column>
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-button type=primary plain class="submitButton" @click="submit" style="width: 100px">提交</el-button>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { changeStudentRelation, getChildrenList, getTeacherInformation, searchStudent } from "@/request/api";
import { Search } from '@element-plus/icons-vue'


export default defineComponent({
  name:"EditTeacherInformation",
  setup(){
    const input = ref('')
    const info = ref('')
    const phone = ref('')
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
      let ids:string[]
      ids = []
      for(let i = 0;i<tableData.length;i++){
        ids.push(tableData[i].id)
      }
      changeStudentRelation({ student_id_list:ids, phone: phone.value, info: info.value}).then(res=>{
        router.push("/teacher/teacherStudentInformation")
      })
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

    getTeacherInformation().then(res=>{
      info.value = res.data.info
      phone.value = res.data.teacherPhone
    })
    return {submit,tableData,handleDelete,handleAdd,addTableData,input,Search,searchStudentByPhone,info,phone}
  },
  components:{

  },
})
</script>

<style>
.userInput{
  width: 200px;
}
.submitButton{
  position: fixed;
  right: 200px;
}
</style>