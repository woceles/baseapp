import { PROFILE_CHANGE_PASSWORD_DATA, PROFILE_CHANGE_PASSWORD_ERROR, PROFILE_CHANGE_PASSWORD_FETCH, PROFILE_CHANGE_USER_LEVEL, PROFILE_ENABLE_USER_2FA, PROFILE_GENERATE_2FA_QRCODE_DATA, PROFILE_GENERATE_2FA_QRCODE_ERROR, PROFILE_GENERATE_2FA_QRCODE_FETCH, PROFILE_RESET_USER, PROFILE_TIERS_DATA, PROFILE_TIERS_DISABLE, PROFILE_TIERS_ERROR, PROFILE_TIERS_FETCH, PROFILE_TOGGLE_2FA_DATA, PROFILE_TOGGLE_2FA_ERROR, PROFILE_TOGGLE_2FA_FETCH, PROFILE_USER_DATA, PROFILE_USER_ERROR, PROFILE_USER_FETCH, } from './constants';
export const changePasswordFetch = (payload) => ({
    type: PROFILE_CHANGE_PASSWORD_FETCH,
    payload,
});
export const changePasswordData = () => ({
    type: PROFILE_CHANGE_PASSWORD_DATA,
});
export const changePasswordError = (payload) => ({
    type: PROFILE_CHANGE_PASSWORD_ERROR,
    payload,
});
export const toggle2faFetch = (payload) => ({
    type: PROFILE_TOGGLE_2FA_FETCH,
    payload,
});
export const toggle2faData = () => ({
    type: PROFILE_TOGGLE_2FA_DATA,
});
export const toggle2faError = (payload) => ({
    type: PROFILE_TOGGLE_2FA_ERROR,
    payload,
});
export const generate2faQRFetch = () => ({
    type: PROFILE_GENERATE_2FA_QRCODE_FETCH,
});
export const generate2faQRData = (payload) => ({
    type: PROFILE_GENERATE_2FA_QRCODE_DATA,
    payload,
});
export const generate2faQRError = (payload) => ({
    type: PROFILE_GENERATE_2FA_QRCODE_ERROR,
    payload,
});
export const tiersFetch = (payload) => ({
    type: PROFILE_TIERS_FETCH,
    payload,
});
export const tiersData = (payload) => ({
    type: PROFILE_TIERS_DATA,
    payload,
});
export const tiersError = (payload) => ({
    type: PROFILE_TIERS_ERROR,
    payload,
});
export const tiersDisable = () => ({
    type: PROFILE_TIERS_DISABLE,
});
export const userFetch = () => ({
    type: PROFILE_USER_FETCH,
});
export const userData = (payload) => ({
    type: PROFILE_USER_DATA,
    payload,
});
export const userError = (payload) => ({
    type: PROFILE_USER_ERROR,
    payload,
});
export const userReset = () => ({
    type: PROFILE_RESET_USER,
});
export const changeUserLevel = (payload) => ({
    type: PROFILE_CHANGE_USER_LEVEL,
    payload,
});
export const enableUser2fa = () => ({
    type: PROFILE_ENABLE_USER_2FA,
});