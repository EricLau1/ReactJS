import { combineReducers } from 'redux';
import { INCREMENT, DECREMENT } from '../actions/types';

const reducers = (state = {number: 0}, action) => {
    switch(action.type) {
        case INCREMENT:
            return { ...state, number: state.number + 1 };
        case DECREMENT:
            if(state.number > 0) {
                return { ...state, number: state.number - 1 };
            }
            return state;
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    values: reducers
});

export default rootReducer;