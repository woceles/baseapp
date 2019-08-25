import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { apiKeys2FAModal, apiKeyUpdate } from '../actions';
const updateOptions = {
    apiVersion: 'barong',
};
export function* apiKeyUpdateSaga(action) {
    try {
        const { totp_code } = action.payload;
        const { kid, state } = action.payload.apiKey;
        const updatedApiKey = yield call(API.patch(updateOptions), `/resource/api_keys/${kid}`, { totp_code, state });
        yield put(apiKeyUpdate(updatedApiKey));
        yield put(alertPush({ message: ['success.api_keys.updated'], type: 'success' }));
    }
    catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
    finally {
        yield put(apiKeys2FAModal({ active: false }));
    }
}