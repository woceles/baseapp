import { Button, Checkbox, } from '@openware/components';
import cr from 'classnames';
import { CustomInput, } from '../';
import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { EMAIL_REGEX, PASSWORD_REGEX, } from '../../helpers';
class SignUpForm extends React.Component {
    constructor() {
        super(...arguments);
        this.disableButton = () => {
            const { email, password, confirmPassword, hasConfirmed, recaptchaConfirmed, isLoading, captchaType, } = this.props;
            if (!hasConfirmed || isLoading || !email.match(EMAIL_REGEX) || !password || !confirmPassword) {
                return true;
            }
            if (captchaType !== 'none' && !recaptchaConfirmed) {
                return true;
            }
            return false;
        };
        this.handleClick = (label, e) => {
            if (e) {
                e.preventDefault();
            }
            if (!this.isValidForm()) {
                this.props.validateForm();
            }
            else {
                this.handleSubmitForm();
            }
        };
    }
    render() {
        const { email, password, confirmPassword, refId, onSignIn, image, isLoading, siteKey, captchaType, labelSignIn, labelSignUp, emailLabel, passwordLabel, confirmPasswordLabel, referalCodeLabel, termsMessage, hasConfirmed, emailError, passwordError, confirmationError, emailFocused, passwordFocused, confirmPasswordFocused, refIdFocused, } = this.props;
        const emailGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': emailFocused,
        });
        const passwordGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': passwordFocused,
        });
        const confirmPasswordGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': confirmPasswordFocused,
        });
        const refIdGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': refIdFocused,
        });
        const logo = image ? (React.createElement("h1", { className: "cr-sign-up-form__title" },
            React.createElement("img", { className: "cr-sign-up-form__image", src: image, alt: "logo" }))) : null;
        const captcha = hasConfirmed && captchaType !== 'none' ?
            (React.createElement("div", { className: "cr-sign-up-form__recaptcha" },
                React.createElement(ReCAPTCHA, { sitekey: siteKey, onChange: this.props.recaptchaOnChange }))) : null;
        return (React.createElement("form", null,
            React.createElement("div", { className: "cr-sign-up-form" },
                React.createElement("div", { className: "cr-sign-up-form__options-group" },
                    React.createElement("div", { className: "cr-sign-up-form__option" },
                        React.createElement("div", { className: "cr-sign-up-form__option-inner cr-sign-in-form__tab-signin", onClick: onSignIn }, labelSignIn ? labelSignIn : 'Sign In')),
                    React.createElement("div", { className: "cr-sign-up-form__option" },
                        React.createElement("div", { className: "cr-sign-up-form__option-inner __selected" }, labelSignUp ? labelSignUp : 'Sign Up'))),
                React.createElement("div", { className: "cr-sign-up-form__form-content" },
                    logo,
                    React.createElement("div", { className: emailGroupClass },
                        React.createElement(CustomInput, { type: "email", label: emailLabel || 'Email', placeholder: emailLabel || 'Email', defaultLabel: "Email", handleChangeInput: this.props.handleChangeEmail, inputValue: email, handleFocusInput: this.props.handleFocusEmail, classNameLabel: "cr-sign-up-form__label", classNameInput: "cr-sign-up-form__input", autoFocus: true }),
                        emailError && React.createElement("div", { className: "cr-sign-up-form__error" }, emailError)),
                    React.createElement("div", { className: passwordGroupClass },
                        React.createElement(CustomInput, { type: "password", label: passwordLabel || 'Password', placeholder: passwordLabel || 'Password', defaultLabel: "Password", handleChangeInput: this.props.handleChangePassword, inputValue: password, handleFocusInput: this.props.handleFocusPassword, classNameLabel: "cr-sign-up-form__label", classNameInput: "cr-sign-up-form__input", autoFocus: false }),
                        passwordError && React.createElement("div", { className: 'cr-sign-up-form__error' }, passwordError)),
                    React.createElement("div", { className: confirmPasswordGroupClass },
                        React.createElement(CustomInput, { type: "password", label: confirmPasswordLabel || 'Confirm Password', placeholder: confirmPasswordLabel || 'Confirm Password', defaultLabel: "Confirm Password", handleChangeInput: this.props.handleChangeConfirmPassword, inputValue: confirmPassword, handleFocusInput: this.props.handleFocusConfirmPassword, classNameLabel: "cr-sign-up-form__label", classNameInput: "cr-sign-up-form__input", autoFocus: false }),
                        confirmationError && React.createElement("div", { className: 'cr-sign-up-form__error' }, confirmationError)),
                    React.createElement("div", { className: refIdGroupClass },
                        React.createElement(CustomInput, { type: "text", label: referalCodeLabel || 'Referral code', placeholder: referalCodeLabel || 'Referral code', defaultLabel: "Referral code", handleChangeInput: this.props.handleChangeRefId, inputValue: refId, handleFocusInput: this.props.handleFocusRefId, classNameLabel: "cr-sign-up-form__label", classNameInput: "cr-sign-up-form__input", autoFocus: false })),
                    React.createElement(Checkbox, { checked: hasConfirmed, className: "cr-sign-up-form__checkbox", onChange: this.props.clickCheckBox, label: termsMessage ? termsMessage : 'I  agree all statements in terms of service' }),
                    captcha,
                    React.createElement("div", { className: "cr-sign-up-form__button-wrapper" },
                        React.createElement(Button, { type: "submit", className: "cr-sign-up-form__button", label: isLoading ? 'Loading...' : (labelSignUp ? labelSignUp : 'Sign up'), disabled: this.disableButton(), onClick: this.handleClick }))))));
    }
    handleSubmitForm() {
        this.props.onSignUp();
    }
    isValidForm() {
        const { email, password, confirmPassword } = this.props;
        const isEmailValid = email.match(EMAIL_REGEX);
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;
        return (email && isEmailValid) &&
            (password && isPasswordValid) &&
            (confirmPassword && isConfirmPasswordValid);
    }
}
export { SignUpForm, };