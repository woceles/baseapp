import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { labelData, labelError, } from '../actions';
const userOptions = {
    apiVersion: 'barong',
};
export function* labelSaga() {
    try {
        const payload = yield call(API.get(userOptions), '/resource/labels');
        yield put(labelData(payload));
    }
    catch (error) {
        yield put(labelError(error));
    }
}