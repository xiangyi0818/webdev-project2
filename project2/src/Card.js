import React from 'react';
import "./Card.css";

export default class Dice extends React.Component {
    constructor(props){
      super(props);
    }

    render(){
        return(
            <div className="card" style={{border:"1px solid grey"}}>
            {this.props.type.map((value, index) => <p>{value}</p>)}
            </div>
        )
    }
    }