<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img src="src/assets/logo.png" class="logo"></el-col>
          <el-col :span="16"><h2>欢迎登录</h2></el-col>
          <el-col :span="4" class="quit"> <el-button type="quit" class="mb-4" @click="exit">退出登录</el-button></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              router
          >
            <el-menu-item :index="item.path" v-for="item in list" :key=item.path>
              <el-icon><icon-menu /></el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
export default defineComponent({
  name:"HomeView",
  setup(){
    const router = useRouter()
    const list = router.getRoutes().filter(v=>v.meta.father=='home').filter(v=>v.meta.isShow)
    function exit(){
      localStorage.removeItem("student")
      localStorage.removeItem("teacher")
      localStorage.removeItem("manager")
      localStorage.removeItem("token")
      localStorage.removeItem("phone")
      router.push('/')
    }
    return {list,exit}
  },
  components:{

  },
})

</script>

<style lang="scss" scoped>
.el-header{
  height: 80px;
  background-color: #666;
  .logo{
    height: 80px;
  }
  h2{
    height: 80px;
    text-align: center;
    line-height: 80px;
  }//todo 这个地方后续要删掉
  .quit{
    height: 80px;
    text-align: center;
    line-height: 80px;
  }
  .mb-4{
    width: 100px;
    height: 50px;
  }
}
.el-aside{
  .el-menu{
    height: calc(100vh - 80px);
  }
}
</style>