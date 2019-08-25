import update from 'immutability-helper';
import { API_KEY_CREATE, API_KEY_DELETE, API_KEY_UPDATE, API_KEYS_2FA_MODAL, API_KEYS_DATA, } from './constants';
export const initialApiKeysState = {
    apiKeys: [],
    dataLoaded: false,
    modal: {
        active: false,
    },
};
export const apiKeysReducer = (state = initialApiKeysState, action) => {
    switch (action.type) {
        case API_KEYS_DATA:
            return {
                ...state,
                apiKeys: action.payload,
                dataLoaded: true,
            };
        case API_KEY_CREATE:
            return {
                ...state,
                apiKeys: state.apiKeys.concat(action.payload),
            };
        case API_KEY_UPDATE:
            const apiKeyIndex = state.apiKeys.findIndex(e => e.kid === action.payload.kid);
            const apiKeys = update(state.apiKeys, {
                [apiKeyIndex]: {
                    state: { $set: action.payload.state },
                },
            });
            return {
                ...state,
                apiKeys,
            };
        case API_KEY_DELETE:
            return {
                ...state,
                apiKeys: state.apiKeys.filter(apiKey => apiKey.kid !== action.payload.kid),
            };
        case API_KEYS_2FA_MODAL:
            return {
                ...state,
                modal: action.payload,
            };
        default:
            return state;
    }
};