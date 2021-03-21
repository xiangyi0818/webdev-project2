import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Card from "./Card";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toComplete:[],
      completed:[],
      dimensions:4,
      stateRange:3,
      numView:12,
    };
  }
  render(){
    return(
    <div className="display">
    <div className="cards">
    <Card className="card" type={[1,2,3,4]}/>
    <Card className="card" type={[1,2,3,4]}/>
    <Card className="card" type={[1,2,3,4]}/>
    <Card className="card" type={[1,2,3,4]}/>
  </div>
  <div className="cards">
      <Card className="card" type={[1,2,3,4]}/>
      <Card className="card" type={[1,2,3,4]}/>
      <Card className="card" type={[1,2,3,4]}/>
      <Card className="card" type={[1,2,3,4]}/>
    </div>
    <div className="cards">
      <Card className="card" type={[1,2,3,4]}/>
      <Card className="card" type={[1,2,3,4]}/>
      <Card className="card" type={[1,2,3,4]}/>
      <Card className="card" type={[1,2,3,4]}/>
    </div>
    <div className="button">
    <button><h3>Home</h3></button>
    <button><h3>Play</h3></button>
    <button><h3>Rule</h3></button>
    </div>
  </div>
    
    )
  }
  
}

 

export default App;
