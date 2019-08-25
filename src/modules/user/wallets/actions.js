import { SET_MOBILE_WALLET_UI, WALLETS_ADDRESS_DATA, WALLETS_ADDRESS_ERROR, WALLETS_ADDRESS_FETCH, WALLETS_DATA, WALLETS_ERROR, WALLETS_FETCH, WALLETS_RESET, WALLETS_WITHDRAW_CCY_DATA, WALLETS_WITHDRAW_CCY_ERROR, WALLETS_WITHDRAW_CCY_FETCH, } from './constants';
export const walletsFetch = () => ({
    type: WALLETS_FETCH,
});
export const walletsData = (payload) => ({
    type: WALLETS_DATA,
    payload,
});
export const walletsError = (payload) => ({
    type: WALLETS_ERROR,
    payload,
});
export const walletsAddressFetch = (payload) => ({
    type: WALLETS_ADDRESS_FETCH,
    payload,
});
export const walletsAddressData = (payload) => ({
    type: WALLETS_ADDRESS_DATA,
    payload,
});
export const walletsAddressError = (payload) => ({
    type: WALLETS_ADDRESS_ERROR,
    payload,
});
export const walletsWithdrawCcyFetch = (payload) => ({
    type: WALLETS_WITHDRAW_CCY_FETCH,
    payload,
});
export const walletsWithdrawCcyData = () => ({
    type: WALLETS_WITHDRAW_CCY_DATA,
});
export const walletsWithdrawCcyError = (payload) => ({
    type: WALLETS_WITHDRAW_CCY_ERROR,
    payload,
});
export const walletsReset = () => ({
    type: WALLETS_RESET,
});
export const setMobileWalletUi = (payload) => ({
    type: SET_MOBILE_WALLET_UI,
    payload,
});