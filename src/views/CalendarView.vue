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
  name:"GoodsView",
  setup(){
    //访问后端得到日历信息
    //todo 修改手机号
    getBasicCalendarInfo({phone:'18302429455'}).then(res=>{

    })
    const resDate = reactive([
      {date: '2021-09-30', content: '放假'},
      {date: '2021-10-01', content: '放假'},
      {date: '2021-10-02', content: '划水'},
      {date: '2021-10-24', content: '学习vue'},
      {date: '2021-10-25', content: '学习vue'},
      {date: '2021-10-26', content: '学习vue'},
      {date: '2021-10-27', content: '学习vue'},
      {date: '2023-03-31', content: '学习vue'},
    ]);

    //从后端获得日历信息，key是date，content由两部分组成，实习单位：工作日
    //todo 补充休息日
    //todo 后续把详细信息补充上，比如工作日的上班时间
    //todo 额外获取额外信息，补充请假等信息



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