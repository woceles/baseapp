import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { generate2faQRData, generate2faQRError } from '../actions';
const generate2faQROptions = {
    apiVersion: 'barong',
};
export function* generate2faQRSaga() {
    try {
        const qrData = yield call(API.post(generate2faQROptions), '/resource/otp/generate_qrcode');
        const { barcode, url } = qrData.data;
        yield put(generate2faQRData({ barcode, url }));
    }
    catch (error) {
        yield put(generate2faQRError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}