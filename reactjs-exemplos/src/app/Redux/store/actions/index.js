import { ActionTypes } from "./types";

export const clickButton = value => {
    return {
        type: ActionTypes.CLICK_UPDATE_VALUE,
        payload: value,
    };
};

export const onHandleInputValue = value => {
    return {
        type: ActionTypes.ON_CHANGE_INPUT_VALUE,
        payload: value,
    }
};