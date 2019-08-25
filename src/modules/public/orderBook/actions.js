import { DEPTH_DATA, DEPTH_ERROR, DEPTH_FETCH, ORDER_BOOK_DATA, ORDER_BOOK_ERROR, ORDER_BOOK_FETCH, } from './constants';
export const orderBookFetch = (payload) => ({
    type: ORDER_BOOK_FETCH,
    payload,
});
export const orderBookData = (payload) => ({
    type: ORDER_BOOK_DATA,
    payload,
});
export const orderBookError = (error) => ({
    type: ORDER_BOOK_ERROR,
    error,
});
export const depthFetch = (payload) => ({
    type: DEPTH_FETCH,
    payload,
});
export const depthData = (payload) => ({
    type: DEPTH_DATA,
    payload,
});
export const depthError = (error) => ({
    type: DEPTH_ERROR,
    error,
});