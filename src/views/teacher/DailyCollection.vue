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

  <el-drawer v-model="drawer" title="实习日报" :with-header="false">
    <span>实习日报</span>
    <div>
      <textarea v-model="text" :disabled="!isEditing" rows="40" style="width: 90%"></textarea>
      <el-row></el-row>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { getAllDaily, getChildrenList, getDailyWithStudentId } from "@/request/api";
export default defineComponent({
  name:"DailyCollection",
  setup(){
    const tableData = reactive([
      {id: '', date: '', companyName: '', studentId:'',studentName:'',text:''}
    ]);
    const theTable = reactive([
      {id: '', date: '', companyName: '', studentId:'',studentName:'',text:''}
    ]);
    function getDaily(id:any){
      getAllDaily(id).then(res=>{
        while(tableData.length>0){
          tableData.pop()
        }
        while(theTable.length>0){
          theTable.pop()
        }
        for(let i=0;i<res.data.length;i++){
          tableData.push({
            id: res.data[i].id,
            date: res.data[i].date,
            companyName: res.data[i].companyName,
            studentId:res.data[i].studentId,
            studentName:res.data[i].studentName,
            text:res.data[i].text
          })
          theTable.push({
            id: res.data[i].id,
            date: res.data[i].date,
            companyName: res.data[i].companyName,
            studentId:res.data[i].studentId,
            studentName:res.data[i].studentName,
            text:res.data[i].text
          })
        }
      })
    }
    getDaily(0)

    function handleSelect(){
      console.log(state1.value)
      if(state1.value!=""){
        while(tableData.length>0){
          tableData.pop()
        }
        for(let i=0;i<theTable.length;i++){
          if(theTable[i].studentName==state1.value){
            tableData.push(theTable[i])
          }
        }
      }
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
    const drawer = ref(false)
    const text=ref('')
    const isEditing=ref(false)
    function open(data:any){
      text.value=tableData[data-1].text
      drawer.value=true
    }
    return {students, querySearch,state1,tableData,handleSelect,drawer, open,text,isEditing}
  },
  components:{

  },
})
</script>

<style scoped>

</style>