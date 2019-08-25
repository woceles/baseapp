import { RANGER_CONNECT_DATA, RANGER_CONNECT_ERROR, RANGER_CONNECT_FETCH, RANGER_DISCONNECT_DATA, RANGER_SUBSCRIPTIONS_DATA, } from './constants';
const initialRangerState = {
    withAuth: false,
    connected: false,
    subscriptions: [],
};
export const rangerReducer = (state = initialRangerState, action) => {
    switch (action.type) {
        case RANGER_CONNECT_FETCH:
            return {
                ...state,
                withAuth: action.payload.withAuth,
                connected: false,
            };
        case RANGER_SUBSCRIPTIONS_DATA:
            return {
                ...state,
                subscriptions: [...action.payload.subscriptions],
            };
        case RANGER_CONNECT_DATA:
            return {
                ...state,
                connected: true,
            };
        case RANGER_CONNECT_ERROR:
        case RANGER_DISCONNECT_DATA:
            return {
                ...state,
                connected: false,
            };
        default:
    }
    return state;
};