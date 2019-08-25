export const selectOrdersHistory = (state) => state.user.ordersHistory.list;
export const selectTotalOrdersHistory = (state) => state.user.ordersHistory.total;
export const selectCurrentPageIndex = (state) => state.user.ordersHistory.pageIndex;
export const selectOrdersPageCount = (state, limit) => Math.ceil(state.user.ordersHistory.total / limit);
export const selectOrdersFirstElemIndex = (state, limit) => (state.user.ordersHistory.pageIndex * limit) + 1;
export const selectOrdersLastElemIndex = (state, limit) => {
    if ((state.user.ordersHistory.pageIndex * limit) + limit > selectTotalOrdersHistory(state)) {
        return selectTotalOrdersHistory(state);
    }
    else {
        return (state.user.ordersHistory.pageIndex * limit) + limit;
    }
};
export const selectOrdersNextPageExists = (state, limit) => (state.user.ordersHistory.pageIndex + 1) < selectOrdersPageCount(state, limit);
export const selectOrdersHistoryLoading = (state) => state.user.ordersHistory.fetching;
export const selectCancelAllFetching = (state) => state.user.ordersHistory.cancelAllFetching;
export const selectCancelFetching = (state) => state.user.ordersHistory.cancelFetching;