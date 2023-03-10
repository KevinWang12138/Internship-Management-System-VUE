<template>
  <div>
    <div class="text86">+86</div>
    <input class="id" id="phone" type="text" value="手机号码" @focusin="changeDefaultPhoneValue()" @focusout="changeDefaultPhoneValue()">
    <br>
    <div class="textPwd">密码</div>
    <input class="password" id="password" type="password">
    <br>
    <button class="login">登录</button>
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
.text86{
  border: 2px solid gray;
  border-radius: 15px 0 0 15px;
  width: 50px;
  height: 40px;
  float: left;
  float: right;
  margin-right: 0;
  left: 51%;

  text-align:center

}
.textPwd{
  border: 2px solid gray;
  border-radius: 15px 0 0 15px;
  width: 50px;
  height: 40px;
  float: left;
  float: right;
  margin-right: 0;
  margin-top: 20px;
  left: 51%;

  text-align:center
}
.id{
  border: 2px solid gray;
  border-radius: 0 15px 15px 0;
  width: 350px;
  height: 40px;

  left: 150%;
  font-size: 15px;
  text-align:center
}
.password{
  border: 2px solid gray;
  border-radius: 0 15px 15px 0;
  width: 350px;
  height: 40px;

  margin-top: 20px;

  left: 150%;
  font-size: 15px;
  text-align:center
}
.login{
  border: 2px solid deepskyblue;
  border-radius: 15px;
  width: 400px;
  height: 40px;
  background-color: dodgerblue;
  color: white;

  margin-top: 50px;

  left: 139%;
  font-size: 20px;
}
</style>