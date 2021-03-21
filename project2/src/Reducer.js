import { combineReducers } from 'redux';

export default combineReducers({
    toComplete:ToCompleteReducer,
    completed:CompletedReducer,

})

function ToCompleteReducer(toComplete=[], action){
    if(action.type === "TRY_REMOVE"){
        if (verifyRemove(action.cardToRemove)){
            let newToComplete = [];
            for(card in toComplete){
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
        return generateInitialCards()
    }
    else{
        return toComplete;
    }
}

function CompletedReducer(completed=[], action){
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

function generateInitialCards(){
    DIMENSIONS=useSelector(state=>state.dimensions);
    STATERANGE=useSelector(state=>state.stateRange);
    i = 0;
    let initialState = [[]];
    while (i < DIMENSIONS) {
      let temp = [];
      for (card in initialState) {
        for (j=0;j<STATERANGE;j++) {
          temp.push([...card, j]);
        }
      }
      initialState = temp;
      i++;
    }
    return initialState
  }

export function verifyRemove(cardToRemove) {
    let numDifferent = 0;
    for (i=0;i<cardToRemove[0].size;i++) {
        let map = new Map();
        let card;
        for(j=0;j<3;j++) {
            card = cardToRemove[j];
            map.set(card[i], 1);
        }
        if (map.size == 2) {
            return false;
        }
    }
    return true;
}

function isSameCard(card1, card2){
    for(i=0;i<card1.size;i++){
        if (card1[i] != card2[i]) {
            return false;
        }
    }
    return true;
}