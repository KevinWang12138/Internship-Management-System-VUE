<template>
  <div class="routeDiv">
    <RouterView/>
  </div>
</template>

<style lang="scss">
*{
  padding: 0 0;
  margin: 0 0;
}
html,body,#app{
  height: 100%;
  width: 100%;
}
.routeDiv{
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
