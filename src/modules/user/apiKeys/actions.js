import { API_KEY_CREATE, API_KEY_CREATE_FETCH, API_KEY_DELETE, API_KEY_DELETE_FETCH, API_KEY_UPDATE, API_KEY_UPDATE_FETCH, API_KEYS_2FA_MODAL, API_KEYS_DATA, API_KEYS_FETCH, } from './constants';
const API_KEY_ALGORITHM = 'HS256';
export const apiKeysFetch = (payload) => ({
    type: API_KEYS_FETCH,
    payload,
});
export const apiKeysData = (payload) => ({
    type: API_KEYS_DATA,
    payload,
});
export const apiKeyCreateFetch = (payload) => ({
    type: API_KEY_CREATE_FETCH,
    payload: {
        ...payload,
        algorithm: API_KEY_ALGORITHM,
    },
});
export const apiKeyCreate = (payload) => ({
    type: API_KEY_CREATE,
    payload,
});
export const apiKeyUpdateFetch = (payload) => ({
    type: API_KEY_UPDATE_FETCH,
    payload,
});
export const apiKeyUpdate = (payload) => ({
    type: API_KEY_UPDATE,
    payload,
});
export const apiKeyDeleteFetch = (payload) => ({
    type: API_KEY_DELETE_FETCH,
    payload,
});
export const apiKeyDelete = (payload) => ({
    type: API_KEY_DELETE,
    payload,
});
export const apiKeys2FAModal = (payload) => ({
    type: API_KEYS_2FA_MODAL,
    payload,
});