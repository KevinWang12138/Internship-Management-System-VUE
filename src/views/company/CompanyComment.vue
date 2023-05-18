<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="100" />
    <el-table-column prop="studentId" label="学生id" width="200" />
    <el-table-column prop="studentName" label="学生姓名" width="300" />
    <el-table-column prop="jobId" label="职位id" width="200" />
    <el-table-column prop="jobName" label="职位" width="300" />
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="open(row.id)">评价</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-drawer v-model="drawer" title="评价系统" :with-header="false">
    <span>评价系统</span>
    <div>
      <textarea v-model="text" :disabled="!isEditing" rows="40" style="width: 90%"></textarea>
      <el-row></el-row>
      <button @click="toggleEditing">{{ isEditing ? '完成编辑' : '编辑' }}</button>
      <button @click="submit" :disabled="!isEditing">提交</button>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { checkJobApplicationInfo, getDaily, getWorkingStudent, postDaily, updateComment } from "@/request/api";

export default defineComponent({
  name:"CompanyCommentView",
  setup(){
    const tableData = reactive([
      {
        id: '',
        studentId: '',
        studentName: '',
        jobId: '',
        jobName: '',
        comment: ''
      }
    ])

    getWorkingStudent().then(res=>{
      while(tableData.length>0){
        tableData.pop()
      }
      for(let i=0;i<res.data.length;i++){
        tableData.push({
          id: res.data[i].id,
          studentId: res.data[i].studentId,
          studentName: res.data[i].studentName,
          jobId: res.data[i].jobId,
          jobName: res.data[i].jobName,
          comment: res.data[i].comment
        })
      }
    })

    const drawer = ref(false)
    const text=ref('')
    const isEditing=ref(false)
    function toggleEditing() {
      isEditing.value = !isEditing.value
    }
    function submit() {
      updateComment({
        id: id.value,
        comment: text.value
      }).then(res=>{
        //刷新页面
        location.reload()
      })
    }
    const id = ref('')
    function open(index:any){
      //获取评价
      text.value = tableData[index-1].comment
      id.value = tableData[index-1].id
      drawer.value = true
    }
    return {tableData,drawer,text,isEditing,toggleEditing,submit,open}
  },
  components:{

  },
})
</script>

<style scoped>

</style>