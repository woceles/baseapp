import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { signUpError, verificationSuccess } from '../actions';
const verificationConfig = {
    apiVersion: 'barong',
};
export function* verificationSaga(action) {
    try {
        yield call(API.post(verificationConfig), '/identity/users/email/confirm_code', action.payload);
        yield put(verificationSuccess());
        yield put(alertPush({ message: ['success.email.confirmed'], type: 'success' }));
    }
    catch (error) {
        yield put(signUpError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}