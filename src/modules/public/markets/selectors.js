const selectMarketsState = (state) => state.public.markets;
export const selectMarkets = (state) => selectMarketsState(state).list;
export const selectMarketsLoading = (state) => selectMarketsState(state).loading;
export const selectCurrentMarket = (state) => selectMarketsState(state).currentMarket;
export const selectMarketTickers = (state) => selectMarketsState(state).tickers;