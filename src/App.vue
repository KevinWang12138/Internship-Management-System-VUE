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
  <div :class="divClass">
    <a href="#/login">登录</a> | <a href="#/non-existent-path">Broken Link</a>
  </div>
  <br>
  <component :is="currentView" />
</template>

<style>
.navigation {

}
</style>