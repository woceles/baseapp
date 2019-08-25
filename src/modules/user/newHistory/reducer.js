import { NEW_HISTORY_DATA, NEW_HISTORY_ERROR, NEW_HISTORY_FETCH, NEW_HISTORY_RESET, } from './constants';
export const initialNewHistoryState = {
    list: [],
    fetching: false,
};
export const newHistoryReducer = (state = initialNewHistoryState, action) => {
    switch (action.type) {
        case NEW_HISTORY_FETCH:
            return { ...state, fetching: true };
        case NEW_HISTORY_DATA:
            return {
                ...state,
                list: action.payload.list,
                fetching: false,
            };
        case NEW_HISTORY_ERROR: {
            return { ...state, error: action.payload };
        }
        case NEW_HISTORY_RESET: {
            return { ...state, list: [] };
        }
        default:
            return state;
    }
};