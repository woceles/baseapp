import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { alertPush } from '../../../../public/alert';
import { resendCodeData, resendCodeError } from '../actions';
const sessionsConfig = {
    apiVersion: 'barong',
};
export function* resendCodeSaga(action) {
    try {
        yield call(API.post(sessionsConfig), '/resource/phones/send_code', action.payload);
        yield put(resendCodeData());
        yield put(alertPush({ message: ['success.phone.verification.send'], type: 'success' }));
    }
    catch (error) {
        yield put(resendCodeError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}