import { USER_ACTIVITY_DATA, USER_ACTIVITY_ERROR, USER_ACTIVITY_FETCH, } from './constants';
export const initialUserActivityState = {
    list: [],
    loading: false,
    page: 0,
    total: 0,
};
export const userActivityReducer = (state = initialUserActivityState, action) => {
    switch (action.type) {
        case USER_ACTIVITY_FETCH:
            return {
                ...state,
                loading: true,
            };
        case USER_ACTIVITY_DATA:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        case USER_ACTIVITY_ERROR:
            return {
                ...state,
                error: action.payload,
                list: [],
                loading: false,
                page: 0,
                total: 0,
            };
        default:
            return state;
    }
};