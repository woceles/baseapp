import { NEW_HISTORY_DATA, NEW_HISTORY_ERROR, NEW_HISTORY_FETCH, NEW_HISTORY_RESET, } from './constants';
export const fetchNewHistory = (payload) => ({
    type: NEW_HISTORY_FETCH,
    payload,
});
export const successNewHistory = (payload) => ({
    type: NEW_HISTORY_DATA,
    payload,
});
export const failNewHistory = (payload) => ({
    type: NEW_HISTORY_ERROR,
    payload,
});
export const resetNewHistory = () => ({
    type: NEW_HISTORY_RESET,
});