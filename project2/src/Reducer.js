import { combineReducers } from 'redux';
import {useSelector } from 'react-redux'


// export default combineReducers({
//     toComplete:ToCompleteReducer,
//     completed:CompletedReducer,
// })

export default function mainReducer(
    state={
    toComplete:[],
    completed:[],
    dimensions:4,
    stateRange:3,
    numView:12,
    cardToRemove:[],
    },
    action) {
        // console.log(state.cardToRemove, action)
        let cardToRemove = CardToRemoveReducer(state, action);
        // console.log(cardToRemove)
        let toComplete = state.toComplete
        let completed = state.completed
        let DIMENSIONS=state.dimensions
        let STATERANGE=state.stateRange
        
        if(cardToRemove !== undefined && cardToRemove.length === 3){
            if (verifyRemove(cardToRemove)){
                console.log("success remove")
                let newToComplete = [];
                for(const card of toComplete){
                    if (isSameCard(card, cardToRemove[0]) || isSameCard(card, cardToRemove[1]) || isSameCard(card, cardToRemove[2])) {
                        continue;
                    }
                    newToComplete.push(card);
                }
                toComplete = newToComplete;
                completed = [...completed, ...cardToRemove]
                cardToRemove = [];
            }
            else{
                console.log("not valid remove")
                cardToRemove = [];
            }
        }
        else if (action.type === "START_GAME"){
            toComplete = GenerateInitialCards({dimensions:DIMENSIONS, stateRange:STATERANGE})
            completed = [];
            cardToRemove = [];
        }
    return {
        toComplete:toComplete,
         completed:completed,
         dimensions:state.dimensions,
         stateRange:state.stateRange,
         numView:state.numView,
         cardToRemove:cardToRemove,
        }
}

function ToCompleteReducer(state, action){
    let toComplete = state.toComplete
    let DIMENSIONS=state.dimensions
    let STATERANGE=state.stateRange
    if(action.type === "TRY_REMOVE"){
        if (verifyRemove(action.cardToRemove)){
            let newToComplete = [];
            for(const card of toComplete){
                if (isSameCard(card, action.cardToRemove[0]) || isSameCard(card, action.cardToRemove[1]) || isSameCard(card, action.cardToRemove[2])) {
                    continue;
                }
                newToComplete.push(card);
            }
            return newToComplete;
        }
        else{
            return toComplete;
        }
    }
    else if (action.type === "START_GAME"){
        return GenerateInitialCards({dimensions:DIMENSIONS, stateRange:STATERANGE})
    }
    else{
        return toComplete;
    }
}

function CompletedReducer(state, action){
    let completed = state.completed
    if(action.type === "TRY_REMOVE"){
        if (verifyRemove(action.cardToRemove)){
            return [...completed, ...action.cardToRemove];
        }
        else{
            return completed;
        }
    }
    else if (action.type === "START_GAME"){
        return [];
    }
    else{
        return completed;
    }
}

const CardToRemoveReducer=(state, action) => {
    const cardToRemove = state.cardToRemove;
    if (action.type === "AddCardToRemove"){
        for(let card of cardToRemove){
            if(isSameCard(card, action.card)){
                // console.log(card)
                // console.log(action.card)
                return cardToRemove
            }
        }
        let newCardToRemove = [...cardToRemove, action.card]
        return newCardToRemove
    }
    else{
        // console.log("not add new")
        return cardToRemove;
    }

}

const GenerateInitialCards=(props) => {
    // let DIMENSIONS=useSelector(state=>state.dimensions);
    // let STATERANGE=useSelector(state=>state.stateRange);
    const DIMENSIONS = props.dimensions;
    const STATERANGE = props.stateRange;
    let i = 0;
    let initialState = [[]];
    while (i < DIMENSIONS) {
      let temp = [];
      for (let j=0;j<STATERANGE;j++) {
          initialState.forEach((item, index)=> temp.push([...item, j]))
      }
      initialState = temp;
      i++;
    }
    shuffleArray(initialState)
    return initialState
  }

export function verifyRemove(cardToRemove) {
    console.log("check card to remove")
    console.log(cardToRemove)
    for (let i=0;i<cardToRemove[0].length;i++) {
        let map = new Map();
        for(const card of cardToRemove) {
            map.set(card[i], 1);
        }
        console.log(map)
        if (map.size === 2) {
            console.log("cannot remove")
            return false;
        }
    }
    return true;
}

export const isSameCard = (card1, card2) => {
    // let card1 = props.card1
    // let card2 = props.card2
    console.log("check same card")
    console.log([card1, card2, card1.length])
    for(let i=0;i<card1.length;i++){
        console.log([card1[i], card2[i]])
        if (card1[i] !== card2[i]) {
            return false;
        }
    }
    return true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function isInToRemove(card, cardToRemove){
    console.log(card, cardToRemove)
    for (let removeCard of cardToRemove){
        if(isSameCard(card,removeCard)){
            return true
        }
    }
    return false
}