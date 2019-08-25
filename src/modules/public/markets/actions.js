import { MARKETS_DATA, MARKETS_ERROR, MARKETS_FETCH, MARKETS_SET_CURRENT_MARKET, MARKETS_SET_CURRENT_MARKET_IFUNSET, MARKETS_TICKERS_DATA, MARKETS_TICKERS_ERROR, MARKETS_TICKERS_FETCH, MARKETS_TICKERS_PUSH, } from './constants';
export const marketsFetch = () => ({
    type: MARKETS_FETCH,
});
export const marketsData = (payload) => ({
    type: MARKETS_DATA,
    payload,
});
export const marketsError = () => ({
    type: MARKETS_ERROR,
});
export const setCurrentMarket = (payload) => ({
    type: MARKETS_SET_CURRENT_MARKET,
    payload,
});
export const setCurrentMarketIfUnset = (payload) => ({
    type: MARKETS_SET_CURRENT_MARKET_IFUNSET,
    payload,
});
export const marketsTickersFetch = () => ({
    type: MARKETS_TICKERS_FETCH,
});
export const marketsTickersData = (payload) => ({
    type: MARKETS_TICKERS_DATA,
    payload,
});
export const marketsTickersError = () => ({
    type: MARKETS_TICKERS_ERROR,
});
export const marketsTickersPush = (payload) => ({
    type: MARKETS_TICKERS_PUSH,
    payload,
});