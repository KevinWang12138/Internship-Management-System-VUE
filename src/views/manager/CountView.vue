<template>
  <el-select v-model="majorId" class="m-2" placeholder="选择专业" size="large" @change="getBasic">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-row>
    <el-col :span="6">
      <el-statistic title="总学生数" :value="totalStudents" />
    </el-col>
    <el-col :span="6">
      <el-statistic :value="totalStudentsWithExperience">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            有实习经历的学生
          </div>
        </template>
        <template #suffix>/{{totalStudents}}</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="接入公司数" :value="companyCount" />
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ChatLineRound, Male } from '@element-plus/icons-vue'
import { getBasicInfo, getMajors } from "@/request/api";
export default defineComponent({
  name:"CountView",
  setup(){
    const options = reactive([
      {
        value: 0,
        label: '全部专业',
      }
    ])
    const majorId = ref(0)
    const companyCount = ref(0)
    const totalStudentsWithExperience = ref(0)
    const totalStudents = ref(0)
    getMajors().then(res=>{
      for(let i=0;i<res.data.length;i++){
        options.push({
          value: res.data[i].id,
          label: res.data[i].name,
        })
      }
    })
    function getBasic() {
      getBasicInfo(majorId.value).then(res=>{
        console.log(res.data)
        console.log(majorId.value)
        totalStudents.value=res.data.studentCount
        totalStudentsWithExperience.value=res.data.studentWithExperienceCount
        companyCount.value=res.data.companyCount
      })
    }
    getBasic()
    return {options,majorId,getBasic,companyCount,totalStudentsWithExperience,totalStudents}
  },
  components:{

  },
})
</script>

<style scoped>

</style>