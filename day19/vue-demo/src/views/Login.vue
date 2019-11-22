<template>
  <div class="login-page">
    <h1>登录</h1>
    <p><input type="text" placeholder="请输入用户名" v-model="username"></p>
    <p><input type="text" placeholder="请输入密码" v-model="password"></p>
    <p><button @click="login">登录</button></p>
  </div>
</template>

<script>

export default {
  data(){
    return{
      username:"",
      password:""
    }
  },
  methods:{
    login(){
      this.$http.post("/api/login",{username:this.username,password:this.password}).then(res=>{
        if(res.data.code===1){
          let {token,rolename}=res.data
          // 存储token 与 用户信息 ，跳转路由
          localStorage.setItem("token",token)
          localStorage.setItem("userinfo",JSON.stringify({username:this.username,rolename}))
          this.$router.push("/mian")
        }else{
          alert(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page{
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 60px;
}
input{
  width: 280px;
  height: 40px;
}
</style>