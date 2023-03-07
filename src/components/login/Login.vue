<template>
  <div>
    <input id="phone" type="text" value="手机号码" @focusin="changeDefaultPhoneValue()" @focusout="changeDefaultPhoneValue()">
    <br>
    <input id="password" type="password">
    <br>
    <button>登录</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods:{
    changeDefaultPhoneValue(){
      const phone = document.getElementById("phone");
      if(phone.value == ""){
        phone.value = "手机号码"
      }else if(phone.value == "手机号码"){
        phone.value = ""
      }
    }
  }
}
</script>

<style scoped>

</style>