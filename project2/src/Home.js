import React from 'react';
import {connect} from "react-redux";
import { useSelector } from 'react-redux';
import './App.css';
import Card from "./Card";
import {isInToRemove} from "./Reducer";
import {Link} from 'react-router-dom';


export default class Home extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
    <div className="home">
    <div>
      <button> <Link to={"/home"}>Home</Link></button>
      <button> <Link to={""}>Difficulty</Link></button>
      <button> <Link to={"/rule"}>Rule</Link></button>
    </div>
    <div>
      <p>Press Difficulty button for level options.</p>
    </div>
    <div>
      <p>Press Rule button for game rules.</p>
    </div>
    <div>
      <p>Let's get started!</p>
    </div> 
  </div>  
    )
  }
}