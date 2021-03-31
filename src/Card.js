import React from 'react';
import Reducer from './Reducer';
import "./Card.css";

export default class Card extends React.Component {
    constructor(props){
      super(props);
    }

    render(){
        // console.log(this.props.type)
        // let testStr = mapCardToName(this.props.type)
        // console.log(testStr)
        // console.log("./images/".concat(mapCardToName(this.props.type)))
        return(
            <div className= {this.props.active? "Card activeCard":"Card"}
            style={{border:"1px solid grey"}} 
            onClick={() => this.props.addCard(this.props.type)} active={true}>
                {mapCardToName(this.props.type)}
            {/* <img src={require("./images/".concat(mapCardToName(this.props.type)))} /> */}
            {/* {this.props.type.map((value, index) => <p>{value}</p>)} */}
            </div>
        )
    }
    }

    let mapCardToName = (cardType) => {
        let dict1={0:"Diamond",1:"Round",2:"Squiggle"} 
        let dict2={0:"Red",1:"Purple",2:"Green"}
        let dict3={0:"Solid",1:"Empty",2:"GrayedOut"}
        let dict4={0:"One",1:"Two",2:"Three"}
        // console.log(cardType)
        // console.log("./images/".concat(dict1[cardType[0]].concat("_",dict2[cardType[1]],"_",dict3[cardType[2]],"_",dict4[cardType[3]],".png")))
        return <img src={window.location.origin +"/images/".concat(dict1[cardType[0]].concat("_",dict2[cardType[1]],"_",dict3[cardType[2]],"_",dict4[cardType[3]],".png"))} width="100%" height="100%"/>
            // (dict1[cardType[0]].concat("_",dict2[cardType[1]],"_",dict3[cardType[2]],"_",dict4[cardType[3]],".png"))      
      }

