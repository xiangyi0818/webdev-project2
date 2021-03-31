import { combineReducers } from 'redux';
import {useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import "./Reducer"

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
    hasRemove:1,
    gameMode:undefined,
    },
    action) {
        // console.log("reduce result")
        // console.log(CardToRemoveReducer(state, action))
    return {
        toComplete:ToCompleteReducer(state, action),
         completed:CompletedReducer(state, action),
         dimensions:dimensionsReducer(state, action),
         stateRange:state.stateRange,
         numView:numViewReducer(state, action),
         cardToRemove:CardToRemoveReducer(state, action),
         hasRemove:HasRemoveReducer(state, action),
         gameMode:gameModeReducer(state, action),
        }
}

let HasRemoveReducer = (state, action) => {
    if (action.type === "FIND_VALID") {
        return 1
    }
    else if (action.type === "NO_VALID") {
        return 2
    }
    else if (action.type === "ADD_THREE_VIEW") {
        return 0
    }
    else if (action.type === "TRY_REMOVE" && verifyRemove(action.cardToRemove)) {
        return 0
    }
    else if (action.type === "START_GAME") {
        return 0
    }
    return state.hasRemove
}

let dimensionsReducer = (state, action) => {
    if  (action.type === "EASY") {
        return 3
    }
    else if (action.type === "MEDIUM" || action.type === "HARD") {
        return 4
    }
    else {
        return state.dimensions
    }
}

let numViewReducer = (state, action)=> {
    if (action.type === "ADD_THREE_VIEW") {
        return state.numView + 3
    }
    else if (action.type === "START_GAME") {
        return 12
    }
    return state.numView
}

let gameModeReducer = (state, action) => {
    if (action.type === "EASY") {
        // console.log("change to easy")
        return 0
    }
    else if (action.type === "MEDIUM") {
        // console.log("change to medium")
        return 1
    }
    else if (action.type === "HARD") {
        return 2
    }
    return state.gameMode
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
            if(newToComplete.length === 0){
                alert("Congratulations!")
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
        // console.log(action.card)
        for(let card of cardToRemove){
            if(isSameCard(card, action.card)){
                // console.log(card)
                // console.log(action.card)
                return cardToRemove
            }
        }
        let newCardToRemove = [...cardToRemove, action.card]
        // console.log("newCardToRemove")
        // console.log(newCardToRemove)
        if(newCardToRemove.length === 3){
            if(verifyRemove(newCardToRemove)){
                alert("It's a valid set!")
            }
            else{
                alert("It's not a valid set!")
            }
        }
        return newCardToRemove
    }
    else if(action.type === "TRY_REMOVE"){
        return []
    }
    else if(action.type === "START_GAME"){
        return []
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
    while (i < 4) {
        let temp = [];
        for (let j=0;j<1;j++) {
            initialState.forEach((item, index)=> temp.push([...item, j]))
        }
        initialState = temp;
        i++;
      }
    shuffleArray(initialState)
    return initialState
  }

export function verifyRemove(cardToRemove) {
    // console.log(cardToRemove)
    // console.log(cardToRemove == undefined || cardToRemove.length !== 3)
    if (cardToRemove === undefined || cardToRemove.length !== 3) {
        return false
    }
    for (let i=0;i<cardToRemove[0].length;i++) {
        let map = new Map();
        for(const card of cardToRemove) {
            map.set(card[i], 1);
        }
        // console.log(map)
        if (map.size === 2) {
            // console.log("cannot remove")
            return false;
        }
    }
    return true;
}

export const isSameCard = (card1, card2) => {
    // let card1 = props.card1
    // let card2 = props.card2
    // console.log("check same card")
    // console.log([card1, card2, card1.length])
    for(let i=0;i<card1.length;i++){
        // console.log([card1[i], card2[i]])
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
    // console.log(card, cardToRemove)
    for (let removeCard of cardToRemove){
        if(isSameCard(card,removeCard)){
            return true
        }
    }
    return false
}