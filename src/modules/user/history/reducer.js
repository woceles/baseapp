import { HISTORY_DATA, HISTORY_ERROR, HISTORY_FETCH, HISTORY_PUSH_FINISH, HISTORY_RESET, } from './constants';
const initialState = {
    list: [],
    fetching: false,
    fullHistory: 0,
    page: 0,
};
export const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case HISTORY_FETCH:
            return { ...state, fetching: true };
        case HISTORY_DATA:
            return {
                ...state,
                list: action.payload.list,
                fetching: false,
                page: action.payload.page,
                fullHistory: action.payload.fullHistory,
            };
        case HISTORY_ERROR: {
            return { ...state, list: [], fetching: false, fullHistory: 0, page: 0 };
        }
        case HISTORY_RESET: {
            return { ...state, list: [], fullHistory: 0, page: 0 };
        }
        case HISTORY_PUSH_FINISH: {
            return { ...state, list: action.payload };
        }
        default:
            return state;
    }
};