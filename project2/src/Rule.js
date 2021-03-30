import React from 'react';
import {connect} from "react-redux";
import { useSelector } from 'react-redux';
import './App.css';
import Card from "./Card";
import {isInToRemove} from "./Reducer";
import {Link} from 'react-router-dom';


export default class Rule extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
    <div className="rule">
    <button> <Link to={"/home"}>Home</Link></button>
    <button> <Link to={""}>Difficulty</Link></button>
    <button> <Link to={"/rule"}>Rule</Link></button>
    <p>  A set of 3 cards where each of the features are either all the same or all different.
   </p>
  </div>  
    )
  }
}