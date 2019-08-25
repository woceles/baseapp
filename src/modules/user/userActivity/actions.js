import { USER_ACTIVITY_DATA, USER_ACTIVITY_ERROR, USER_ACTIVITY_FETCH, } from './constants';
export const getUserActivity = (payload) => ({
    type: USER_ACTIVITY_FETCH,
    payload,
});
export const userActivityData = (payload) => ({
    type: USER_ACTIVITY_DATA,
    payload,
});
export const userActivityError = (payload) => ({
    type: USER_ACTIVITY_ERROR,
    payload,
});