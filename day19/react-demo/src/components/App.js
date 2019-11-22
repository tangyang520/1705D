import React,{Component} from 'react';

import './App.css';

import MyRouter from "../routers/MyRouter"

class App extends Component {
  render(){
    return (
      <div className="App">
        <MyRouter></MyRouter>
      </div>
    );
  }
}

export default App;
