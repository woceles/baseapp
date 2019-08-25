import { PHONE_RESEND_CODE_DATA, PHONE_RESEND_CODE_ERROR, PHONE_RESEND_CODE_FETCH, PHONE_SEND_CODE_DATA, PHONE_SEND_CODE_ERROR, PHONE_SEND_CODE_FETCH, PHONE_VERIFY_DATA, PHONE_VERIFY_ERROR, PHONE_VERIFY_FETCH, } from './constants';
export const sendCode = (payload) => ({
    type: PHONE_SEND_CODE_FETCH,
    payload,
});
export const sendCodeData = () => ({
    type: PHONE_SEND_CODE_DATA,
});
export const sendCodeError = (payload) => ({
    type: PHONE_SEND_CODE_ERROR,
    payload,
});
export const resendCode = (payload) => ({
    type: PHONE_RESEND_CODE_FETCH,
    payload,
});
export const resendCodeData = () => ({
    type: PHONE_RESEND_CODE_DATA,
});
export const resendCodeError = (payload) => ({
    type: PHONE_RESEND_CODE_ERROR,
    payload,
});
export const verifyPhone = (payload) => ({
    type: PHONE_VERIFY_FETCH,
    payload,
});
export const verifyPhoneData = (payload) => ({
    type: PHONE_VERIFY_DATA,
    payload,
});
export const verifyPhoneError = (payload) => ({
    type: PHONE_VERIFY_ERROR,
    payload,
});