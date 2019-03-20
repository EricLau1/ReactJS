import { combineReducers } from 'redux';
import { 

 } from '../actions/types';

import customers from './customers.reducer';

const rootReducer = combineReducers({
    customers,
});

export default rootReducer;