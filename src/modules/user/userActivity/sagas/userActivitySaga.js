import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { userActivityData, userActivityError, } from '../actions';
const userActivityOptions = {
    apiVersion: 'barong',
    withHeaders: true,
};
export function* userActivitySaga(action) {
    try {
        const { page, limit } = action.payload;
        const { data, headers } = yield call(API.get(userActivityOptions), `/resource/users/activity/all?limit=${limit}&page=${page + 1}`);
        yield put(userActivityData({ list: data, page, total: headers.total }));
    }
    catch (error) {
        yield put(userActivityError(error));
    }
}