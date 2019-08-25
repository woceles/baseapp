import { KLINE_DATA, KLINE_FETCH, KLINE_PUSH, } from './constants';
export const klineArrayToObject = (el) => {
    const [time, open, high, low, close, volume] = el.map((e) => {
        switch (typeof e) {
            case 'number':
                return e;
            case 'string':
                return Number.parseFloat(e);
            default:
                throw (new Error(`unexpected type ${typeof e} in kline: ${el}`));
        }
    });
    return {
        time: time * 1e3,
        open,
        high,
        low,
        close,
        volume,
    };
};
export const initialKlineState = {
    last: undefined,
    marketId: undefined,
    period: undefined,
    loading: false,
    data: [],
};
export const klineReducer = (state = initialKlineState, action) => {
    switch (action.type) {
        case KLINE_PUSH:
            const { kline, marketId, period } = action.payload;
            return {
                ...state,
                marketId,
                period,
                last: klineArrayToObject(kline),
            };
        case KLINE_FETCH:
            return {
                ...state,
                loading: true,
            };
        case KLINE_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        default:
            return state;
    }
};