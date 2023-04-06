<template>
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
import {defineComponent, reactive} from "vue";
import {getBasicCalendarInfo} from "@/request/api";

export default defineComponent({
  name:"CalendarView",
  setup(){
    const resDate = reactive([
      {date: '', content: ''},
    ]);
    //访问后端得到日历信息
    //todo 修改手机号为获取数据，而不是写死
    //从后端获得日历信息，key是date，content由两部分组成，实习单位：工作日
    //todo 补充休息日
    //todo 额外获取额外信息，补充请假等信息
    getBasicCalendarInfo({student_id:'18302429555'}).then(res=>{
      //res返回
      console.log(res)
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
          resDate.push({date: d,content: info})
          console.log(d)
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
    return {dealMyDate}
  },
  components:{

  },
})
</script>

<style scoped>

</style>