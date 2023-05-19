<template>
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
      <button @click="toggleEditing">{{ isEditing ? '完成编辑' : '编辑' }}</button>
      <button @click="submit" :disabled="!isEditing">提交</button>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import { getBasicCalendarInfo, getDaily, getDatesWithDaily, postDaily } from "@/request/api";
import router from "@/router";

export default defineComponent({
  name:"CalendarView",
  setup(){
    const drawer = ref(false)
    const resDate = reactive([
      {date: '', content: '',company: ''},
    ]);
    //访问后端得到日历信息
    //从后端获得日历信息，key是date，content由两部分组成，实习单位：工作日
    getBasicCalendarInfo({student_id:localStorage.getItem("phone")?.toString()}).then(res=>{
      //res返回
      const companyNames=res.data.company_names
      const endDates=res.data.end_dates
      const startDates=res.data.start_dates
      for (let index=0;index<companyNames.length;index++){
        let startDate=startDates[index]
        let endDate=endDates[index]

        let info=companyNames[index]+"实习 工作日"

        let myDate=new Date(startDate);
        let end=new Date(endDate);
        while(myDate<=end){
          let d=""
          d+=myDate.getFullYear()
          d+="-"
          let month=myDate.getMonth()+1
          if(month.toString().length==1){
            d+="0"
            d+=month
          }else{
            d+=month
          }
          d+="-"
          let day=myDate.getDate()
          if(day.toString().length==1){
            d+="0"
            d+=myDate.getDate()
          }else {
            d+=myDate.getDate()
          }
          resDate.push({date: d,content: info,company: companyNames[index]})
          myDate.setDate(myDate.getDate()+1)
        }
      }
    })


    const dealMyDate = (v: string) => {
      let res = '';
      for (let index = 0; index < resDate.length; index++) {
        if (resDate[index].date == v) {
          res = resDate[index].content;
          break;
        }
      }
      return res;
    }
    const text=ref('')
    const date=ref('')
    function open(data:any){
      text.value=''
      companyVal.value=''

      for(let i=0;i<resDate.length;i++){
        if(resDate[i].date==data.day){
          //从后端获取日报信息
          getDaily(data.day).then(res=>{
            drawer.value = true
            text.value = res.data.text
          })
          date.value=data.day
          companyVal.value=resDate[i].company
          return
        }
      }
    }
    const isEditing=ref(false)
    function toggleEditing() {
      isEditing.value = !isEditing.value
    }
    const companyVal = ref("")
    function submit() {
      postDaily({
        date:date.value,
        text:text.value,
        company: companyVal.value
      }).then(res=>{
        console.log(res)
      })
      toggleEditing();
      location.reload();
    }
    const datesWithDaily = reactive([""]);
    getDatesWithDaily().then(res=>{
      while(datesWithDaily.length>0){
        datesWithDaily.pop()
      }
      for(let i=0;i<res.data.length;i++){
        datesWithDaily.push(res.data[i])
      }
    })
    const shouldHighlightDate = (date:any) => {
      return datesWithDaily.includes(date);
    };
    return {dealMyDate,drawer, open,submit,text,isEditing,toggleEditing,shouldHighlightDate}
  },
  components:{

  },
})
</script>

<style scoped>
.highlighted {
  background-color: lightblue;
}
</style>