import React from 'react';
import {connect} from "react-redux";
import { useSelector } from 'react-redux';
import './App.css';
import Card from "./Card";
import {isInToRemove} from "./Reducer";


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
    };
  }
  addCard = (cardType) => {
    this.props.dispatch({type:"AddCardToRemove", card:cardType})
  }


  render(){
    return(
    <div className="display">
    <div className="cards">
    {this.props.toComplete.slice(0,this.props.numView).map((value, index) => <Card className="card" type={value} key={index} addCard={this.addCard} active={isInToRemove(value,this.props.cardToRemove)}/>)}
  </div>
    <div className="button">
    <button><h3>Home</h3></button>
    <button onClick={()=> this.props.dispatch({type:"START_GAME"})}><h3>Play</h3></button>
    <button><h3>Rule</h3></button>
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
  }, props) {
  return {
    toComplete:state.toComplete,
    cardToRemove:state.cardToRemove,
    numView:state.numView,
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)