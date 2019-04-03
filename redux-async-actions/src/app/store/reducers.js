import { ActionTypes } from './types';

const INITIAL_STATE = {
    wallets: {
        data: []
    },
    loading: false,
    error: false,
}

const reducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case ActionTypes.FETCH_WALLETS_LOADING:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.FETCH_WALLETS_SUCCESS:
            return {
                wallets: action.payload,
                loading: false,
                error: false,
            };
        case ActionTypes.FETCH_WALLETS_UPDATE:
            return {
                ...state
            };
        case ActionTypes.FETCH_WALLETS_FAILURE:
            return {
                INITIAL_STATE,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
}

export default reducer;