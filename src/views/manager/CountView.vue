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

  <div>
    <div id="pieChart" style="width: 400px; height: 400px;"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ChatLineRound, Male } from '@element-plus/icons-vue'
import { getBasicInfo, getCompanyCount, getMajors } from "@/request/api";
import * as echarts from 'echarts';
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
        totalStudents.value=res.data.studentCount
        totalStudentsWithExperience.value=res.data.studentWithExperienceCount
        companyCount.value=res.data.companyCount
      })
    }
    getBasic()






    function renderPieChart() {
      const companys=reactive(['Google'])
      const numbers=reactive([0])
      companys.pop()
      numbers.pop()
      getCompanyCount(0).then(res=>{
        for(let i=0;i<res.data.length;i++){
          companys.push(res.data[i].name)
          numbers.push(res.data[i].count)
        }



        const pieChart = echarts.init(document.getElementById('pieChart')!);
        const x = reactive([
          { value: numbers[0], name: companys[0] },
        ])
        x.pop()
        for(let i=0;i<companys.length;i++){
          if(i==10){
            break;
          }
          x.push({
            value: numbers[i],
            name: companys[i]
          })
        }
        const pieOptions: echarts.EChartsOption = {
          title: {
            text: '就职公司饼状图',
            subtext: '仅展现最多的十个公司',
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: companys,
          },
          series: [
            {
              name: '入职人数',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: x,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        };

        pieChart.setOption(pieOptions);
      })
    }


    return {options,majorId,getBasic,companyCount,totalStudentsWithExperience,totalStudents,renderPieChart}
  },
  components:{

  },
  mounted() {
    this.renderPieChart();
  },
  methods: {
  },
})
</script>

<style scoped>

</style>