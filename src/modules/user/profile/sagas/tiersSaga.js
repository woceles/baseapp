import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { tiersData, tiersDisable, tiersError, } from '../actions';
const tiersOptions = {
    apiVersion: 'applogic',
};
export function* tiersSaga(action) {
    try {
        const { uid, currency } = action.payload;
        const tier = yield call(API.get(tiersOptions), `/tiers/${uid}?currency=${currency}`);
        yield put(tiersData(tier));
    }
    catch (error) {
        const tiersDisabled = error.code === 204;
        if (tiersDisabled) {
            yield put(tiersDisable());
        }
        else {
            yield put(tiersError(error));
        }
    }
}