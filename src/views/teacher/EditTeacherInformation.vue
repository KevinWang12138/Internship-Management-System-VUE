<template>
  <el-button type=primary plain class="submitButton" @click="submit">提交</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="500" />
    <el-table-column prop="name" label="姓名" width="500" />
    <el-table-column>
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name:"EditTeacherInformation",
  setup(){
    const router = useRouter()
    const tableData = reactive([
      {
        id: '1',
        name: '1',
      }
    ])
    function submit(){
      router.push("/teacher/teacherInformation")
    }

    return {submit,tableData}
  },
  components:{

  },
})
</script>

<style>

</style>