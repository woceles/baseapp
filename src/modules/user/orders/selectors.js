const selectOrdersState = (state) => state.user.orders;
export const selectOrderExecuteLoading = (state) => selectOrdersState(state).executeLoading;
export const selectCurrentPrice = (state) => selectOrdersState(state).currentPrice;