import { selectCurrentMarket } from '../markets';
export const selectRecentTrades = (state) => state.public.recentTrades.list;
export const selectRecentTradesOfCurrentMarket = (state) => {
    const currentMarket = selectCurrentMarket(state);
    return currentMarket ? state.public.recentTrades.list.filter((trade) => trade.market === currentMarket.id) : [];
};
export const selectRecentTradesLoading = (state) => state.public.recentTrades.loading;