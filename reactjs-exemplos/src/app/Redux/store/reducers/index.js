import { combineReducers } from 'redux';
import { clickReducer } from './clickReducer';
import { inputReducer } from './inputReducer';

export const Reducers = combineReducers({
    clickState: clickReducer,
    inputState: inputReducer
});