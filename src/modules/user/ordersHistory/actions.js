import { ORDERS_CANCEL_ALL_DATA, ORDERS_CANCEL_ALL_ERROR, ORDERS_CANCEL_ALL_FETCH, ORDERS_HISTORY_CANCEL_DATA, ORDERS_HISTORY_CANCEL_ERROR, ORDERS_HISTORY_CANCEL_FETCH, ORDERS_HISTORY_DATA, ORDERS_HISTORY_ERROR, ORDERS_HISTORY_FETCH, ORDERS_HISTORY_RESET, } from './constants';
export const userOrdersHistoryFetch = (payload) => ({
    type: ORDERS_HISTORY_FETCH,
    payload,
});
export const userOrdersHistoryData = (payload) => ({
    type: ORDERS_HISTORY_DATA,
    payload,
});
export const userOrdersHistoryError = () => ({
    type: ORDERS_HISTORY_ERROR,
});
export const ordersCancelAllFetch = (payload) => ({
    type: ORDERS_CANCEL_ALL_FETCH,
    payload,
});
export const ordersCancelAllData = (payload) => ({
    type: ORDERS_CANCEL_ALL_DATA,
    payload,
});
export const ordersCancelAllError = () => ({
    type: ORDERS_CANCEL_ALL_ERROR,
});
export const ordersHistoryCancelFetch = (payload) => ({
    type: ORDERS_HISTORY_CANCEL_FETCH,
    payload,
});
export const ordersHistoryCancelData = (payload) => ({
    type: ORDERS_HISTORY_CANCEL_DATA,
    payload,
});
export const ordersHistoryCancelError = () => ({
    type: ORDERS_HISTORY_CANCEL_ERROR,
});
export const resetOrdersHistory = () => ({
    type: ORDERS_HISTORY_RESET,
});