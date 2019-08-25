import { Button, } from '@openware/components';
import cr from 'classnames';
import * as React from 'react';
import { CustomInput, } from '../';
import { EMAIL_REGEX, } from '../../helpers';
class SignInComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChangeEmail = (value) => {
            this.props.changeEmail(value);
        };
        this.handleChangePassword = (value) => {
            this.props.changePassword(value);
        };
        this.handleFieldFocus = (field) => {
            this.props.handleChangeFocusField(field);
        };
        this.handleSubmitForm = () => {
            this.props.refreshError();
            this.props.onSignIn();
        };
        this.isValidForm = () => {
            const { email, password } = this.props;
            const isEmailValid = email.match(EMAIL_REGEX);
            return email && isEmailValid && password;
        };
        this.handleValidateForm = () => {
            this.props.isFormValid();
        };
        this.handleClick = (label, e) => {
            if (e) {
                e.preventDefault();
            }
            if (!this.isValidForm()) {
                this.handleValidateForm();
            }
            else {
                this.handleSubmitForm();
            }
        };
    }
    render() {
        const { email, emailError, emailPlaceholder, password, passwordError, passwordPlaceholder, isLoading, onForgotPassword, onSignUp, image, labelSignIn, labelSignUp, emailLabel, passwordLabel, forgotPasswordLabel, emailFocused, passwordFocused, } = this.props;
        const emailGroupClass = cr('cr-sign-in-form__group', {
            'cr-sign-in-form__group--focused': emailFocused,
        });
        const passwordGroupClass = cr('cr-sign-in-form__group', {
            'cr-sign-in-form__group--focused': passwordFocused,
        });
        const logo = image ? (React.createElement("h1", { className: "cr-sign-in-form__title" },
            React.createElement("img", { className: "cr-sign-in-form__image", src: image, alt: "logo" }))) : null;
        
        return (React.createElement("form", null,
            React.createElement("div", { className: "cr-sign-in-form" },
                React.createElement("div", { className: "cr-sign-in-form__options-group" },
                    React.createElement("div", { className: "cr-sign-in-form__option" },
                        React.createElement("div", { className: "cr-sign-in-form__option-inner __selected" }, labelSignIn ? labelSignIn : 'Sign In')),
                    React.createElement("div", { className: "cr-sign-in-form__option" },
                        React.createElement("div", { className: "cr-sign-in-form__option-inner cr-sign-in-form__tab-signup", onClick: onSignUp }, labelSignUp ? labelSignUp : 'Sign Up'))),
                React.createElement("div", { className: "cr-sign-in-form__form-content" },
                    logo,
                    React.createElement("div", { className: emailGroupClass },
                        React.createElement(CustomInput, { type: "email", label: emailLabel || 'Email', placeholder: emailPlaceholder, defaultLabel: "Email", handleChangeInput: this.handleChangeEmail, inputValue: email, handleFocusInput: () => this.handleFieldFocus('email'), classNameLabel: "cr-sign-in-form__label", classNameInput: "cr-sign-in-form__input", autoFocus: true }),
                        emailError && React.createElement("div", { className: 'cr-sign-in-form__error' }, emailError)),
                    React.createElement("div", { className: passwordGroupClass },
                        React.createElement(CustomInput, { type: "password", label: passwordLabel || 'Password', placeholder: passwordPlaceholder, defaultLabel: "Password", handleChangeInput: this.handleChangePassword, inputValue: password, handleFocusInput: () => this.handleFieldFocus('password'), classNameLabel: "cr-sign-in-form__label", classNameInput: "cr-sign-in-form__input", autoFocus: false }),
                        passwordError && React.createElement("div", { className: 'cr-sign-in-form__error' }, passwordError)),
                    React.createElement("div", { className: "cr-sign-in-form__button-wrapper" },
                        React.createElement(Button, { label: isLoading ? 'Loading...' : (labelSignIn ? labelSignIn : 'Sign in'), type: "submit", className: 'cr-sign-in-form__button', disabled: isLoading || !email.match(EMAIL_REGEX) || !password, onClick: this.handleClick })),
                    React.createElement("div", { className: "cr-sign-in-form__bottom-section" },
                        React.createElement("div", { className: "cr-sign-in-form__bottom-section-password", onClick: () => onForgotPassword(email) }, forgotPasswordLabel ? forgotPasswordLabel : 'Forgot your password?'))))));
        
    }
}
export { SignInComponent, };