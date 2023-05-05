<template>
  <el-button type=primary plain class="submitButton" @click="submit">提交</el-button>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name:"EditStudentInformation",
  setup(){
    const router = useRouter()
    function submit(){
      router.push("/student/studentInformation")
    }
    return {submit}
  },
  components:{

  },
})
</script>

<style>

</style>