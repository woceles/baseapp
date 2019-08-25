import { RECENT_TRADES_DATA, RECENT_TRADES_ERROR, RECENT_TRADES_FETCH, RECENT_TRADES_PUSH, } from './constants';
export const recentTradesFetch = (payload) => ({
    type: RECENT_TRADES_FETCH,
    payload,
});
export const recentTradesData = (payload) => ({
    type: RECENT_TRADES_DATA,
    payload,
});
export const recentTradesPush = (payload) => ({
    type: RECENT_TRADES_PUSH,
    payload,
});
export const recentTradesError = (payload) => ({
    type: RECENT_TRADES_ERROR,
    payload,
});