<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="100" />
    <el-table-column prop="status" label="申请状态" width="200" />
    <el-table-column prop="jobName" label="职位名称" width="200" />
    <el-table-column prop="companyName" label="公司名称" width="200" />
    <el-table-column prop="moreInfo" label="更多信息" width="300" />
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="{ row }">
        <el-button link type="primary" size="small" :disabled="!canClick(row)" @click="agree(row.id)">接受</el-button>
        <el-button link type="primary" size="small" :disabled="!canClick(row)" @click="refuse(row.id)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>



  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
  >
    <span>接收offer前，请联系hr沟通入职时间和工作时间，该时间将提交给导师进行审批</span>
    <template #footer>
      <el-form-item label="实习日期">
        <el-col :span="10">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="请选择开始日期"
            style="width: 100%"
            @change="getDateA($event)"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="10">
          <el-date-picker
            v-model="form.date2"
            type="date"
            placeholder="请选择结束日期"
            style="width: 100%"
            @change="getDateB($event)"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="工作时间">
        <el-col :span="10">
          <el-time-picker
            v-model="form.time1"
            placeholder="请选择上班时间"
            style="width: 100%"
            @change="getTimeA($event)"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="10">
          <el-time-picker
            v-model="form.time2"
            placeholder="请选择下班时间"
            style="width: 100%"
            @change="getTimeB($event)"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="是否全日制">
        <el-switch v-model="form.delivery"  @change="getType($event)"/>
      </el-form-item>


      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>



</template>
<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import { checkInterviewSituation, refuseInternview, studentPush } from "@/request/api";
const tableData = reactive([
  {
    id: '',
    status: '',
    jobName: '',
    companyName: '',
    moreInfo: ''
  }
])
export default defineComponent({
  name:"InterviewSituation",
  setup(){
    while(tableData.length>0){
      tableData.pop()
    }
    //0待审批，1审批中，2面试中，3面试通过，4入职，5不通过，6待导师审批
    checkInterviewSituation().then(res=>{
      let status = ""
      for(let i=0;i<res.data.length;i++){
        switch (res.data[i].status) {
          case 0:
            status = "待审批"
            break;
          case 1:
            status = "审批中"
            break;
          case 2:
            status = "面试中"
            break;
          case 3:
            status = "面试通过"
            break;
          case 4:
            status = "入职"
            break;
          case 5:
            status = "不通过"
            break;
          case 6:
            status = "待学校导师审批"
            break;
          case 7:
            status = "候选人拒绝"
            break;
        }
        tableData.push({
          id: res.data[i].id,
          status: status,
          jobName: res.data[i].jobName,
          companyName: res.data[i].companyName,
          moreInfo: res.data[i].moreInfo
        })
      }
    })
    function canClick(row:any){
      return row.status == "面试通过"
    }

    const dialogVisible = ref(false)
    let id = 0
    function agree(iid:any){
      id = iid
      dialogVisible.value = true
    }
    function refuse(id:any){
      refuseInternview(id).then(res=>{
          location.reload()
        }
      )
    }
    let form = reactive({
      date1: '',
      date2: '',
      time1: '',
      time2: '',
      delivery: false,
    })
    let dateA=""//开始实习日期
    let dateB=""//结束实习日期
    let timeA=""//上班时间
    let timeB=""//下班时间
    let type = 0//工作类型
    const  getDateA = (val:Date) =>{
      let day = val.getDate().toString()
      if(day.length==1){
        day = "0" + day
      }
      if(val.getMonth()+1>=10){
        dateA=val.getFullYear()+"-"+(val.getMonth()+1)+"-"+day
      }else{
        dateA=val.getFullYear()+"-"+0+(val.getMonth()+1)+"-"+day
      }
    }
    const  getDateB = (val:Date) =>{
      let day = val.getDate().toString()
      if(day.length==1){
        day = "0" + day
      }
      if(val.getMonth()+1>=10){
        dateB=val.getFullYear()+"-"+(val.getMonth()+1)+"-"+day
      }else{
        dateB=val.getFullYear()+"-"+0+(val.getMonth()+1)+"-"+day
      }
    }
    const getTimeA = (val: Date) => {
      timeA = val.getHours().toString()+":"+val.getMinutes().toString()+":"+val.getSeconds().toString()
    }

    const getTimeB = (val: Date) => {
      timeB = val.getHours().toString()+":"+val.getMinutes().toString()+":"+val.getSeconds().toString()
    }

    const getType = (val: boolean)=>{
      if(val){
        type=1//全日制工作
      }else{
        type=2//非全日制工作
      }
    }

    function submit(){

      studentPush({
        id:id,
        start_date:dateA,
        end_date:dateB,
        start_time:timeA,
        end_time:timeB,
        type:type
      }).then(res=>{
        location.reload()
      })
    }
    return {tableData,canClick, agree, refuse,dialogVisible,form,submit,getDateA,getDateB,getTimeA,getTimeB,getType}
  },
  components:{

  },
})

</script>

<style scoped>

</style>

