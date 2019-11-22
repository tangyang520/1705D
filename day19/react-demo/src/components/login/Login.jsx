import React, { Component } from 'react';

import axios from "axios"

class Login extends Component {
    constructor(){
        super();
        this.state={
            username:"",
            password:""
        }
    }
    render() {
        let {username,password}=this.state
        return (
            <div className="login-page">
                <h1>登录</h1>
                <p><input type="text" name="username" value={username} onChange={(e)=>this.change(e)} placeholder="请输入用户名"/></p>
                <p><input type="text" name="password" value={password} onChange={(e)=>this.change(e)} placeholder="请输入密码"/></p>
                <p><button onClick={()=>{this.login()}}>登录</button></p>
            </div>
        );
    }
    change=(e)=>{
        console.log(e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    login=()=>{
        let {username,password}=this.state
        if(username&&password){
             // 存储 token 与 userinfo,跳转路由
            axios.post("/api/login",{username,password}).then(res=>{
                if(res.data.code===1){
                    console.log(res)
                    let {token,rolename}=res.data
                    localStorage.setItem("token",token)
                    localStorage.setItem("userinfo",JSON.stringify({username,rolename}))
                    this.props.history.push("/main")
                }else{
                    alert(res.data.msg)
                }
            })
        }else{
            alert("请输入用户名或密码")
        }
    }
}

export default Login;