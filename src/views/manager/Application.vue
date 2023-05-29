<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="200" />
    <el-table-column prop="name" label="姓名" width="200" />
    <el-table-column prop="role" label="角色" width="200" />
    <el-table-column prop="phone" label="手机号" width="300" />
    <el-table-column prop="major" label="学院/专业" width="200" />
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="agree(row.id)">同意</el-button>
        <el-button link type="primary" size="small" @click="refuse(row.id)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { getNewUser, refuseNewUser } from "@/request/api";
export default defineComponent({
  name:"ApplicationUser",
  setup(){
    const tableData = reactive([
      {
        id: '',
        name: '',
        role: '',
        phone: '',
        major: ''
      }
    ])
    while(tableData.length>0){
      tableData.pop()
    }
    //获取用户信息
    getNewUser().then(res=>{
      console.log(res)
      for(let i=0;i<res.data.length;i++){
        tableData.push({
          id: res.data[i].id,
          name: res.data[i].name,
          role: res.data[i].role,
          phone: res.data[i].phone,
          major: res.data[i].major
        })
      }
    })
    function refuse(id:any){
      refuseNewUser(id).then(res=>{
        location.reload()
      })
    }
    return {tableData,refuse};
  }
})



</script>

<style scoped>

</style>