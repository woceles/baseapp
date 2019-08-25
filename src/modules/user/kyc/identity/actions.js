import { SEND_IDENTITY_DATA, SEND_IDENTITY_ERROR, SEND_IDENTITY_FETCH, } from './constants';
export const sendIdentity = (payload) => ({
    type: SEND_IDENTITY_FETCH,
    payload,
});
export const sendIdentityData = (payload) => ({
    type: SEND_IDENTITY_DATA,
    payload,
});
export const sendIdentityError = (payload) => ({
    type: SEND_IDENTITY_ERROR,
    payload,
});