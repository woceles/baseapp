import { DEPTH_DATA, DEPTH_ERROR, DEPTH_FETCH, ORDER_BOOK_DATA, ORDER_BOOK_ERROR, ORDER_BOOK_FETCH, } from './constants';
// TODO: Move market depth to his own module
export const initialOrderBook = {
    asks: [],
    bids: [],
    loading: false,
};
export const initialDepth = {
    asks: [],
    bids: [],
    loading: false,
};
export const orderBookReducer = (state = initialOrderBook, action) => {
    switch (action.type) {
        case ORDER_BOOK_FETCH:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case ORDER_BOOK_DATA:
            const { asks, bids } = action.payload;
            return {
                ...state,
                asks,
                bids,
                loading: false,
                error: undefined,
            };
        case ORDER_BOOK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
export const depthReducer = (state = initialDepth, action) => {
    switch (action.type) {
        case DEPTH_FETCH:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case DEPTH_DATA:
            const { asks, bids } = action.payload;
            return {
                ...state,
                asks,
                bids,
                loading: false,
                error: undefined,
            };
        case DEPTH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};