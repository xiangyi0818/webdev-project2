import React from 'react';
import {connect} from "react-redux";
import { useSelector } from 'react-redux';
import './Rule.css';
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
    <div className="main-container">
      <div className="main-leftsidebar">
        <div className="button-container">
          <div className="main-button-container">
            <button className="grab" className="button1"> <Link to={"/home"}><h2>Home</h2></Link></button>
            <button className="grab" className="button1"> <Link to={"/"}><h2>Difficulty</h2></Link></button>
            <button className="grab" className="button1" className="active-button"> <Link to={"/rule"}><h2>Rule</h2></Link></button>
          </div>
        </div>
      </div>


      <div className="main-content">
        <div>
          <h2 className="content-text">Instruction</h2>
          <p>The object of the game is to identify a SET of 3 cards from 12 cards placed face up on the table. Each card has four features, which can vary as follows:</p>

          <p>A SET consists of 3 cards in which each of the cards’ features, looked at one‐by‐one, are the same on each card, or, are different on each card. 
            All of the features must separately satisfy this rule. <b>In other words: shape must be either the same on all 3 cards, or different on each of the 3 cards; 
            color must be either the same on all 3 cards, or different on each of the 3, etc.</b></p>

          <h4 className="h4-text-color">A QUICK CHECK ‐ Is it a SET?</h4>
          <p>If 2 cards are the same and 1 card is different in any feature, then it is not a SET. 
            For example, if 2 are red and 1 is purple then it is not a SET. A SET must be either all the same OR all different in each individual feature.</p>

        
          <h4 className="h4-text-color">EASY START</h4>
          <p>
          For a quick introduction, start with the small deck (just the solid symbols). This eliminates one feature, shading. 
          Once you can quickly see a SET when playing the 3 feature version, shuffle the 2 decks together to play the full game.
          </p>


          <h4 className="h4-text-color">THE PLAY</h4>
          <p>
          The dealer shuffles the cards and lays 12 face up on the table (in a rectangle) so that they can be seen by all. Players remove SETs of 3 cards from anywhere on the table. Each SET is checked by the other players. If correct, the SET is kept by the player for one point and the dealer replaces the 3 cards with 3 from the deck. A player must call SET before picking up the cards. There are no turns, the first player to call SET gets control of the board. After he/she has
             
             called SET, no other player can pick up cards until that player has finished. The SET must be picked up within a few seconds after calling it. 
             If a player calls SET and does not have one, or if the SET is incorrect, he/she loses one point, and the 3 cards are returned to the table. 
             If all players agree that there is not a SET in the 12 cards, 3 more cards are laid face up on the table. 
             The 3 cards are not replaced when the next SET is found, reducing the number back to 12. 
             Note: There are ~ 33:1 odds that a SET is present in 12 cards, and ~ 2500:1 odds when 15 cards are on the table.
          </p>

          <p>The play continues until the deck is depleted. At the end of the game there may be cards remaining that do not form a SET. The number of SETs held by each player is then counted. One point is given for each SET. High score wins.</p>

          <p>If you want a longer game, the deal passes to the person on the dealer’s left, and the play resumes with the deck being reshuffled. When all the players have dealt, the game ends. The player with the highest overall score wins.</p>


          <p>

          When playing solitaire, if the player does not find a SET, 3 more cards are laid down with a penalty of one SET. 
          To win the game, the player must remove this penalty by finding a SET on the table out of the last 12 cards.

          </p>

          <h4 className="h4-text-color">EXAMPLES</h4>

          <p>For example, the following are SETs:</p>

          <p>All three cards have the same shape, the same color, the same number of symbols and they all have different shading.</p>

          <p>All three cards have different shapes, different colors, and different numbers of symbols and they all have the same shading.</p>

          <p>
          All three cards have different shapes, different colors, different numbers of symbols and different shadings.
          </p>

          <a href="https://www.setgame.com/sites/default/files/instructions/SET%20INSTRUCTIONS%20-%20ENGLISH.pdf" target="_blank" >Click to get more detail information</a>
        </div>
      </div>

    </div>


  </div>  
    )
  }
}