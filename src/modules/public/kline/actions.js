import { KLINE_DATA, KLINE_FETCH, KLINE_PUSH, } from './constants';
export const klinePush = (payload) => ({
    type: KLINE_PUSH,
    payload,
});
export const klineFetch = (payload) => ({
    type: KLINE_FETCH,
    payload,
});
export const klineData = (payload) => ({
    type: KLINE_DATA,
    payload,
});