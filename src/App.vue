<script>
import NotFound from './components/NotFound.vue'
import Login from './components/login/Login.vue'
const routes = {
  '/login': Login
}
export default {
  data() {
    return {
      currentPath: window.location.hash,
      divClass: 'navigation'
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>
<template>
  <div :class="divClass" class="divClass">
    <a class="loginA" href="#/login">登录</a> | <a class="notfoundA" href="#/non-existent-path">Broken Link</a>
  </div>
  <br>
  <component :is="currentView" />
</template>
<style>
.divClass{
  height: 50px;
}
.loginA{
  color: black;
  font-size: 20px;
}
.notfoundA{
  color: black;
  font-size: 20px;
}

</style>