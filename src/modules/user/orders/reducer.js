import { ORDER_EXECUTE_DATA, ORDER_EXECUTE_ERROR, ORDER_EXECUTE_FETCH, ORDERS_SET_CURRENT_PRICE, } from './constants';
const initialState = {
    executeLoading: false,
    currentPrice: '',
};
export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_EXECUTE_FETCH:
            return { ...state, executeLoading: true, executeError: undefined };
        case ORDER_EXECUTE_DATA:
            return { ...state, executeLoading: false, executeError: undefined };
        case ORDER_EXECUTE_ERROR:
            return { ...state, executeLoading: false, executeError: action.payload };
        case ORDERS_SET_CURRENT_PRICE:
            return { ...state, currentPrice: action.payload };
        default:
            return state;
    }
};