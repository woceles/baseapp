import { Button } from '@openware/components';
import cr from 'classnames';
import { CustomInput, } from '../';
import * as React from 'react';
class TwoFactorAuthComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.handleCancel = () => {
            this.props.handleClose2fa();
        };
        this.handleSubmit = () => {
            this.props.onSubmit();
        };
        this.handleEnterPress = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSubmit();
            }
        };
    }
    render() {
        const { errorMessage, isLoading, title, label, buttonLabel, message, error, otpCode, codeFocused, } = this.props;
        const errors = errorMessage || error;
        const buttonWrapperClass = cr('cr-email-form__button-wrapper', {
            'cr-email-form__button-wrapper--empty': !errors,
        });
        const emailGroupClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': codeFocused,
        });
        return (React.createElement("div", { className: "pg-2fa___form" },
            React.createElement("form", null,
                React.createElement("div", { className: "cr-email-form" },
                    React.createElement("div", { className: "cr-email-form__options-group" },
                        React.createElement("div", { className: "cr-email-form__option" },
                            React.createElement("div", { className: "cr-email-form__option-inner" },
                                title || '2FA verification',
                                React.createElement("div", { className: "cr-email-form__cros-icon", onClick: this.handleCancel },
                                    React.createElement("img", { src: require('../../assets/images/close.svg') }))))),
                    React.createElement("div", { className: "cr-email-form__form-content" },
                        React.createElement("div", { className: "cr-email-form__header" }, message),
                        React.createElement("div", { className: emailGroupClass },
                            React.createElement(CustomInput, { type: "number", label: label || '6-digit Google Authenticator Code', placeholder: label || '6-digit Google Authenticator Code', defaultLabel: "6-digit Google Authenticator Code", handleChangeInput: this.props.handleOtpCodeChange, inputValue: otpCode, handleFocusInput: this.props.handleChangeFocusField, classNameLabel: "cr-email-form__label", classNameInput: "cr-email-form__input", onKeyPress: this.handleEnterPress, autoFocus: true }),
                            errorMessage && React.createElement("div", { className: "cr-email-form__error" }, errorMessage)),
                        React.createElement("div", { className: buttonWrapperClass },
                            React.createElement(Button, { label: isLoading ? 'Loading...' : (buttonLabel ? buttonLabel : 'Sign in'), className: otpCode ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled', disabled: isLoading || !otpCode.match(/.{6}/g), onClick: this.handleSubmit })))))));
    }
}
export const TwoFactorAuth = TwoFactorAuthComponent;