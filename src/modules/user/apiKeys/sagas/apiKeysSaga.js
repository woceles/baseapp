import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { apiKeys2FAModal, apiKeysData } from '../actions';
const apiKeysOptions = {
    apiVersion: 'barong',
};
export function* apiKeysSaga(action) {
    try {
        const { totp_code } = action.payload;
        const apiKeys = yield call(API.get(apiKeysOptions), `/resource/api_keys?totp_code=${totp_code}`);
        yield put(apiKeysData(apiKeys));
        yield put(alertPush({ message: ['success.api_keys.fetched'], type: 'success' }));
    }
    catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
    finally {
        yield put(apiKeys2FAModal({ active: false }));
    }
}