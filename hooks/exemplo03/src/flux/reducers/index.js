import ActionTypes from "../actions/types";

const rootReducer = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD: 
            return state.concat(action.payload);
        case ActionTypes.REMOVE:
            const newArray = state.filter(item => item.id !== action.payload)
            return newArray;
        default:
        break;
    }
}

export default rootReducer;