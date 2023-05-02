<template>
  <el-select @change="getStudentCalenderInfo('1')" v-model="value" class="m-2" placeholder="选择学生" size="large">
    <el-option v-for="(value, index) in students" :key="index" :label="value.name" :value="value.id">
    </el-option>
  </el-select>
  <el-calendar>
    <template #dateCell="{data}">
      <div class="calendar-item">
        <div class="calendar-time">
          {{ data.day.split('-').slice(2).join('')}}
        </div>
        <div>
          <span class="remark-text calendar-time" v-for="(item, index) in dealMyDate(data.day)" :key="index">
            {{ item }}
          </span>
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {getBasicCalendarInfoById, getChildrenList} from "@/request/api";

function getStudentCalenderInfo(studentId: any) {
  getBasicCalendarInfoById(studentId).then(res=>{
    //res返回
    const companyNames=res.data.company_names
    const endDates=res.data.end_dates
    const startDates=res.data.start_dates
    for (let index=0;index<companyNames.length;index++) {
      let startDate = startDates[index]
      let endDate = endDates[index]

      let info = companyNames[index] + "实习 工作日"

      let myDate = new Date(startDate);
      let end = new Date(endDate);
      while (myDate <= end) {
        let d = ""
        d += myDate.getFullYear()
        d += "-"
        let month = myDate.getMonth() + 1
        if (month.toString().length == 1) {
          d += "0"
          d += month
        } else {
          d += month
        }
        d += "-"
        let day = myDate.getDate()
        if (day.toString().length == 1) {
          d += "0"
          d += myDate.getDate()
        } else {
          d += myDate.getDate()
        }
        resDate.push({date: d, content: info})
        myDate.setDate(myDate.getDate() + 1)
      }
    }
  })
}

const resDate = reactive([
  {date: '', content: ''},
]);

const dealMyDate =reactive( (v: string) => {
  let res = '';
  for (let index = 0; index < resDate.length; index++) {
    if (resDate[index].date == v) {
      res = resDate[index].content;
      break;
    }
  }
  return res;
})
export default defineComponent({
  name:"CheckApplicationView",
  setup(){
    const students = reactive([
      {id: '', name: ''},
    ]);
    getChildrenList().then(res=>{
      students.pop()
      for(let index=0;index<res.data.length;index++){
        students.push({id:res.data[index].id,name:res.data[index].name})
      }
    })

    return {value, students, dealMyDate, getStudentCalenderInfo}
  },
  components:{

  },
})

const value = ref('')
</script>

<style scoped>

</style>