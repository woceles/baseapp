import { Button, } from '@openware/components';
import cr from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, } from 'react-redux';
import { resendCode, selectVerifyPhoneSuccess, sendCode, verifyPhone, } from '../../../modules/user/kyc/phone';
import { changeUserLevel } from '../../../modules/user/profile';
class PhoneComponent extends React.Component {
    constructor(props) {
        super(props);
        this.translate = (e) => {
            return this.props.intl.formatMessage({ id: e });
        };
        this.handleFieldFocus = (field) => {
            return () => {
                switch (field) {
                    case 'phoneNumber':
                        this.addPlusSignToPhoneNumber();
                        this.setState({
                            phoneNumberFocused: !this.state.phoneNumberFocused,
                        });
                        break;
                    case 'confirmationCode':
                        this.setState({
                            confirmationCodeFocused: !this.state.confirmationCodeFocused,
                        });
                        break;
                    default:
                        break;
                }
            };
        };
        this.handleConfirmEnterPress = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.confirmPhone();
            }
        };
        this.handleSendEnterPress = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSendCode();
            }
        };
        this.confirmPhone = () => {
            const requestProps = {
                phone_number: String(this.state.phoneNumber),
                verification_code: String(this.state.confirmationCode),
            };
            this.props.verifyPhone(requestProps);
        };
        this.addPlusSignToPhoneNumber = () => {
            if (this.state.phoneNumber.length === 0) {
                this.setState({
                    phoneNumber: '+',
                });
            }
        };
        this.handleChangePhoneNumber = (e) => {
            if (this.inputPhoneNumber(e)) {
                this.setState({
                    phoneNumber: e.target.value,
                    resendCode: false,
                });
            }
        };
        this.handleChangeConfirmationCode = (e) => {
            if (this.inputConfirmationCode(e)) {
                this.setState({
                    confirmationCode: e.target.value,
                });
            }
        };
        this.inputPhoneNumber = (e) => {
            const convertedText = e.target.value.trim();
            const condition = new RegExp('^\\+\\d*?$');
            return condition.test(convertedText);
        };
        this.inputConfirmationCode = (e) => {
            const convertedText = e.target.value.trim();
            const condition = new RegExp('^\\d*?$');
            return condition.test(convertedText);
        };
        this.handleSendCode = () => {
            const requestProps = {
                phone_number: String(this.state.phoneNumber),
            };
            if (!this.state.resendCode) {
                this.props.sendCode(requestProps);
                this.setState({
                    resendCode: true,
                });
            }
            else {
                this.props.resendCode(requestProps);
            }
        };
        this.state = {
            phoneNumber: '',
            phoneNumberFocused: false,
            confirmationCode: '',
            confirmationCodeFocused: false,
            resendCode: false,
        };
    }
    componentDidUpdate(prev) {
        if (!prev.verifyPhoneSuccess && this.props.verifyPhoneSuccess) {
            this.props.changeUserLevel({ level: 2 });
        }
    }
    render() {
        const { phoneNumber, phoneNumberFocused, confirmationCode, confirmationCodeFocused, } = this.state;
        const { verifyPhoneSuccess, } = this.props;
        const phoneNumberFocusedClass = cr('pg-confirm__content-phone-col-content', {
            'pg-confirm__content-phone-col-content--focused': phoneNumberFocused,
        });
        const confirmationCodeFocusedClass = cr('pg-confirm__content-phone-col-content', {
            'pg-confirm__content-phone-col-content--focused': confirmationCodeFocused,
        });
        return (React.createElement("div", { className: "pg-confirm__content-phone" },
            React.createElement("h2", { className: "pg-confirm__content-phone-head" }, this.translate('page.body.kyc.phone.head')),
            React.createElement("div", { className: "pg-confirm__content-phone-col" },
                React.createElement("div", { className: "pg-confirm__content-phone-col-text" },
                    "1. ",
                    this.translate('page.body.kyc.phone.enterPhone')),
                React.createElement("fieldset", { className: phoneNumberFocusedClass },
                    phoneNumber && React.createElement("legend", null, this.translate('page.body.kyc.phone.phoneNumber')),
                    React.createElement("input", { className: "pg-confirm__content-phone-col-content-number", type: "string", placeholder: this.translate('page.body.kyc.phone.phoneNumber'), value: phoneNumber, onClick: this.addPlusSignToPhoneNumber, onChange: this.handleChangePhoneNumber, onFocus: this.handleFieldFocus('phoneNumber'), onBlur: this.handleFieldFocus('phoneNumber'), onKeyPress: this.handleSendEnterPress, autoFocus: true }),
                    React.createElement("button", { className: phoneNumber ? 'pg-confirm__content-phone-col-content-send' : 'pg-confirm__content-phone-col-content-send--disabled', type: "button", onClick: this.handleSendCode }, this.state.resendCode ? this.translate('page.body.kyc.phone.resend') : this.translate('page.body.kyc.phone.send')))),
            React.createElement("div", { className: "pg-confirm__content-phone-col" },
                React.createElement("div", { className: "pg-confirm__content-phone-col-text" },
                    "2. ",
                    this.translate('page.body.kyc.phone.enterCode')),
                React.createElement("fieldset", { className: confirmationCodeFocusedClass },
                    confirmationCode && React.createElement("legend", null, this.translate('page.body.kyc.phone.code')),
                    React.createElement("input", { className: "pg-confirm__content-phone-col-content-number", type: "string", placeholder: this.translate('page.body.kyc.phone.code'), value: confirmationCode, onChange: this.handleChangeConfirmationCode, onFocus: this.handleFieldFocus('confirmationCode'), onBlur: this.handleFieldFocus('confirmationCode'), onKeyPress: this.handleConfirmEnterPress }))),
            verifyPhoneSuccess && React.createElement("p", { className: "pg-confirm__success" }, verifyPhoneSuccess),
            React.createElement("div", { className: "pg-confirm__content-deep" },
                React.createElement(Button, { className: "pg-confirm__content-phone-deep-button", label: this.translate('page.body.kyc.next'), onClick: this.confirmPhone }))));
    }
}
const mapStateToProps = (state) => ({
    verifyPhoneSuccess: selectVerifyPhoneSuccess(state),
});
const mapDispatchProps = dispatch => ({
    resendCode: phone => dispatch(resendCode(phone)),
    sendCode: phone => dispatch(sendCode(phone)),
    verifyPhone: payload => dispatch(verifyPhone(payload)),
    changeUserLevel: payload => dispatch(changeUserLevel(payload)),
});

export const Phone = injectIntl(connect(mapStateToProps, mapDispatchProps)(PhoneComponent));