<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="100" />
    <el-table-column prop="startDate" label="开始日期" width="150" />
    <el-table-column prop="endDate" label="结束日期" width="150" />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="company" label="实习公司" width="120" />
    <el-table-column prop="startTime" label="上班时间" width="120" />
    <el-table-column prop="endTime" label="下班时间" width="120" />
    <el-table-column prop="type" label="是否全日制" width="120" />
    <el-table-column fixed="right" label="Operations" width="150">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="open(row.id)">详情</el-button>
        <el-button link type="primary" size="small" @click="agree(row.id)"
        >同意</el-button
        >
        <el-button link type="primary" size="small" @click="refuse(row.id)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="drawer" title="详细信息" :with-header="false">
    <span>详细信息</span>
    <el-row>
      公司简介：{{theText}}
    </el-row>
    <el-row v-if="imageData" class="offer">
      <span>offer截图:</span>
      <img :src="imageData" alt="Image" class="downloaded-image">

    </el-row>
  </el-drawer>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import { agreeApplication, companyDetail, getApplication, getOfferPic, refuseApplication } from "@/request/api";
import { ElMessage, ElMessageBox, type Action } from "element-plus";
import axios from "axios";

function agree(id:string){
  agreeApplication(id).then(res=>{
    getApplicationInfo()//刷新申请列表
  })
}
function getApplicationInfo(){
  //后端获取申请列表
  getApplication(1,10).then(res=>{
    while(tableData.length!=0){
      tableData.pop()
    }
    for (let index=0;index<res.data.infos.length;index++){
      const info = res.data.infos[index]
      tableData.push({
        id: info.id,
        startDate: info.startDate,
        endDate: info.endDate,
        name: info.name,
        company: info.company,
        startTime: info.startTime,
        endTime: info.endTime,
        type: info.type,
        url: info.url
      })
    }
    totalPages.value= res.data.totalPages * 10
  })
}
export default defineComponent({
  name:"CheckApplicationView",
  setup(){
    function refuse(id:string){
      ElMessageBox.prompt('输入拒绝原因', 'Tip', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          refuseApplication(id,value).then(res=>{
            getApplicationInfo()//刷新申请列表
          })
        })
    }
    getApplicationInfo()

    const drawer = ref(false)
    const theText = ref("")

    const imageData = ref<string | null>(null);
    function open(id:any){
      //获取公司详情信息
      companyDetail(id).then(res=>{
        theText.value = res.data

        let url = ''
        for(let i=0;i<tableData.length;i++){
          if(tableData[i].id == id){
            url = tableData[i].url
            break;
          }
        }

        if(url!=null && url != ""){
          axios({
            url: "http://localhost:8080/teacher/offer/get?url="+url, //URL,根据实际情况来
            method: "get",
            responseType: "blob",
          }).then(function (response) {
            let blob = new Blob([response.data], { type: response.data.type });
            let url = URL.createObjectURL(blob);
            //url 你赋值给你需要展示的变量即可
            imageData.value = url
            drawer.value =true
          });
        }else{
          imageData.value = null
          drawer.value =true
        }
      })
    }

    return {tableData, totalPages, agree, refuse,open,drawer,theText,imageData}
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
    name: '',
    company: "",
    startTime: '',
    endTime: '',
    type: '',
    url: ''
  }
])
</script>

<style scoped>
.downloaded-image {
  max-width: 300px; /* 设置最大宽度 */
  max-height: 300px; /* 设置最大高度 */
}
.offer{
  margin-top: 50px;
}
</style>