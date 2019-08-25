import { Button, } from '@openware/components';
import cr from 'classnames';
import { CustomInput, } from '../';
import * as React from 'react';
import { EMAIL_REGEX, } from '../../helpers';
class EmailForm extends React.Component {
    constructor() {
        super(...arguments);
        this.handleCancel = () => {
            this.props.handleReturnBack();
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
        const { title, buttonLabel, isLoading, emailLabel, message, email, emailFocused, emailError, } = this.props;
        const emailGroupClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': emailFocused,
        });
        return (React.createElement("form", null,
            React.createElement("div", { className: "cr-email-form" },
                React.createElement("div", { className: "cr-email-form__options-group" },
                    React.createElement("div", { className: "cr-email-form__option" },
                        React.createElement("div", { className: "cr-email-form__option-inner" },
                            title ? title : 'Forgot password',
                            React.createElement("div", { className: "cr-email-form__cros-icon", onClick: this.handleCancel },
                                React.createElement("img", { src: require('../../assets/images/close.svg') }))))),
                React.createElement("div", { className: "cr-email-form__form-content" },
                    React.createElement("div", { className: "cr-email-form__header" }, message),
                    React.createElement("div", { className: emailGroupClass },
                        React.createElement(CustomInput, { type: "email", label: emailLabel || 'Email', placeholder: emailLabel || 'Email', defaultLabel: "Email", handleChangeInput: this.props.handleInputEmail, inputValue: email, handleFocusInput: this.props.handleFieldFocus, classNameLabel: "cr-email-form__label", classNameInput: "cr-email-form__input", autoFocus: true }),
                        emailError && React.createElement("div", { className: "cr-email-form__error" }, emailError)),
                    React.createElement("div", { className: "cr-email-form__button-wrapper" },
                        React.createElement(Button, { label: isLoading ? 'Loading...' : buttonLabel ? buttonLabel : 'Send', type: "submit", className: email ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled', disabled: isLoading || !email.match(EMAIL_REGEX), onClick: this.handleClick }))))));
    }
    handleSubmitForm() {
        this.props.OnSubmit();
    }
    isValidForm() {
        const { email } = this.props;
        const isEmailValid = email.match(EMAIL_REGEX);
        return email && isEmailValid;
    }
}
export { EmailForm, };