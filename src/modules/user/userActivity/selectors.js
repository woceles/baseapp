export const selectUserActivity = (state) => state.user.userActivity.list;
export const selectTotalNumber = (state) => state.user.userActivity.total;
export const selectUserActivityCurrentPage = (state) => state.user.userActivity.page;
export const selectUserActivityPageCount = (state, limit) => Math.ceil(state.user.userActivity.total / limit);
export const selectUserActivityFirstElemIndex = (state, limit) => (state.user.userActivity.page * limit) + 1;
export const selectUserActivityLastElemIndex = (state, limit) => {
    if ((state.user.userActivity.page * limit) + limit > selectTotalNumber(state)) {
        return selectTotalNumber(state);
    }
    else {
        return (state.user.userActivity.page * limit) + limit;
    }
};
export const selectUserActivityNextPageExists = (state, limit) => (state.user.userActivity.page + 1) < selectUserActivityPageCount(state, limit);
export const selectUserActivityLoading = (state) => state.user.userActivity.loading;