import { Button, Loader } from '@openware/components';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CurrencyInfo, DepositCrypto, DepositFiat, TabPanel, WalletList } from '../../components';
import { ModalWithdrawConfirmation } from '../../containers/ModalWithdrawConfirmation';
import { ModalWithdrawSubmit } from '../../containers/ModalWithdrawSubmit';
import { EstimatedValue } from '../../containers/Wallets/EstimatedValue';
import { WalletHistory } from '../../containers/Wallets/History';
import { Withdraw } from '../../containers/Wallets/Withdraw';
import { setDocumentTitle } from '../../helpers';
import { alertPush, selectHistory, selectMobileWalletUi, selectUserInfo, selectWallets, selectWalletsAddressError, selectWalletsLoading, selectWithdrawSuccess, setMobileWalletUi, walletsAddressFetch, walletsData, walletsFetch, walletsWithdrawCcyFetch, } from '../../modules';
class WalletsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.translate = (id) => this.props.intl.formatMessage({ id });
        this.title = this.translate('page.body.wallets.tabs.deposit.fiat.message1');
        this.description = this.translate('page.body.wallets.tabs.deposit.fiat.message2');
        this.onTabChange = (index, label) => this.setState({ tab: label });
        this.onActiveIndexChange = index => this.setState({ activeIndex: index });
        this.onCurrentTabChange = index => this.setState({ currentTabIndex: index });
        this.toggleSubmitModal = () => {
            this.setState((state) => ({
                withdrawSubmitModal: !state.withdrawSubmitModal,
                withdrawDone: true,
            }));
        };
        this.toggleConfirmModal = (amount, total, rid, otpCode) => {
            this.setState((state) => ({
                amount: amount ? amount : 0,
                rid: rid ? rid : '',
                otpCode: otpCode ? otpCode : '',
                withdrawConfirmModal: !state.withdrawConfirmModal,
                total: total ? total : 0,
            }));
        };
        this.handleWithdraw = () => {
            const { selectedWalletIndex, otpCode, amount, rid } = this.state;
            if (selectedWalletIndex === -1) {
                return;
            }
            const { currency } = this.props.wallets[selectedWalletIndex];
            const withdrawRequest = { amount, currency: currency.toLowerCase(), otp: otpCode, rid };
            this.props.walletsWithdrawCcy(withdrawRequest);
            this.toggleConfirmModal();
        };
        this.handleOnCopy = () => {
            this.props.fetchSuccess({ message: ['page.body.wallets.tabs.deposit.ccy.message.success'], type: 'success' });
        };
        this.isOtpDisabled = () => {
            return (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "pg-wallet__enable-2fa-message" }, this.translate('page.body.wallets.tabs.withdraw.content.enable2fa')),
                React.createElement(Button, { className: "pg-wallet__button-2fa", label: this.translate('page.body.wallets.tabs.withdraw.content.enable2faButton'), onClick: this.redirectToEnable2fa })));
        };
        this.redirectToEnable2fa = () => this.props.history.push('/security/2fa', { enable2fa: true });
        this.onWalletSelectionChange = (value) => {
            const { wallets } = this.props;
            if (!value.address && !this.props.walletsLoading && value.type !== 'fiat') {
                this.props.fetchAddress({ currency: value.currency });
            }
            const nextWalletIndex = this.props.wallets.findIndex(wallet => wallet.currency.toLowerCase() === value.currency.toLowerCase());
            this.setState({ selectedWalletIndex: nextWalletIndex, withdrawDone: false });
            this.props.setMobileWalletUi(wallets[nextWalletIndex].name);
        };
        this.state = {
            activeIndex: 0,
            selectedWalletIndex: -1,
            withdrawSubmitModal: false,
            withdrawConfirmModal: false,
            otpCode: '',
            amount: 0,
            rid: '',
            tab: this.translate('page.body.wallets.tabs.deposit'),
            withdrawDone: false,
            total: 0,
            currentTabIndex: 0,
        };
    }
    componentDidMount() {
        setDocumentTitle('Wallets');
        if (this.props.wallets.length === 0) {
            this.props.fetchWallets();
        }
        else {
            this.props.fetchAddress({ currency: this.props.wallets[0].currency });
        }
        if (this.state.selectedWalletIndex === -1 && this.props.wallets.length) {
            this.setState({ selectedWalletIndex: 0 });
        }
    }
    componentWillUnmount() {
        this.props.clearWallets();
    }
    componentWillReceiveProps(next) {
        if (this.props.wallets.length === 0 && next.wallets.length > 0) {
            this.setState({
                selectedWalletIndex: 0,
            });
            this.props.fetchAddress({ currency: next.wallets[0].currency });
        }
        if (!this.props.withdrawSuccess && next.withdrawSuccess) {
            this.toggleSubmitModal();
        }
    }
    render() {
        const { wallets, historyList, mobileWalletChosen, walletsLoading } = this.props;
        const { total, rid, selectedWalletIndex, filteredWallets, withdrawSubmitModal, withdrawConfirmModal, currentTabIndex, } = this.state;
        const formattedWallets = wallets.map((wallet) => ({
            ...wallet,
            currency: wallet.currency.toUpperCase(),
            iconUrl: wallet.iconUrl ? wallet.iconUrl : '',
        }));
        const selectedCurrency = (wallets[selectedWalletIndex] || { currency: '' }).currency;
        return (React.createElement(React.Fragment, null,
            React.createElement(EstimatedValue, { wallets: wallets }),
            React.createElement("div", { className: "pg-container pg-wallet" },
                React.createElement("div", { className: "text-center" }, walletsLoading && React.createElement(Loader, null)),
                React.createElement("div", { className: `row no-gutters pg-wallet__tabs-content ${!historyList.length && 'pg-wallet__tabs-content-height'}` },
                    React.createElement("div", { className: `col-md-5 col-sm-12 col-12 ${mobileWalletChosen && 'd-none d-md-block'}` },
                        React.createElement(WalletList, { onWalletSelectionChange: this.onWalletSelectionChange, walletItems: filteredWallets || formattedWallets, activeIndex: this.state.activeIndex, onActiveIndexChange: this.onActiveIndexChange })),
                    React.createElement("div", { className: `pg-wallet__tabs col-md-7 col-sm-12 col-12 ${!mobileWalletChosen && 'd-none d-md-block'}` },
                        React.createElement(TabPanel, { panels: this.renderTabs(selectedWalletIndex), onTabChange: this.onTabChange, currentTabIndex: currentTabIndex, onCurrentTabChange: this.onCurrentTabChange }))),
                React.createElement(ModalWithdrawSubmit, { show: withdrawSubmitModal, currency: selectedCurrency, onSubmit: this.toggleSubmitModal }),
                React.createElement(ModalWithdrawConfirmation, { show: withdrawConfirmModal, amount: total, currency: selectedCurrency, rid: rid, onSubmit: this.handleWithdraw, onDismiss: this.toggleConfirmModal }))));
    }
    renderTabs(walletIndex) {
        const { tab, withdrawDone } = this.state;
        if (walletIndex === -1) {
            return [{ content: null, label: '' }];
        }
        const { user: { level, otp }, wallets } = this.props;
        const wallet = wallets[walletIndex];
        const { currency, fee, type } = wallet;
        const fixed = (wallet || { fixed: 0 }).fixed;
        const withdrawProps = {
            withdrawDone,
            currency,
            fee,
            onClick: this.toggleConfirmModal,
            borderItem: 'empty-circle',
            twoFactorAuthRequired: this.isTwoFactorAuthRequired(level, otp),
            fixed,
            withdrawAddressLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.address' }),
            withdrawAmountLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.amount' }),
            withdraw2faLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.code2fa' }),
            withdrawFeeLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.fee' }),
            withdrawTotalLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.total' }),
            withdrawButtonLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.button' }),
            withdrawAddressLabelPlaceholder: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.addressPlaceholder' }),
        };
        return [
            {
                content: tab === this.translate('page.body.wallets.tabs.deposit') ? this.renderDeposit(wallet) : null,
                label: this.translate('page.body.wallets.tabs.deposit'),
            },
            {
                content: tab === this.translate('page.body.wallets.tabs.withdraw') ? this.renderWithdraw(withdrawProps, type) : null,
                label: this.translate('page.body.wallets.tabs.withdraw'),
            },
        ];
    }
    renderDeposit(wallet) {
        const { addressDepositError, wallets } = this.props;
        const { selectedWalletIndex } = this.state;
        const currency = (wallets[selectedWalletIndex] || { currency: '' }).currency;
        const text = this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.submit' });
        const error = addressDepositError ?
            this.props.intl.formatMessage({ id: addressDepositError.message }) :
            this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.error' });
        const walletAddress = wallet.currency === 'BCH' && wallet.address /* global bch */
            ? bch.Address(wallet.address).toString(bch.Address.CashAddrFormat)
            : wallet.address || '';
        if (wallet.type === 'coin') {
            return (React.createElement(React.Fragment, null,
                React.createElement(CurrencyInfo, { wallet: wallets[selectedWalletIndex] }),
                React.createElement(DepositCrypto, { data: walletAddress, handleOnCopy: this.handleOnCopy, error: error, text: text, disabled: walletAddress === '', copiableTextFieldText: this.translate('page.body.wallets.tabs.deposit.ccy.message.address'), copyButtonText: this.translate('page.body.wallets.tabs.deposit.ccy.message.button') }),
                currency && React.createElement(WalletHistory, { label: "deposit", type: "deposits", currency: currency })));
        }
        else {
            return (React.createElement(React.Fragment, null,
                React.createElement(CurrencyInfo, { wallet: wallets[selectedWalletIndex] }),
                React.createElement(DepositFiat, { title: this.title, description: this.description }),
                currency && React.createElement(WalletHistory, { label: "deposit", type: "deposits", currency: currency })));
        }
    }
    renderWithdraw(withdrawProps, type) {
        const { walletsError, user, wallets } = this.props;
        const { selectedWalletIndex } = this.state;
        const currency = (wallets[selectedWalletIndex] || { currency: '' }).currency;
        if (type === 'fiat') {
            return (React.createElement("p", { className: "pg-wallet__enable-2fa-message" }, this.translate('page.body.wallets.tabs.deposit.fiat.admin')));
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(CurrencyInfo, { wallet: wallets[selectedWalletIndex] }),
            walletsError && React.createElement("p", { className: "pg-wallet__error" }, walletsError.message),
            user.otp ? React.createElement(Withdraw, Object.assign({}, withdrawProps)) : this.isOtpDisabled(),
            user.otp && currency && React.createElement(WalletHistory, { label: "withdraw", type: "withdraws", currency: currency })));
    }
    isTwoFactorAuthRequired(level, is2faEnabled) {
        return level > 1 || level === 1 && is2faEnabled;
    }
}
const mapStateToProps = (state) => ({
    user: selectUserInfo(state),
    wallets: selectWallets(state),
    walletsLoading: selectWalletsLoading(state),
    addressDepositError: selectWalletsAddressError(state),
    withdrawSuccess: selectWithdrawSuccess(state),
    historyList: selectHistory(state),
    mobileWalletChosen: selectMobileWalletUi(state),
});
const mapDispatchToProps = dispatch => ({
    fetchWallets: () => dispatch(walletsFetch()),
    fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
    walletsWithdrawCcy: params => dispatch(walletsWithdrawCcyFetch(params)),
    clearWallets: () => dispatch(walletsData([])),
    fetchSuccess: payload => dispatch(alertPush(payload)),
    setMobileWalletUi: payload => dispatch(setMobileWalletUi(payload)),
});

export const WalletsScreen = injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletsComponent)));