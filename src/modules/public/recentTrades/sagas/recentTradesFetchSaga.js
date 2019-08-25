
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { recentTradesData, recentTradesError, } from '../actions';
const tradesOptions = {
    apiVersion: 'peatio',
};
export function* recentTradesFetchSaga(action) {
    try {
        const market = action.payload;
        if (!market.id) {
            throw new Error(`ERROR: Empty market provided to recentTradesFetchSaga`);
        }
        const trades = yield call(API.get(tradesOptions), `/public/markets/${market.id}/trades`);
        yield put(recentTradesData(trades));
    }
    catch (error) {
        yield put(recentTradesError(error));
    }
}