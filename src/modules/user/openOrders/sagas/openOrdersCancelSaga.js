import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { openOrdersCancelData, openOrdersCancelError } from '../actions';
const ordersCancelOptions = {
    apiVersion: 'peatio',
};
export function* openOrdersCancelSaga(action) {
    try {
        const { id, list } = action.payload;
        yield call(API.post(ordersCancelOptions), `/market/orders/${id}/cancel`, { id });
        const updatedList = list.filter(order => order.id !== id);
        yield put(openOrdersCancelData(updatedList));
        yield put(alertPush({ message: ['success.order.canceled'], type: 'success' }));
    }
    catch (error) {
        yield put(openOrdersCancelError());
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}