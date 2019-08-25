export const selectOpenOrdersList = (state) => state.user.openOrders.list;
export const selectOpenOrdersFetching = (state) => state.user.openOrders.fetching;
export const selectCancelOpenOrdersFetching = (state) => state.user.openOrders.cancelFetching;