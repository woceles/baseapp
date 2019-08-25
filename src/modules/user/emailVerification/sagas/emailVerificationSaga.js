import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush, } from '../../../public/alert';
import { emailVerificationData, emailVerificationError, } from '../actions';
const sessionsConfig = {
    apiVersion: 'barong',
};
export function* emailVerificationSaga(action) {
    try {
        yield call(API.post(sessionsConfig), '/identity/users/email/generate_code', {
            email: action.payload.email,
            lang: action.payload.lang,
        });
        yield put(emailVerificationData());
        yield put(alertPush({ message: ['success.message.sent'], type: 'success' }));
    }
    catch (error) {
        yield put(emailVerificationError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}