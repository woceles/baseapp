import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { alertPush } from '../../../../public/alert';
import { sendIdentityData, sendIdentityError } from '../actions';
const sessionsConfig = {
    apiVersion: 'barong',
};
export function* sendIdentitySaga(action) {
    try {
        const response = yield call(API.post(sessionsConfig), '/resource/profiles', action.payload);
        const defaultMessage = 'success.documents.accepted';
        const { message = defaultMessage } = response;
        yield put(sendIdentityData({ message }));
        yield put(alertPush({ message: [defaultMessage], type: 'success' }));
    }
    catch (error) {
        yield put(sendIdentityError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}