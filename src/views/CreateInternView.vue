<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="实习公司">
      <el-col :span="5">
        <el-select v-model="form.region" placeholder="点击选择实习公司" @change="getOptionValue($event)">
          <el-option v-for="(value, index) in companyInfo" :key="index" :label="value.name" :value="value.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="text-center">
        没有找到该公司？请手动填写！
      </el-col>
      <el-col :span="5">
        <el-input v-model="form.name" />
      </el-col>
    </el-form-item>
    <el-form-item label="实习日期">
      <el-col :span="5">
        <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="请选择开始日期"
            style="width: 100%"
            @change="getDateA($event)"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
            v-model="form.date2"
            type="date"
            placeholder="请选择结束日期"
            style="width: 100%"
            @change="getDateB($event)"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="工作时间">
      <el-col :span="5">
        <el-time-picker
            v-model="form.time1"
            placeholder="请选择上班时间"
            style="width: 100%"
            @change="getTimeA($event)"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="5">
        <el-time-picker
            v-model="form.time2"
            placeholder="请选择下班时间"
            style="width: 100%"
            @change="getTimeB($event)"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="是否全日制">
      <el-switch v-model="form.delivery"  @change="getType($event)"/>
    </el-form-item>
    <el-form-item label="补充信息说明">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import {defineComponent, reactive} from "vue";
  import {getCompanyList, setBasicCalendarInfo} from "@/request/api";
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    time1: '',
    time2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })

  const onSubmit = () => {
    console.log('submit!')
    //提交实习信息给后端
    setBasicCalendarInfo({
      company_id:companyId,
      company_name:newCompanyName,
      start_date:dateA,
      end_date:dateB,
      start_work_time:timeA,
      end_work_time:timeB,
      type:type,
    })
  }

  //以下是选中的项目的值
  let companyId = ""//选中的公司id
  let newCompanyName = ""//选中的公司名
  let dateA=""//开始实习日期
  let dateB=""//结束实习日期
  let timeA=""//上班时间
  let timeB=""//下班时间
  let type = 0//工作类型
  const getOptionValue = (val: any) => {
    companyId = val
  }
  const  getDateA = (val:Date) =>{
    if(val.getMonth()+1>=10){
      dateA=val.getFullYear()+"-"+(val.getMonth()+1)+"-"+val.getDate()
    }else{
      dateA=val.getFullYear()+"-"+0+(val.getMonth()+1)+"-"+val.getDate()
    }
  }
  const  getDateB = (val:Date) =>{
    if(val.getMonth()+1>=10){
      dateB=val.getFullYear()+"-"+(val.getMonth()+1)+"-"+val.getDate()
    }else{
      dateB=val.getFullYear()+"-"+0+(val.getMonth()+1)+"-"+val.getDate()
    }
  }
  const getTimeA = (val: Date) => {
    timeA = val.getHours().toString()+":"+val.getMinutes().toString()+":"+val.getSeconds().toString()
  }

  const getTimeB = (val: Date) => {
    timeB = val.getHours().toString()+":"+val.getMinutes().toString()+":"+val.getSeconds().toString()
  }

  const getType = (val: boolean)=>{
    if(val){
      type=1//全日制工作
    }else{
      type=2//非全日制工作
    }
  }
  export default defineComponent({
    name:"CreateInternView",
    setup(){
      const companyInfo = reactive([
        {id: '', name: ''},
      ]);
      getCompanyList().then(res=>{
        console.log(res)
        companyInfo.pop()
        for(let index=0;index<res.data.length;index++){
          companyInfo.push({id:res.data[index].id,name:res.data[index].name})
        }
        companyInfo.push({id:res.data.length,name:"其他"})
      })
      console.log(companyInfo)
      return {form, onSubmit,companyInfo, getOptionValue, getTimeA, getTimeB,getDateA ,getDateB,getType}
    },
    components:{

    },
  })
</script>


<style scoped>
.text-center{
  text-align: center;
}
</style>