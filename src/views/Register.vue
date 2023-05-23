<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item label="学校" prop="school">
      <el-autocomplete
        v-model="ruleForm.school"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </el-form-item>

    <el-form-item label="身份" prop="type">
      <el-radio-group v-model="ruleForm.type">
        <el-radio label="学生" />
        <el-radio label="教师" />
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { getAllSchool, getChildrenList, getDatesWithDailyWithStudentId, login, register } from "@/request/api";
import { useRouter } from "vue-router";
import { LoginData } from "@/type/login";


export default defineComponent({
  setup(){
    const router = useRouter()
    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive({
      name: '',
      phone: '',
      password: '',
      school: '',
      type: '',
    })

    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ],
      school: [
        { required: true, message: '请输入学校名称', trigger: 'blur' }
      ],
      type: [
        { required: true, message: '必须选择一个类型', trigger: 'blur' }
      ],
    })

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          let type = 1
          if(ruleForm.type == "学生"){
            type = 1
          }else if(ruleForm.type == "教师"){
            type = 2
          }
          register({
            name: ruleForm.name,
            phone: ruleForm.phone,
            password: ruleForm.password,
            school: ruleForm.school,
            role: type
          }).then(res=>{
            router.push("/")
          })
        }
      })
    }







    interface SchoolItem {
      value: string
      id: string
    }

    const state1 = ref('')

    const school = ref<SchoolItem[]>([])
    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? school.value.filter(createFilter(queryString))
        : school.value
      // call callback function to return suggestions
      cb(results)
    }
    const createFilter = (queryString: string) => {
      return (schoolItem: SchoolItem) => {
        return (
          schoolItem.value.toLowerCase().includes(queryString.toLowerCase())
        )
      }
    }
    const schools = reactive([
      {id: '', value: ''},
    ]);
    const loadAll = () => {
      getAllSchool().then(res=>{
        for(let index=0;index<res.data.length;index++){
          schools.push({id:res.data[index].id,value:res.data[index].name})
        }
      })

      return schools
    }

    onMounted(() => {
      school.value = loadAll()
    })

    const handleSelect = (item: SchoolItem) => {

    }
    return {formSize,ruleFormRef,ruleForm,rules,submitForm,state1,handleSelect,querySearch};
  }
})



</script>


<style scoped>

</style>