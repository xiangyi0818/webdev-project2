import React from 'react';
import {connect} from "react-redux";
import { useSelector } from 'react-redux';
import './App.css';
import Card from "./Card";
import {isInToRemove, verifyRemove} from "./Reducer";
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toComplete:[],
      completed:[],
      dimensions:4,
      stateRange:3,
      numView:12,
      cardToRemove:[],
      hasRemove:0,
      gameMode:1,
    };
  }
  addCard = (cardType) => {
    this.props.dispatch({type:"AddCardToRemove", card:cardType})
  }
  checkHasRemove=(toComplete) => {
    if (this.props.hasRemove !== 0){
      return
    }
    for(let i=0;i<this.props.numView-2;i++){
      for(let j=i+1;j<this.props.numView-1;j++) {
        for(let k=j+1;k<this.props.numView;k++){
          let cardToTest = [toComplete[i],toComplete[j],toComplete[k]]
          // console.log(verifyRemove(cardToTest))
          if (cardToTest !== undefined && cardToTest.length === 3 && cardToTest[2] !== undefined) {
            if (verifyRemove(cardToTest)) {
              console.log([i,j,k])
              this.props.dispatch({type:"FIND_VALID"})
              console.log("Has Valid Remove")
              return true
            }
          }
        }
      }
    }
    this.props.dispatch({type:"NO_VALID"})
    console.log("No Valid Remove")
    
    if (this.props.numView < 81 && this.props.gameMode === 1) {
      this.props.dispatch({type:"ADD_THREE_VIEW"})
    }
    return false
  }

  updateView = ()=>{
    // console.log(this.props.hasRemove)
    if(this.props.cardToRemove !== undefined && this.props.cardToRemove.length === 3){
      this.props.dispatch({type:"TRY_REMOVE", cardToRemove:this.props.cardToRemove})
    }
    this.checkHasRemove(this.props.toComplete)
    if(this.props.toComplete.length === 0){
      return(
        <div>
      <div>
      <h1 className="dif">
        Please choose a difficulty level!
      </h1>
    </div>
    </div>
      )
    }
  }


  render(){
    return(
    <div className="container">

    <div className="main-leftsidebar">
      <div className="button-container">
        <div className="main-button-container">
          <button className="grab" className="button1"> <Link to={"/home"}><h2>Home</h2></Link></button>
          <button className="grab" className="button1"> <Link to={""}><h2>Difficulty</h2></Link></button>
          <button className="grab" className="button1"> <Link to={"/rule"}><h2>Rule</h2></Link></button>
        </div>
      </div>
    </div>
      
      <div className="main-header">
        <div className="second-button-container">

          <button className="grab" className="button2" onClick={()=> {this.props.dispatch({type:"EASY"}); this.props.dispatch({type:"START_GAME"});}}><h3>Easy</h3></button>
          <button className="grab" className="button2" onClick={()=> {this.props.dispatch({type:"MEDIUM"}); this.props.dispatch({type:"START_GAME"});}}><h3>Medium</h3></button>
          <button className="grab" className="button2" onClick={()=> {this.props.dispatch({type:"HARD"}); this.props.dispatch({type:"START_GAME"});}}><h3>Hard</h3></button>
        </div>
      </div>

    <div className="main-footer">
      <div className="third-button-container">
        <button className="grab" className="button" onClick={()=> {this.props.dispatch({type:"ADD_THREE_VIEW"})}}><h3>Add Three Cards</h3></button>
        <button className="grab" className="button" onClick={()=> {this.props.dispatch({type:"START_GAME"})}}><h3>Reset</h3></button>
      </div>
    </div> 
   


    <div className="main-content ">
      <div className="display-container">
      {this.updateView()}
        <div className="display">
        
          <div className="cards">
            
            {this.props.toComplete.slice(0,this.props.numView).map((value, index) => <Card className="card" type={value} key={index} addCard={this.addCard} active={isInToRemove(value,this.props.cardToRemove)}/>)}
          </div>
        </div>
      </div>
    </div>



    </div>
    )
  }
  
}

let mapDispatchToProps = function(dispatch, props) {
  return {
    dispatch:dispatch 
  }
}

let mapStateToProps = function(state={
  toComplete:[],
  completed:[],
  dimensions:4,
  stateRange:3,
  numView:12,
  cardToRemove:[],
  hasRemove:0,
  gameMode:1,
  }, props) {
  return {
    toComplete:state.toComplete,
    cardToRemove:state.cardToRemove,
    numView:state.numView,
    hasRemove:state.hasRemove,
    gameMode:state.gameMode,
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)