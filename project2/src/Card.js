import React from 'react';
import "./Card.css";

export default class Card extends React.Component {
    constructor(props){
      super(props);
    }

    render(){
        return(
            <div className={this.props.active? "Card active": "Card"} style={{border:"1px solid grey", height:150, width:100}} 
            onClick={() => this.props.addCard(this.props.type)} active={true}>
            {this.props.type.map((value, index) => <p>{value}</p>)}
            </div>
        )
    }
    }