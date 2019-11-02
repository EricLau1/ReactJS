import { ActionTypes } from '../actions/types';

const initialState = {
    newValue: 'Exemplo com Redux',
};

export const clickReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.CLICK_UPDATE_VALUE:
            return {
                ...state,
                newValue: action.payload,
            };
        default:
            return state;
    }
};