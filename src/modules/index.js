import { combineReducers } from 'redux';

import { all, call } from 'redux-saga/effects';
import { publicReducer, userReducer } from './app';
import { rootHandleAlertSaga } from './public/alert';
import { rootKlineFetchSaga } from './public/kline';
import { rootMarketsSaga } from './public/markets';
import { rootOrderBookSaga } from './public/orderBook';
import { rootRecentTradesSaga } from './public/recentTrades';
import { rootApiKeysSaga } from './user/apiKeys/sagas';
import { rootAuthSaga } from './user/auth';
import { rootEmailVerificationSaga } from './user/emailVerification';
import { rootHistorySaga } from './user/history';
import { rootSendDocumentsSaga } from './user/kyc/documents';
import { rootSendIdentitySaga } from './user/kyc/identity';
import { rootLabelSaga } from './user/kyc/label';
import { rootSendCodeSaga } from './user/kyc/phone';
import { rootNewHistorySaga } from './user/newHistory';
import { rootOpenOrdersSaga } from './user/openOrders';
import { rootOrdersSaga } from './user/orders';
import { rootOrdersHistorySaga } from './user/ordersHistory';
import { rootPasswordSaga } from './user/password';
import { rootProfileSaga } from './user/profile';
import { rootUserActivitySaga } from './user/userActivity';
import { rootWalletsSaga } from './user/wallets';
export * from './public/markets';
export * from './public/orderBook';
export * from './public/i18n';
export * from './public/kline';
export * from './public/alert';
export * from './user/apiKeys';
export * from './user/auth';
export * from './user/wallets';
export * from './user/profile';
export * from './user/openOrders';
export * from './user/orders';
export * from './user/ordersHistory';
export * from './user/password';
export * from './user/userActivity';
export * from './user/history';
export * from './user/newHistory';
export * from './user/kyc';
export * from './user/emailVerification';
export const rootReducer = combineReducers({
    public: publicReducer,
    user: userReducer,
});
export function* rootSaga() {
    yield all([
        call(rootAuthSaga),
        call(rootMarketsSaga),
        call(rootOrdersSaga),
        call(rootProfileSaga),
        call(rootWalletsSaga),
        call(rootPasswordSaga),
        call(rootSendCodeSaga),
        call(rootSendIdentitySaga),
        call(rootSendDocumentsSaga),
        call(rootRecentTradesSaga),
        call(rootOrderBookSaga),
        call(rootHandleAlertSaga),
        call(rootHistorySaga),
        call(rootNewHistorySaga),
        call(rootUserActivitySaga),
        call(rootApiKeysSaga),
        call(rootLabelSaga),
        call(rootOrdersHistorySaga),
        call(rootOpenOrdersSaga),
        call(rootEmailVerificationSaga),
        call(rootKlineFetchSaga),
    ]);
}