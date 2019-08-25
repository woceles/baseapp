import { put, select } from 'redux-saga/effects';
import { defaultStorageLimit } from '../../../../api';
import { getTimezone, localeDate } from '../../../../helpers';
import { kindToMakerType } from '../../../helpers';
import { pushHistoryFinish } from '../actions';
import { selectHistory } from '../selectors';
export function* historyPushSaga(action) {
    const tradeEventToTrade = (tradeEvent) => {
        const { id, at, market, kind, price, volume } = tradeEvent;
        const funds = Number(price) * Number(volume);
        return {
            id,
            price,
            volume,
            funds: `${funds}`,
            market,
            created_at: localeDate(at, getTimezone(), ''),
            taker_type: kindToMakerType(kind),
        };
    };
    const actualList = yield select(selectHistory);
    const updatedTrades = [...[tradeEventToTrade(action.payload)], ...actualList].slice(0, defaultStorageLimit());
    yield put(pushHistoryFinish(updatedTrades));
}