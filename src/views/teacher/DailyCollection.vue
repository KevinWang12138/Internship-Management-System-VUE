<template>
  <el-autocomplete
    v-model="state1"
    :fetch-suggestions="querySearch"
    clearable
    class="inline-input w-50"
    placeholder="Please Input"
    @select="handleSelect"
  />
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="150" />
    <el-table-column prop="companyName" label="公司名称" width="200" />
    <el-table-column prop="date" label="日期" width="200" />
    <el-table-column prop="studentId" label="学生id" width="200" />
    <el-table-column prop="studentName" label="学生姓名" width="200" />
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="open(row.id)">查看日志详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { getAllDaily, getChildrenList } from "@/request/api";
export default defineComponent({
  name:"DailyCollection",
  setup(){
    const tableData = reactive([
      {id: '', date: '', companyName: '', studentId:'',studentName:''}
    ]);
    function getDaily(id:any){
      getAllDaily(id).then(res=>{
        while(tableData.length>0){
          tableData.pop()
        }
        for(let i=0;i<res.data.length;i++){
          tableData.push({
            id: res.data[i].id,
            date: res.data[i].date,
            companyName: res.data[i].companyName,
            studentId:res.data[i].studentId,
            studentName:res.data[i].studentName
          })
        }
        console.log(res)
      })
    }
    getDaily(0)

    function handleSelect(){

      let id = '0';
      for(let i=0;i<tableData.length;i++){
        if(tableData[i].studentName == state1.value){
          id = tableData[i].id
          break;
        }
      }
      getDaily(id)
    }

    interface StudentItem {
      value: string
      id: string
    }

    const state1 = ref('')
    const students = reactive([
      {id: '', value: ''},
    ]);
    const student = ref<StudentItem[]>([])
    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? student.value.filter(createFilter(queryString))
        : student.value
      // call callback function to return suggestions
      cb(results)
    }
    const createFilter = (queryString: string) => {
      return (restaurant: StudentItem) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }
    onMounted(() => {
      student.value = loadAll()
    })
    const loadAll = () => {
      getChildrenList().then(res=>{
        for(let index=0;index<res.data.length;index++){
          students.push({id:res.data[index].id,value:res.data[index].name})
        }
      })

      return students
    }
    return {students, querySearch,state1,tableData,handleSelect}
  },
  components:{

  },
})
</script>

<style scoped>

</style>