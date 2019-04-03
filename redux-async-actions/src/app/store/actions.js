import { ActionTypes } from './types';

const fetchWalletsLoading = () => {
    return {
        type: ActionTypes.FETCH_WALLETS_LOADING,
    }
};

const fetchWalletsSuccess = data => {
    return {
        type: ActionTypes.FETCH_WALLETS_SUCCESS,  
        payload: data
    };
}

const fetchWalletsUpdate = () => {
    return {
        type: ActionTypes.FETCH_WALLETS_UPDATE
    }
}

const fetchWalletsFailure = error => {
    return {
        type: ActionTypes.FETCH_WALLETS_FAILURE,
        payload: error
    }
} 

export const loadWallets = (page = 1) => {
    return dispatch => {
        dispatch(fetchWalletsLoading());
        return fetch(`http://localhost:9000/wallets?page=${page}`)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(json => {
            dispatch(fetchWalletsSuccess(json));
            return json;
        })
        .catch(promiseError => promiseError.json().then(error => dispatch(fetchWalletsFailure(error))));
    }
}

export const addCash = (wallet, reloadListCallback) => {
    return dispatch => {
        dispatch(fetchWalletsLoading());
        return fetch('http://localhost:9000/wallets', { method: 'PUT', body: JSON.stringify(wallet), headers: new Headers({'Content-type': 'application/json'}) })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(json => {
                reloadListCallback();
                dispatch(fetchWalletsUpdate());
                return json;
            })
            .catch(promiseError => promiseError.json().then(error => dispatch(fetchWalletsFailure(error))));
    }
}
