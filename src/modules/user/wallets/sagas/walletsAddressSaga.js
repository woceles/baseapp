import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { walletsAddressData, walletsAddressError, } from '../actions';
const walletsAddressOptions = {
    apiVersion: 'peatio',
};
export function* walletsAddressSaga(action) {
    try {
        const currency = action.payload.currency.toLocaleLowerCase();
        const url = `/account/deposit_address/${currency}`;
        const { address } = yield call(API.get(walletsAddressOptions), url);
        yield put(walletsAddressData({
            address,
            currency,
        }));
    }
    catch (error) {
        yield put(walletsAddressError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}