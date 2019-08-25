import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { orderBookData, orderBookError, } from '../actions';
const orderBookOptions = {
    apiVersion: 'peatio',
};
export function* orderBookSaga(action) {
    try {
        const market = action.payload;
        if (!market.id) {
            throw new Error(`ERROR: Empty market provided to orderBookSaga`);
        }
        const orderBook = yield call(API.get(orderBookOptions), `/public/markets/${market.id}/order-book`);
        yield put(orderBookData(orderBook));
    }
    catch (error) {
        yield put(orderBookError(error));
    }
}