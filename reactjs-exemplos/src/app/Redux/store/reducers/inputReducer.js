import { ActionTypes } from "../actions/types";

const initialState = {
    inputValue: ''
};

export const inputReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.ON_CHANGE_INPUT_VALUE:
            return {
                ...state,
                inputValue: action.payload,
            }
        default: 
            return state;
    }
}