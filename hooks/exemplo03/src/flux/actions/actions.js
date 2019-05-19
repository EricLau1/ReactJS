import ActionTypes from './types';

export const addList = () => {
    return {
        type: ActionTypes.ADD,
        payload: {
            id: Date.now(),
            text: '',
            completed: false,
        }
    };
};

export const removeItem = id => {
    return {
        type: ActionTypes.REMOVE,
        payload: id
    };
} 