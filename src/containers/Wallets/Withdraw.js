import { Button, Decimal, Input } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
import { CustomInput, SummaryField } from '../../components';
class Withdraw extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            address: '',
            amount: '',
            otpCode: '',
            withdrawAddressFocused: false,
            withdrawAmountFocused: false,
            withdrawCodeFocused: false,
            total: 0,
        };
        this.renderFee = () => {
            const { fee, fixed, currency } = this.props;
            return (React.createElement("span", null,
                React.createElement(Decimal, { fixed: fixed }, fee.toString()),
                " ",
                currency.toUpperCase()));
        };
        this.renderTotal = () => {
            const total = this.state.total;
            const { fixed, currency } = this.props;
            return total ? (React.createElement("span", null,
                React.createElement(Decimal, { fixed: fixed }, total.toString()),
                " ",
                currency.toUpperCase())) : React.createElement("span", null,
                "0 ",
                currency.toUpperCase());
        };
        this.renderOtpCodeInput = () => {
            const { otpCode, withdrawCodeFocused } = this.state;
            const { withdraw2faLabel } = this.props;
            const withdrawCodeClass = classnames('cr-withdraw__group__code', {
                'cr-withdraw__group__code--focused': withdrawCodeFocused,
            });
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: withdrawCodeClass },
                    React.createElement(CustomInput, { type: "number", label: withdraw2faLabel || '2FA code', placeholder: withdraw2faLabel || '2FA code', defaultLabel: "2FA code", handleChangeInput: this.handleChangeInputOtpCode, inputValue: otpCode, handleFocusInput: () => this.handleFieldFocus('code'), classNameLabel: "cr-withdraw__label", classNameInput: "cr-withdraw__input", autoFocus: false })),
                React.createElement("div", { className: "cr-withdraw__divider cr-withdraw__divider-two" })));
        };
        this.handleClick = () => this.props.onClick(parseFloat(this.state.amount), this.state.total, this.state.address, this.state.otpCode);
        this.handleFieldFocus = (field) => {
            switch (field) {
                case 'amount':
                    this.setState(prev => ({
                        withdrawAmountFocused: !prev.withdrawAmountFocused,
                    }));
                    break;
                case 'address':
                    this.setState(prev => ({
                        withdrawAddressFocused: !prev.withdrawAddressFocused,
                    }));
                    break;
                case 'code':
                    this.setState(prev => ({
                        withdrawCodeFocused: !prev.withdrawCodeFocused,
                    }));
                    break;
                default:
                    break;
            }
        };
        this.handleChangeInputAmount = (text) => {
            const { fixed } = this.props;
            const value = (text !== '') ? Number(parseFloat(text).toFixed(fixed)) : '';
            const total = (value !== '') ? value - this.props.fee : 0;
            if (total < 0) {
                this.setTotal(0);
            }
            else {
                this.setTotal(total);
            }
            this.setState({ amount: value });
        };
        this.setTotal = (value) => {
            this.setState({ total: value });
        };
        this.handleChangeInputAddress = (text) => {
            this.setState({ address: text });
        };
        this.handleChangeInputOtpCode = (otpCode) => {
            this.setState({ otpCode });
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.currency !== nextProps.currency || nextProps.withdrawDone) {
            this.setState({ address: '', amount: '', otpCode: '', total: 0 });
        }
    }
    render() {
        const { address, amount, total, withdrawAddressFocused, withdrawAmountFocused, otpCode, } = this.state;
        const { borderItem, className, twoFactorAuthRequired, withdrawAddressLabelPlaceholder, withdrawAddressLabel, withdrawAmountLabel, withdrawFeeLabel, withdrawTotalLabel, withdrawButtonLabel, } = this.props;
        const cx = classnames('cr-withdraw', className);
        const lastDividerClassName = classnames('cr-withdraw__divider', {
            'cr-withdraw__divider-one': twoFactorAuthRequired,
            'cr-withdraw__divider-two': !twoFactorAuthRequired,
        });
        const withdrawAddressClass = classnames('cr-withdraw__group__address', {
            'cr-withdraw__group__address--focused': withdrawAddressFocused,
        });
        const withdrawAmountClass = classnames('cr-withdraw__group__amount', {
            'cr-withdraw__group__amount--focused': withdrawAmountFocused,
        });
        return (React.createElement("div", { className: cx },
            React.createElement("div", { className: "cr-withdraw-column" },
                React.createElement("div", { className: withdrawAddressClass },
                    React.createElement(CustomInput, { type: "email", label: withdrawAddressLabel || 'Withdrawal Addres', placeholder: withdrawAddressLabelPlaceholder || 'Withdrawal Addres', defaultLabel: "Withdrawal Addres", handleChangeInput: this.handleChangeInputAddress, inputValue: address, handleFocusInput: () => this.handleFieldFocus('address'), classNameLabel: "cr-withdraw__label", classNameInput: "cr-withdraw__input", autoFocus: false })),
                React.createElement("div", { className: "cr-withdraw__divider cr-withdraw__divider-one" }),
                React.createElement("div", { className: withdrawAmountClass },
                    React.createElement("label", { className: "cr-withdraw__label" }, (Number(amount) !== 0 && amount) && (withdrawAmountLabel || 'Withdrawal Amount')),
                    React.createElement(Input, { type: "number", value: amount, placeholder: withdrawAmountLabel || 'Amount', className: "cr-withdraw__input", onFocus: () => this.handleFieldFocus('amount'), onBlur: () => this.handleFieldFocus('amount'), onChangeValue: this.handleChangeInputAmount })),
                React.createElement("div", { className: lastDividerClassName }),
                twoFactorAuthRequired && this.renderOtpCodeInput()),
            React.createElement("div", { className: "cr-withdraw-column" },
                React.createElement("div", null,
                    React.createElement(SummaryField, { className: "cr-withdraw__summary-field", message: withdrawFeeLabel ? withdrawFeeLabel : 'Fee', content: this.renderFee(), borderItem: borderItem }),
                    React.createElement(SummaryField, { className: "cr-withdraw__summary-field", message: withdrawTotalLabel ? withdrawTotalLabel : 'Total Withdraw Amount', content: this.renderTotal(), borderItem: borderItem })),
                React.createElement("div", { className: "cr-withdraw__deep" },
                    React.createElement(Button, { className: "cr-withdraw__button", label: withdrawButtonLabel ? withdrawButtonLabel : 'WITHDRAW', onClick: this.handleClick, disabled: Number(total) <= 0 || !Boolean(address) || !Boolean(otpCode) })))));
    }
}
export { Withdraw, };