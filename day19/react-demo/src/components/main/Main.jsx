import React, { Component } from 'react';

import { Switch,Route,NavLink,Redirect } from "react-router-dom"

import axios from "axios"

import Home from "./Home"
import Myorder from "./Myorder"
import Orderapprove from "./Orderapprove"
import Ordermanager from "./Ordermanager"
import Orderroom from "./Orderroom"
import Setting from "./Setting"

class Main extends Component {
    constructor(){
        super();
        this.state={
            username:"",
            rolename:"",
            menulist:[]
        }
    }
    componentWillMount(){
        if(!localStorage.getItem("token")){
            this.props.history.push("/login")
        }else{
            let {username,rolename}=JSON.parse(localStorage.getItem("userinfo"))
            this.setState({
                username:username,
                rolename:rolename
            })
            let token = localStorage.getItem("token")
            axios.get("/api/menu",{headers:{token}}).then(res=>{
                if(res.data.code===1){
                    this.setState({
                        menulist:res.data.data
                    })
                }else{
                    alert(res.data.msg)
                }
            })
        }
    }
    render() {
        let {username,rolename,menulist}=this.state
        return (
            <div className="main-page">
                <header>
                    {username}-{rolename} <button onClick={()=>{this.exit()}}>退出</button>
                </header>
                <div className="main">
                    <div className="left">
                        {
                            menulist.map((item,index)=>{
                                return <NavLink to={"/main"+item.menuapi} key={index}>
                                    {item.menuname}
                                </NavLink>
                            })
                        }
                    </div>
                    <div className="right">
                        <Switch>
                            <Route path="/main/home" component={Home}></Route>
                            <Route path="/main/myorder" component={Myorder}></Route>
                            <Route path="/main/orderapprove" component={Orderapprove}></Route>
                            <Route path="/main/ordermanager" component={Ordermanager}></Route>
                            <Route path="/main/orderroom" component={Orderroom}></Route>
                            <Route path="/main/setting" component={Setting}></Route>
                            <Redirect to="/main/home"></Redirect>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
    // 退出
    exit=()=>{
        localStorage.clear()
        this.props.history.push("/login")
    }
}

export default Main;