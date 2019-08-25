import { HISTORY_DATA, HISTORY_ERROR, HISTORY_FETCH, HISTORY_PUSH_EMIT, HISTORY_PUSH_FINISH, HISTORY_RESET, } from './constants';
export const fetchHistory = (payload) => ({
    type: HISTORY_FETCH,
    payload,
});
export const successHistory = (payload) => ({
    type: HISTORY_DATA,
    payload,
});
export const failHistory = (payload) => ({
    type: HISTORY_ERROR,
    payload,
});
export const resetHistory = () => ({
    type: HISTORY_RESET,
});
export const pushHistoryEmit = (payload) => ({
    type: HISTORY_PUSH_EMIT,
    payload,
});
export const pushHistoryFinish = (payload) => ({
    type: HISTORY_PUSH_FINISH,
    payload,
});