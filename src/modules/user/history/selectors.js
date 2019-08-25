export const selectHistory = (state) => state.user.history.list;
export const selectFullHistory = (state) => state.user.history.fullHistory;
export const selectCurrentPage = (state) => state.user.history.page;
export const selectPageCount = (state, limit) => Math.ceil(state.user.history.fullHistory / limit);
export const selectFirstElemIndex = (state, limit) => (state.user.history.page * limit) + 1;
export const selectLastElemIndex = (state, limit) => {
    if ((state.user.history.page * limit) + limit > selectFullHistory(state)) {
        return selectFullHistory(state);
    }
    else {
        return (state.user.history.page * limit) + limit;
    }
};
export const selectNextPageExists = (state, limit) => (state.user.history.page + 1) < selectPageCount(state, limit);
export const selectHistoryLoading = (state) => state.user.history.fetching;