<template>
  <el-autocomplete
    v-model="state1"
    :fetch-suggestions="querySearch"
    clearable
    class="inline-input w-50"
    placeholder="Please Input"
    @select="handleSelect"
  />

  <el-row>
    <el-col :span="6">
      <el-statistic title="投递人数" :value="totalStudents" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="通过人数" :value="totalStudents" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="未处理简历数量" :value="totalStudents" />
    </el-col>
  </el-row>


  <el-row>
    <el-col :span="6">
      <el-statistic :value="totalStudentsWithExperience">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            男女比例
          </div>
        </template>
        <template #suffix>/{{totalStudents}}</template>
      </el-statistic>
    </el-col>


    <el-col :span="6">
      <el-statistic :value="totalStudentsWithExperience">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            拒绝人数占全部通过候选人比例
          </div>
        </template>
        <template #suffix>/{{totalStudents}}</template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import {
  checkJobApplicationInfo,
  getChildrenList,
  getCompanyCountResult,
  getDatesWithDailyWithStudentId,
  jobList
} from "@/request/api";

export default defineComponent({
  name:"CompanyCountView",
  setup(){
    function getCountResult(id:any){
      getCompanyCountResult(id).then(res=>{

      })
    }


    interface JobItem {
      value: string
      id: string
    }

    const state1 = ref('')

    const job = ref<JobItem[]>([])
    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? job.value.filter(createFilter(queryString))
        : job.value
      // call callback function to return suggestions
      cb(results)
    }
    const createFilter = (queryString: string) => {
      return (theJob: JobItem) => {
        return theJob.value.toLowerCase().includes(queryString.toLowerCase());
      }
    }
    const loadAll = () => {
      const jobs = reactive([
        {id: '', value: ''},
      ]);


      jobList().then(res=>{
        while(jobs.length>0){
          jobs.pop()
        }

        for(let i=0;i<res.data.length;i++){
          const name = "id:"+res.data[i].id+" "+res.data[i].name
          jobs.push({
            id: res.data[i].id,
            value: name
          })
        }
      })

      return jobs
    }

    const handleSelect = (item: JobItem) => {
      console.log(123)
    }

    onMounted(() => {
      job.value = loadAll()
    })

    return {state1,querySearch,handleSelect}
  },
  components:{

  },
})
</script>

<style scoped>

</style>