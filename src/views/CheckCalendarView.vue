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
  console.log(111)
  getBasicCalendarInfoById(studentId).then(res=>{
    console.log(res.data)
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