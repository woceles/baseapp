import { OPEN_ORDERS_APPEND, OPEN_ORDERS_CANCEL_DATA, OPEN_ORDERS_CANCEL_ERROR, OPEN_ORDERS_CANCEL_FETCH, OPEN_ORDERS_DATA, OPEN_ORDERS_ERROR, OPEN_ORDERS_FETCH, OPEN_ORDERS_RESET, OPEN_ORDERS_UPDATE, } from './constants';
export const userOpenOrdersFetch = (payload) => ({
    type: OPEN_ORDERS_FETCH,
    payload,
});
export const userOpenOrdersData = (payload) => ({
    type: OPEN_ORDERS_DATA,
    payload,
});
export const userOpenOrdersUpdate = (payload) => ({
    type: OPEN_ORDERS_UPDATE,
    payload,
});
export const userOpenOrdersAppend = (payload) => ({
    type: OPEN_ORDERS_APPEND,
    payload,
});
export const userOpenOrdersError = () => ({
    type: OPEN_ORDERS_ERROR,
});
export const userOpenOrdersReset = () => ({
    type: OPEN_ORDERS_RESET,
});
export const openOrdersCancelFetch = (payload) => ({
    type: OPEN_ORDERS_CANCEL_FETCH,
    payload,
});
export const openOrdersCancelData = (payload) => ({
    type: OPEN_ORDERS_CANCEL_DATA,
    payload,
});
export const openOrdersCancelError = () => ({
    type: OPEN_ORDERS_CANCEL_ERROR,
});