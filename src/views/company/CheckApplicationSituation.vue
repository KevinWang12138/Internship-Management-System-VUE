<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="80" />
    <el-table-column prop="studentId" label="学生id" width="80" />
    <el-table-column prop="jobId" label="职位id" width="80" />
    <el-table-column prop="status" label="申请状态" width="120" />
    <el-table-column prop="studentName" label="学生姓名" width="120" />
    <el-table-column prop="studentPhone" label="学生手机号" width="200" />
    <el-table-column prop="jobName" label="职位名称" width="200" />
    <el-table-column prop="studentSchool" label="学生学校" width="120" />
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="open(row.id)">详情</el-button>
        <el-button link type="primary" size="small" :disabled="row.status=='面试通过'||row.status=='不通过'||row.status=='入职'" @click="agree(row.id)">推进</el-button>
        <el-button link type="primary" size="small" :disabled="row.status=='面试通过'||row.status=='不通过'||row.status=='入职'" @click="refuse(row.id)">淘汰</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="drawer" title="详细信息" :with-header="false">
        <div class="profile">
          <h2>基本信息</h2>
          <div class="profile-item">
            <span>姓名：</span>
            <span>{{ student.name }}</span>
          </div>
          <div class="profile-item">
            <span>手机号：</span>
            <span>{{ student.phone }}</span>
          </div>
          <div class="profile-item">
            <span>身份证号：</span>
            <span>{{ student.idCardNumber }}</span>
          </div>
          <div class="profile-item">
            <span>学校：</span>
            <span>{{ student.school }}</span>
          </div>
          <div class="profile-item">
            <span>年龄：</span>
            <span>{{ student.age }}</span>
          </div>
          <div class="profile-item">
            <span>性别：</span>
            <span>{{ student.gender }}</span>
          </div>
          <div class="profile-item">
            <span>专业：</span>
            <span>{{ student.major }}</span>
          </div>
          <div class="profile-item">
            <span>年级：</span>
            <span>{{ student.grade }}</span>
          </div>
          <div class="profile-item">
            <span>籍贯：</span>
            <span>{{ student.hometown }}</span>
          </div>
          <div class="profile-item">
            <span>现居地：</span>
            <span>{{ student.currentLocation }}</span>
          </div>
          <div class="profile-item">
            <span>研究方向：</span>
            <span>{{ student.researchArea }}</span>
          </div>
          <div class="profile-item">
            <span>个人简介：</span>
            <span>{{ student.bio }}</span>
          </div>
          <div class="profile-item">
            <span>技术栈：</span>
            <span>{{ student.techStack }}</span>
          </div>
          <div class="profile-item">
            <span>导师简介：</span>
            <span>{{ student.tutorBio }}</span>
          </div>
        </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { checkJobApplicationInfo, companyPush, companyRefuse, getStudentBasicInfo, refuseApplication } from "@/request/api";
import { ElMessageBox } from "element-plus";
const tableData = reactive([
  {
    id: '',
    studentId: '',
    jobId: '',
    status: '',
    studentName: "",
    studentPhone: '',
    jobName: '',
    studentSchool: '',
  }
])
export default defineComponent({
  name:"CheckApplicationSituation",
  setup(){
    checkJobApplicationInfo().then(res=>{
      while (tableData.length>0){
        tableData.pop()
      }
      let status = ""
      for(let i =0;i<res.data.length;i++){
        switch (res.data[i].status) {
          case 0:
            status = "待审批"
            break;
          case 1:
            status = "审批中"
            break;
          case 2:
            status = "面试中"
            break;
          case 3:
            status = "面试通过"
            break;
          case 4:
            status = "入职"
            break;
          case 5:
            status = "不通过"
            break;
        }
        tableData.push({
          id: res.data[i].id,
          studentId: res.data[i].studentId,
          jobId: res.data[i].jobId,
          status: status,
          studentName: res.data[i].studentName,
          studentPhone: res.data[i].studentPhone,
          jobName: res.data[i].jobName,
          studentSchool: res.data[i].studentSchool,
        })
      }
    })

    const drawer = ref(false)
    function open(index:any){
      //获取详细个人信息
      getStudentBasicInfo(tableData[index-1].studentId).then(res=>{
        console.log(res)
        student.age = res.data.age
        student.gender = res.data.gender
        student.hometown = res.data.hometown
        student.currentLocation = res.data.location
        student.grade = res.data.studentGrade
        student.major = res.data.studentMajor
        student.name = res.data.studentName
        student.researchArea = res.data.studentResearchDirection
        student.tutorBio = res.data.teacherInfo
        student.bio = res.data.bio
        student.idCardNumber = res.data.idCardNumber
        student.phone = res.data.studentPhone
        student.school = res.data.studentSchool
        student.techStack = res.data.techStack
        drawer.value = true
      })
    }

    const student = reactive({
      name: '张三',
        school: 'ABC大学',
        age: 22,
        gender: '男',
        major: '计算机科学',
        grade: '大四',
        hometown: '北京',
        currentLocation: '上海',
        researchArea: '人工智能',
        tutorBio: 'XXX教授是一位在人工智能领域有丰富经验的导师。',
      bio: '',
      idCardNumber: '',
      phone: '',
      techStack:''
    })

    function agree(id:any){
      companyPush(id).then(res=>{
        location.reload()
      })
    }

    function refuse(id:any){
      ElMessageBox.prompt('输入淘汰原因', 'Tip', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          companyRefuse(id,value).then(res=>{
            location.reload()
          })
        })
    }

    return {tableData,drawer,open,student,agree,refuse}
  },
  components:{

  },
})
</script>


<style scoped>
.profile {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
}

.profile h2 {
  margin-bottom: 10px;
}

.profile-item {
  margin-bottom: 10px;
}
</style>