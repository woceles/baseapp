import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { forgotPasswordError, forgotPasswordSuccess, } from '../actions';
const forgotPasswordConfig = {
    apiVersion: 'barong',
};
export function* forgotPasswordSaga(action) {
    try {
        yield call(API.post(forgotPasswordConfig), '/identity/users/password/generate_code', action.payload);
        yield put(forgotPasswordSuccess());
        yield put(alertPush({ message: ['success.password.forgot'], type: 'success' }));
    }
    catch (error) {
        yield put(forgotPasswordError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}