import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { changePasswordData, changePasswordError, } from '../actions';
const changePasswordOptions = {
    apiVersion: 'barong',
};
export function* changePasswordSaga(action) {
    try {
        yield call(API.put(changePasswordOptions), '/resource/users/password', action.payload);
        yield put(changePasswordData());
        yield put(alertPush({ message: ['success.password.changed'], type: 'success' }));
    }
    catch (error) {
        yield put(changePasswordError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}