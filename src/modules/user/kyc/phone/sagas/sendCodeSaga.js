import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { alertPush } from '../../../../public/alert';
import { resendCodeData, sendCodeData, sendCodeError } from '../actions';
const sessionsConfig = {
    apiVersion: 'barong',
};
export function* sendCodeSaga(action) {
    try {
        yield call(API.post(sessionsConfig), '/resource/phones', action.payload);
        yield put(sendCodeData());
        yield put(alertPush({ message: ['success.phone.verification.send'], type: 'success' }));
    }
    catch (error) {
        if (error.message.indexOf('resource.phone.number_exist') > -1) {
            yield call(API.post(sessionsConfig), '/resource/phones/send_code', action.payload);
            yield put(resendCodeData());
            yield put(alertPush({ message: ['success.phone.verification.send'], type: 'success' }));
        }
        else {
            yield put(sendCodeError(error));
            yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
        }
    }
}