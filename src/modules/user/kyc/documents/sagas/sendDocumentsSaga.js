import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { alertPush } from '../../../../public/alert';
import { sendDocumentsData, sendDocumentsError } from '../actions';
const sessionsConfig = {
    apiVersion: 'barong',
};
export function* sendDocumentsSaga(action) {
    try {
        const response = yield call(API.post(sessionsConfig), '/resource/documents', action.payload);
        const defaultMessage = 'success.documents.accepted';
        const { message = defaultMessage } = response;
        yield put(sendDocumentsData({ message }));
        yield put(alertPush({ message: [defaultMessage], type: 'success' }));
    }
    catch (error) {
        yield put(sendDocumentsError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}