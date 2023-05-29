<template>
  <el-button class="button-only-ok" v-if="!pushed" @click="push">仅看未通过</el-button>
  <el-button class="button-only-ok" v-else @click="ret">全部记录</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="60" />
    <el-table-column prop="startDate" label="开始日期" width="150" />
    <el-table-column prop="endDate" label="结束日期" width="150" />
    <el-table-column prop="company" label="实习公司" width="120" />
    <el-table-column prop="startTime" label="上班时间" width="120" />
    <el-table-column prop="endTime" label="下班时间" width="120" />
    <el-table-column prop="type" label="是否全日制" width="100" />
    <el-table-column prop="condition" label="审批情况" width="120" />
    <el-table-column prop="moreInfo" label="更多信息" width="200" />
  </el-table>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {getApplication, getSelfApplication} from "@/request/api";
const theTable = reactive([
  {
    id: '',
    startDate: '',
    endDate: '',
    company: "",
    startTime: '',
    endTime: '',
    type: '',
    condition: '',
    moreInfo: '',
  }
])
function getApplicationInfo(){
  //后端获取申请列表
  getSelfApplication(1,100).then(res=>{
    console.log(res.data)
    while(tableData.length!=0){
      tableData.pop()
    }
    while(theTable.length!=0){
      theTable.pop()
    }
    for (let index=0;index<res.data.infos.length;index++){
      const info = res.data.infos[index]
      let cond:string
      if(info.agreed == 1){
        cond = '已通过'
      }else if(info.agreed == -1){
        cond = '未通过'
      }else{
        cond = '待审核'
      }
      tableData.push({
        id: info.id,
        startDate: info.startDate,
        endDate: info.endDate,
        company: info.company,
        startTime: info.startTime,
        endTime: info.endTime,
        type: info.type,
        condition: cond,
        moreInfo: info.moreInfo,
      })
      theTable.push({
        id: info.id,
        startDate: info.startDate,
        endDate: info.endDate,
        company: info.company,
        startTime: info.startTime,
        endTime: info.endTime,
        type: info.type,
        condition: cond,
        moreInfo: info.moreInfo,
      })
    }
    totalPages.value= res.data.totalPages * 10
  })
}
export default defineComponent({
  name:"CheckSelfApplication",
  setup(){
    getApplicationInfo()

    const pushed = ref(false)

    function push(){
      while(tableData.length>0){
        tableData.pop()
      }
      for(let i = 0;i< theTable.length;i++){
        if(theTable[i].condition == "未通过"){
          tableData.push(theTable[i])
        }
      }
      pushed.value = true
    }
    function  ret(){
      while(tableData.length>0){
        tableData.pop()
      }
      for(let i = 0;i< theTable.length;i++){
        tableData.push(theTable[i])
      }
      pushed.value = false
    }
    return {tableData, totalPages,pushed,push,ret}
  },
  components:{

  },
})
const totalPages = ref(5000)
const tableData = reactive([
  {
    id: '',
    startDate: '',
    endDate: '',
    company: "",
    startTime: '',
    endTime: '',
    type: '',
    condition: '',
    moreInfo: '',
  }
])
</script>

<style scoped>
.button-only-ok {
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff9900; /* 主色调 */
  color: #ffffff; /* 文字颜色 */
  border-radius: 20px; /* 圆角矩形形状 */
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 悬停效果过渡 */
}

.button-only-ok:hover {
  background-color: #ffcc33; /* 悬停时的背景色 */
}

.button-only-ok:active {
  background-color: #ff6600; /* 点击时的背景色 */
}
</style>