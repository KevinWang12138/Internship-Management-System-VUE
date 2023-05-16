<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="职位名称" >
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="职位说明">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="剩余职位数量">
      <el-input v-model="form.count"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import { postJob } from "@/request/api";
import router from "@/router";

let form = reactive({
  name: '',
  desc: '',
  count: 0
})
const onSubmit = () => {
  console.log(form)

  postJob({
    name: form.name,
    info: form.desc,
    count: form.count,
  }).then(res=>{
    router.push('/company/jobs')
  })
}

export default defineComponent({
  name:"PostJob",
  setup(){

    return {form, onSubmit}
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