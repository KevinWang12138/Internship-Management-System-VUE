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
      <el-statistic title="投递人数" :value="total" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="入职人数" :value="pass" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="未处理简历数量" :value="waiting" />
    </el-col>
  </el-row>


  <el-row>
    <el-col :span="6">
      <el-statistic :value="boys">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            男女比例
          </div>
        </template>
        <template #suffix>/{{girls}}</template>
      </el-statistic>
    </el-col>


    <el-col :span="6">
      <el-statistic :value="refuse">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            拒绝人数占全部候选人比例
          </div>
        </template>
        <template #suffix>/{{total}}</template>
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
        jobs.push({
          id: "0",
          value: "全部"
        })
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
      getCompanyCountResult(item.id).then(res=>{
        total.value = res.data.applicationCount
        pass.value = res.data.passCount
        waiting.value = res.data.waitingCount
        boys.value = res.data.boys
        girls.value = res.data.girls
        refuse.value = res.data.refuseCount
      })
    }

    onMounted(() => {
      job.value = loadAll()
    })
    const total = ref(0)
    const pass = ref(0)
    const waiting = ref(0)
    const  boys = ref(0)
    const girls=ref(0)
    const refuse = ref(0)

    getCompanyCountResult(0).then(res=>{
      total.value = res.data.applicationCount
      pass.value = res.data.passCount
      waiting.value = res.data.waitingCount
      boys.value = res.data.boys
      girls.value = res.data.girls
      refuse.value = res.data.refuseCount
    })
    return {state1,querySearch,handleSelect,total,pass,waiting,boys,girls,refuse}
  },
  components:{

  },
})
</script>

<style scoped>

</style>