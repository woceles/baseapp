import { Button, Input } from '@openware/components';
import * as React from 'react';
import { FormattedMessage, injectIntl, } from 'react-intl';
class ChangePasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        this.renderPasswordView = () => {
            return (React.createElement(React.Fragment, null,
                React.createElement(Button, { className: "pg-profile-page__btn-secondary", onClick: this.toggleShowForm, label: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.change' }) })));
        };
        this.renderForm = () => {
            const { oldPassword, newPassword } = this.state;
            return (React.createElement("div", null,
                React.createElement("div", { className: "pg-change-password-form" },
                    React.createElement("div", { className: "pg-change-password-form__group" },
                        React.createElement("label", { className: "pg-change-password-form__label" },
                            React.createElement(FormattedMessage, { id: "page.body.profile.header.account.content.password.old" })),
                        React.createElement(Input, { type: "password", value: oldPassword, onChangeValue: this.handleOldPasswordChange })),
                    React.createElement("div", { className: "pg-change-password-form__group" },
                        React.createElement("label", { className: "pg-change-password-form__label" },
                            React.createElement(FormattedMessage, { id: "page.body.profile.header.account.content.password.new" })),
                        React.createElement(Input, { type: "password", value: newPassword, onChangeValue: this.handleNewPasswordChange })),
                    React.createElement(Button, { className: "pg-profile-page__btn-secondary", label: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.save' }), onClick: this.handleSubmit }),
                    React.createElement(Button, { className: "pg-profile-page__btn-secondary", label: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.cancel' }), onClick: this.handleCancel }))));
        };
        this.toggleShowForm = () => {
            this.setState((state) => ({
                showForm: !state.showForm,
            }));
        };
        this.handleOldPasswordChange = (value) => {
            this.setState({
                oldPassword: value,
            });
        };
        this.handleNewPasswordChange = (value) => {
            this.setState({
                newPassword: value,
            });
        };
        this.handleSubmit = () => {
            this.props.onSubmit(this.state.oldPassword, this.state.newPassword, this.state.newPassword);
        };
        this.handleCancel = () => {
            this.setState({
                showForm: false,
                oldPassword: '',
                newPassword: '',
            });
            this.props.onClearError();
        };
        this.state = {
            showForm: false,
            oldPassword: '',
            newPassword: '',
        };
    }
    componentWillReceiveProps(next) {
        if (!this.props.success && next.success) {
            this.handleCancel();
        }
    }
    render() {
        const { showForm } = this.state;
        return (React.createElement(React.Fragment, null,
            React.createElement("label", { className: "pg-profile-page__label" },
                React.createElement("div", null,
                    React.createElement(FormattedMessage, { id: "page.body.profile.header.account.content.password" })),
                React.createElement("span", { className: "pg-profile-page__label-value" }, "***********")),
            showForm ? this.renderForm() : this.renderPasswordView()));
    }
}
export const ChangePassword = injectIntl(ChangePasswordComponent);