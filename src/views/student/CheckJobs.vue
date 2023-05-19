<template>
  <div class="search-container">
    <el-input class="search-input" v-model="searchKeyword" placeholder="输入公司名称/职位名称" clearable></el-input>
    <el-button class="search-button" type="primary" @click="search">搜索</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="150" />
    <el-table-column prop="name" label="职位名称" width="200" />
    <el-table-column prop="companyName" label="公司名称" width="200" />
    <el-table-column prop="department" label="所属部门" width="200" />
    <el-table-column prop="count" label="职位数量" width="200" />
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="{ row }">
        <el-button link type="primary" size="small">投递职位</el-button>
        <el-button link type="primary" size="small" @click="open(row.id)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="drawer" title="详细信息" :with-header="false">
    <span>详细信息</span>
    <el-row>
      {{theText}}
    </el-row>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { getDaily, getJob, getJobByLike } from "@/request/api";
const tableData = reactive([
  {
    id: '',
    name: '',
    companyName: '',
    info: '',
    count: '',
    department: ''
  }
])
export default defineComponent({
  name:"CheckJobs",
  setup(){
    getJob().then(res=>{
      while(tableData.length>0){
        tableData.pop()
      }
      for(let i=0;i<res.data.length;i++){
        tableData.push(
          {
            id: res.data[i].id,
            name: res.data[i].name,
            companyName: res.data[i].company_name,
            info: res.data[i].info,
            count: res.data[i].count,
            department: res.data[i].department,
          }
        )
      }
    })
    const drawer = ref(false)
    const theText = ref("")
    function open(row:any){
      drawer.value = true
      theText.value = tableData[row-1].info
      console.log(row)
      console.log(tableData)
    }
    const searchKeyword = ref("")
    function search(){
      getJobByLike(searchKeyword.value).then(res=>{
        while(tableData.length>0){
          tableData.pop()
        }
        for(let i=0;i<res.data.length;i++){
          tableData.push(
            {
              id: res.data[i].id,
              name: res.data[i].name,
              companyName: res.data[i].company_name,
              info: res.data[i].info,
              count: res.data[i].count,
              department: res.data[i].department,
            }
          )
        }
      })
    }
    return {tableData,drawer,open,theText,searchKeyword,search}
  },
  components:{

  },
})
</script>


<style scoped>

.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  margin-right: 10px; /* 调整输入框与按钮之间的间距 */
}

.search-button {
  flex-shrink: 0; /* 防止按钮被压缩 */
}
</style>