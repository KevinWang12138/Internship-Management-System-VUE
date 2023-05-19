<template>
  <el-autocomplete
    v-model="state1"
    :fetch-suggestions="querySearch"
    clearable
    class="inline-input w-50"
    placeholder="Please Input"
    @select="handleSelect"
  />

  <el-calendar>
    <template #dateCell="{data}">
      <div class="calendar-item" @click="open(data)" :class="{ highlighted: shouldHighlightDate(data.day) }">
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

  <el-drawer v-model="drawer" title="实习日报" :with-header="false">
    <span>实习日报</span>
    <div>
      <textarea v-model="text" :disabled="!isEditing" rows="40" style="width: 90%"></textarea>
      <el-row></el-row>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from "vue";
import {
  getBasicCalendarInfoById,
  getChildrenList,
  getDaily,
  getDailyWithStudentId,
  getDatesWithDaily, getDatesWithDailyWithStudentId
} from "@/request/api";

function getStudentCalenderInfo(studentId: any) {
  while(resDate.length>0){
    resDate.pop()
  }
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
      {id: '', value: ''},
    ]);



    interface StudentItem {
      value: string
      id: string
    }

    const state1 = ref('')

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
    const loadAll = () => {
      getChildrenList().then(res=>{
        for(let index=0;index<res.data.length;index++){
          students.push({id:res.data[index].id,value:res.data[index].name})
        }
      })

      return students
    }
    const studentId = ref('')
    const datesWithDaily = reactive([""]);
    const handleSelect = (item: StudentItem) => {
      getStudentCalenderInfo(item.id)
      studentId.value = item.id


      getDatesWithDailyWithStudentId(item.id).then(res=>{
        while(datesWithDaily.length>0){
          datesWithDaily.pop()
        }
        for(let i=0;i<res.data.length;i++){
          datesWithDaily.push(res.data[i])
        }
      })
    }

    onMounted(() => {
      student.value = loadAll()
    })





    const drawer = ref(false)
    const text=ref('')
    const isEditing=ref(false)
    function toggleEditing() {
      isEditing.value = !isEditing.value
    }
    const date=ref('')
    function open(data:any){
      text.value=''
      //从后端获取日报信息
      getDailyWithStudentId(data.day,studentId.value).then(res=>{
        drawer.value = true
        text.value = res.data.text
        console.log(text.value)
      })
      date.value=data.day
    }

    const shouldHighlightDate = (date:any) => {
      return datesWithDaily.includes(date);
    };
    return {value, students, dealMyDate, getStudentCalenderInfo, querySearch,state1,handleSelect,drawer, open,text,isEditing,toggleEditing,shouldHighlightDate}
  },
  components:{

  },
})

const value = ref('')

function createFilter(queryString: string): any {
    throw new Error("Function not implemented.");
}
</script>

<style scoped>
.highlighted {
  background-color: lightblue;
}
</style>