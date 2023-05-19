<template>
  <div class="search-container">
    <el-input class="search-input" v-model="searchKeyword" placeholder="输入公司名称" clearable></el-input>
    <el-button class="search-button" type="primary" @click="search">搜索</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="300" />
    <el-table-column prop="name" label="公司名称" width="300" />
    <el-table-column prop="desc" label="公司描述" width="500" />
  </el-table>
</template>
<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import { getCompanyList, getCompanyListWithKeyword, getJob } from "@/request/api";
const tableData = reactive([
  {
    id: '',
    name: '',
    desc: ''
  }
])
export default defineComponent({
  name:"CompanyList",
  setup(){
    getCompanyList().then(res=>{
      while(tableData.length>0){
        tableData.pop()
      }
      for(let i=0;i<res.data.length;i++){
        tableData.push(
          {
            id: res.data[i].id,
            name: res.data[i].name,
            desc: res.data[i].description
          }
        )
      }
    })

    const searchKeyword = ref("")
    function search(){
      getCompanyListWithKeyword(searchKeyword.value).then(res=>{
        while(tableData.length>0){
          tableData.pop()
        }
        for(let i=0;i<res.data.length;i++){
          tableData.push(
            {
              id: res.data[i].id,
              name: res.data[i].name,
              desc: res.data[i].description
            }
          )
        }
      })
    }
    return {tableData,search,searchKeyword}
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