import { ORDER_EXECUTE_DATA, ORDER_EXECUTE_ERROR, ORDER_EXECUTE_FETCH, ORDERS_SET_CURRENT_PRICE, } from './constants';
export const orderExecuteFetch = (payload) => ({
    type: ORDER_EXECUTE_FETCH,
    payload,
});
export const orderExecuteData = () => ({
    type: ORDER_EXECUTE_DATA,
});
export const orderExecuteError = (payload) => ({
    type: ORDER_EXECUTE_ERROR,
    payload,
});
export const setCurrentPrice = (payload) => ({
    type: ORDERS_SET_CURRENT_PRICE,
    payload,
});