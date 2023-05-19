<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="实习公司">
      <el-col :span="5">
        <el-autocomplete
          v-model="form.region"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          placeholder="点击选择实习公司"
        />
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
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import {defineComponent, onMounted, reactive, ref} from "vue";
  import {getCompanyList, setBasicCalendarInfo} from "@/request/api";
  import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
  import type { Action } from 'element-plus'

  let form = reactive({
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

  //以下是选中的项目的值
  let companyId = ""//选中的公司id
  let newCompanyName = ""//选中的公司名
  let dateA=""//开始实习日期
  let dateB=""//结束实习日期
  let timeA=""//上班时间
  let timeB=""//下班时间
  let type = 0//工作类型
  const  getDateA = (val:Date) =>{
    let day = val.getDate().toString()
    if(day.length==1){
      day = "0" + day
    }
    if(val.getMonth()+1>=10){
      dateA=val.getFullYear()+"-"+(val.getMonth()+1)+"-"+day
    }else{
      dateA=val.getFullYear()+"-"+0+(val.getMonth()+1)+"-"+day
    }
  }
  const  getDateB = (val:Date) =>{
    let day = val.getDate().toString()
    if(day.length==1){
      day = "0" + day
    }
    if(val.getMonth()+1>=10){
      dateB=val.getFullYear()+"-"+(val.getMonth()+1)+"-"+day
    }else{
      dateB=val.getFullYear()+"-"+0+(val.getMonth()+1)+"-"+day
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
      interface CompanyInfoItem {
        value: string
        id: string
      }
      const companies = ref<CompanyInfoItem[]>([])
      const querySearch = (queryString: string, cb: any) => {
        const results = queryString
          ? companies.value.filter(createFilter(queryString))
          : companies.value
        // call callback function to return suggestions
        cb(results)
      }
      const createFilter = (queryString: string) => {
        return (companyInfoItem: CompanyInfoItem) => {
          return (
            companyInfoItem.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          )
        }
      }
      const loadAll = () => {
        getCompanyList().then(res=>{
          while(companies.value.length>0){
            companies.value.pop()
          }
          for(let index=0;index<res.data.length;index++){
            companies.value.push({ value: res.data[index].name, id: res.data[index].id })
          }
        })
        return companies.value
      }

      onMounted(() => {
        companies.value = loadAll()
        ElMessageBox.alert('如果您在系统外申请到实习，请在本页上传信息，否则请移步申请实习页面', '提示', {
          confirmButtonText: '确定',
        });
      })


      const onSubmit = () => {
        console.log(form)
        if(form.region!=''){
          newCompanyName=form.region
          for(let i = 0;i<companies.value.length;i++){
            if(companies.value[i].value==form.region){
              companyId = companies.value[i].id
              break;
            }
          }
        }else{
          companyId = '0'
          newCompanyName = form.name
        }
        //提交实习信息给后端
        setBasicCalendarInfo({
          company_id:companyId,
          company_name:newCompanyName,
          start_date:dateA,
          end_date:dateB,
          start_work_time:timeA,
          end_work_time:timeB,
          type:type,
          more_info:form.desc
        }).then(res=>{
          ElMessageBox.alert('提交成功！', '成功', {
            confirmButtonText: 'OK',
            callback: (action: Action) => {
              form.name= ''
              form.region= ''
              form.date1= ''
              form.date2= ''
              form.time1= ''
              form.time2= ''
              form.delivery= false
              form.type= []
              form.resource= ''
              form.desc= ''
            },
          })
        })
      }


      return {form, onSubmit, getTimeA, getTimeB,getDateA ,getDateB,getType,querySearch}
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