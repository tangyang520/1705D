import React, { Component } from 'react';
import { BrowserRouter,Switch,Route,Redirect } from "react-router-dom"
import Login from "../components/login/Login"
import Main from "../components/main/Main"

class MyRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/main" component={Main}></Route>
                    <Redirect to="/login"></Redirect>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default MyRouter;