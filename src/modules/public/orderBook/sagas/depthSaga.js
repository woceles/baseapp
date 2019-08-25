import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { depthData, depthError, } from '../actions';
const depthOptions = {
    apiVersion: 'peatio',
};
export function* depthSaga(action) {
    try {
        const market = action.payload;
        const depth = yield call(API.get(depthOptions), `/public/markets/${market.id}/depth`);
        yield put(depthData(depth));
    }
    catch (error) {
        yield put(depthError(error));
    }
}