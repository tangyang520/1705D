<template>
  <div class="main-page">
      <header>
          {{username}}--{{rolename}} <button @click="exit">退出</button>
      </header>
      <div class="main">
          <div class="left">
                <router-link
                    v-for="(item,index) in menulist"
                    :key="index"
                    :to="'/main'+item.menuapi"
                >
                    {{item.menuname}}
                </router-link>
          </div>
          <div class="right">
                <router-view></router-view>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            username:"",
            rolename:"",
            menulist:[]
        }
    },
    created(){
        if(!localStorage.getItem("token")){
            this.$router.push("/login")
        }else{
            let {username,rolename}=JSON.parse(localStorage.getItem("userinfo"))
            console.log(username,rolename)
            this.username=username;
            this.rolename=rolename;
            let token = localStorage.getItem("token")
            this.$http.get("/api/menu",{headers:{token}}).then(res=>{
                if(res.data.code===1){
                    this.menulist=res.data.data
                }else{
                    alert(res.data.msg)
                }
            })
        }
    },
    methods:{
        exit(){
            localStorage.clear();
            this.$router.push("/login")
        }
    }
}
</script>

<style lang="scss" scoped>
.main-page{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
header{
    width:100% ;
    height: 80px;
    border-bottom: 1px solid #cccccc;
    line-height: 80px;
    text-align: center;
}
.main{
    width:100%;
    height: 100%;
    display: flex;
    .left{
        width: 200px;
        border-right: 1px solid #ccc;
        text-align: center;
        height: 100%;
        a{
            display: block;
            text-align: center;
            line-height: 60px;
            color:#000;
            text-decoration: none;
            border-bottom: 1px solid #ccc;
        }
    }
}
</style>