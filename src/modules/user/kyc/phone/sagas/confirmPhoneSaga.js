import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { alertPush } from '../../../../public/alert';
import { verifyPhoneData, verifyPhoneError, } from '../actions';
const sessionsConfig = {
    apiVersion: 'barong',
};
export function* confirmPhoneSaga(action) {
    try {
        const { message } = yield call(API.post(sessionsConfig), '/resource/phones/verify', action.payload);
        yield put(verifyPhoneData({ message }));
        yield put(alertPush({ message: ['success.phone.confirmed'], type: 'success' }));
    }
    catch (error) {
        yield put(verifyPhoneError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}