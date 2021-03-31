import React from 'react';
import {connect} from "react-redux";
import { useSelector } from 'react-redux';
import './App.css';
import Card from "./Card";
import {isInToRemove} from "./Reducer";
import {Link} from 'react-router-dom';
import './Home.css';


export default class Home extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    // console.log("Home")
    return(

    
    <div className="home">

    <div className="main-container">


      <div className="main-leftsidebar">
        <div className="button-container">
          <div className="main-button-container">
            <button className="grab" className="button1" className="active"> <Link to={"/home"}><h2>Home</h2></Link></button>
            <button className="grab" className="button1"> <Link to={"/"}><h2>Difficulty</h2></Link></button>
            <button className="grab" className="button1"> <Link to={"/rule"}><h2>Rule</h2></Link></button>
          </div>
        </div>
      </div>



      <div className="main-content">
        
      <div>

          <p className="content-text">Press <b>Difficulty button</b> for level options.</p>



          <p className="content-text">Press <b>Rule button</b> for game rules.</p>

          <p className="content-text"><b>Let's get started!</b></p>
      </div>
      </div>

    </div>


  </div>  
    )
  }
}