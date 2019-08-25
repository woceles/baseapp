import { AUTH_ERROR, AUTH_LOGOUT_FAILURE, AUTH_LOGOUT_FETCH, AUTH_SIGN_IN_ERROR, AUTH_SIGN_IN_FETCH, AUTH_SIGN_IN_REQUIRE_2FA, AUTH_SIGN_UP_FETCH, AUTH_SIGN_UP_REQUIRE_VERIFICATION, AUTH_VERIFICATION_FETCH, AUTH_VERIFICATION_SUCCESS, } from './constants';
export const signIn = (payload) => ({
    type: AUTH_SIGN_IN_FETCH,
    payload,
});
export const signInError = (payload) => ({
    type: AUTH_SIGN_IN_ERROR,
    payload,
});
export const signInRequire2FA = (payload) => ({
    type: AUTH_SIGN_IN_REQUIRE_2FA,
    payload,
});
export const signUp = (payload) => ({
    type: AUTH_SIGN_UP_FETCH,
    payload,
});
export const signUpError = (payload) => ({
    type: AUTH_ERROR,
    payload,
});
export const signUpRequireVerification = (payload) => ({
    type: AUTH_SIGN_UP_REQUIRE_VERIFICATION,
    payload,
});
export const verificationFetch = (payload) => ({
    type: AUTH_VERIFICATION_FETCH,
    payload,
});
export const verificationSuccess = () => ({
    type: AUTH_VERIFICATION_SUCCESS,
});
export const logoutFetch = () => ({
    type: AUTH_LOGOUT_FETCH,
});
export const logoutError = (payload) => ({
    type: AUTH_LOGOUT_FAILURE,
    payload,
});