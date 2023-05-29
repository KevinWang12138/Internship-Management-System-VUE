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
import { agreeStudent, agreeTeacher, getNewUser, refuseNewUser } from "@/request/api";
import { ElMessageBox } from "element-plus";
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

    function agree(id: string) {
      for(let i=0;i<tableData.length;i++){
        if(tableData[i].id==id){
          if(tableData[i].role=="学生"){
            let inputForm = `
    <div>
      <label for="studentId">学号</label>
      <input type="text" id="studentId" />
    </div>
    <div>
      <label for="grade">年级</label>
      <input type="text" id="grade" />
    </div>
  `;

            ElMessageBox({
              title: '输入信息',
              message: inputForm,
              showCancelButton: true,
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
            }).then(({ value }) => {
              const studentId = (document.getElementById('studentId') as HTMLInputElement)?.value;
              const grade = (document.getElementById('grade') as HTMLInputElement)?.value;
              //同意学生申请
              agreeStudent(id,grade,studentId).then(res=>{
                location.reload()
              })
            });
          }else{
            //同意老师申请
            agreeTeacher(id).then(res=>{
              location.reload()
            })
          }
          break;
        }
      }

    }
    return {tableData,refuse,agree};
  }
})



</script>

<style scoped>

</style>