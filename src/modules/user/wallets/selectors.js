export const selectWallets = (state) => state.user.wallets.wallets.list;
export const selectWalletsLoading = (state) => state.user.wallets.wallets.loading;
export const selectWithdrawSuccess = (state) => state.user.wallets.wallets.withdrawSuccess;
export const selectWalletsAddressError = (state) => state.user.wallets.wallets.error;
export const selectMobileWalletUi = (state) => state.user.wallets.wallets.mobileWalletChosen;