import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { apiKeyDelete, apiKeys2FAModal } from '../actions';
const deleteOptions = {
    apiVersion: 'barong',
};
export function* apiKeyDeleteSaga(action) {
    try {
        const { kid, totp_code } = action.payload;
        yield call(API.delete(deleteOptions), `/resource/api_keys/${kid}?totp_code=${totp_code}`);
        yield put(apiKeyDelete({ kid }));
        yield put(alertPush({ message: ['success.api_keys.deleted'], type: 'success' }));
    }
    catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
    finally {
        yield put(apiKeys2FAModal({ active: false }));
    }
}