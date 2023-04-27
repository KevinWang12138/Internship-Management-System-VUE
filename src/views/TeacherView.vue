<template>
  <div class="teacher">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img src="src/assets/logo.webp" class="logo"></el-col>
          <el-col :span="16"><h2>这里我要放导航栏！</h2></el-col>
          <el-col :span="4"><span class="quit">这里我要放退出登录！</span></el-col>
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
  name:"TeacherView",
  setup(){
    const router = useRouter()
    const list = router.getRoutes().filter(v=>v.meta.father=='teacher').filter(v=>v.meta.isShow)
    return {list}
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
}
.el-aside{
  .el-menu{
    height: calc(100vh - 80px);
  }
}
</style>