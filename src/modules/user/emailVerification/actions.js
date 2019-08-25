import { EMAIL_VERIFICATION_DATA, EMAIL_VERIFICATION_ERROR, EMAIL_VERIFICATION_FETCH, } from './constants';
export const emailVerificationData = () => ({
    type: EMAIL_VERIFICATION_DATA,
});
export const emailVerificationError = (error) => ({
    type: EMAIL_VERIFICATION_ERROR,
    error,
});
export const emailVerificationFetch = (payload) => ({
    type: EMAIL_VERIFICATION_FETCH,
    payload,
});