import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { ordersHistoryCancelData, ordersHistoryCancelError, } from '../actions';
const ordersCancelOptions = {
    apiVersion: 'peatio',
};
export function* ordersHistoryCancelSaga(action) {
    try {
        const { id, type, list } = action.payload;
        yield call(API.post(ordersCancelOptions), `/market/orders/${id}/cancel`, { id });
        let updatedList = [];
        if (type === 'all') {
            updatedList = list.map(order => {
                if (order.id === id) {
                    order.state = 'cancel';
                }
                return order;
            });
        }
        else {
            updatedList = list.filter(order => order.id !== id);
        }
        yield put(ordersHistoryCancelData(updatedList));
        yield put(alertPush({ message: ['success.order.canceled'], type: 'success' }));
    }
    catch (error) {
        yield put(ordersHistoryCancelError());
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}