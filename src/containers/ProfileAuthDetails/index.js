import { Button } from '@openware/components';
import cr from 'classnames';
import * as React from 'react';
import { FormattedMessage, injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CustomInput, Modal, } from '../../components';
import { PASSWORD_REGEX, } from '../../helpers';
import { selectUserInfo, } from '../../modules';
import { changePasswordFetch, selectChangePasswordSuccess, } from '../../modules/user/profile';
import { ProfileTwoFactorAuth } from '../ProfileTwoFactorAuth';
class ProfileAuthDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.renderModalHeader = () => {
            return (React.createElement("div", { className: "pg-exchange-modal-submit-header" },
                React.createElement(FormattedMessage, { id: "page.body.profile.header.account.content.twoFactorAuthentication.modalHeader" })));
        };
        this.renderModalBody = () => {
            return (React.createElement("div", { className: "pg-exchange-modal-submit-body" },
                React.createElement("h2", null,
                    React.createElement(FormattedMessage, { id: "page.body.profile.header.account.content.twoFactorAuthentication.modalBody" }))));
        };
        this.renderModalFooter = () => {
            return (React.createElement("div", { className: "pg-exchange-modal-submit-footer" },
                React.createElement(Button, { className: "pg-exchange-modal-submit-footer__button-inverse", label: "OK", onClick: this.closeModal })));
        };
        this.renderChangeModalHeader = () => (React.createElement("div", { className: "cr-email-form__options-group" },
            React.createElement("div", { className: "cr-email-form__option" },
                React.createElement("div", { className: "cr-email-form__option-inner" },
                    React.createElement(FormattedMessage, { id: "page.body.profile.header.account.content.password.change" }),
                    React.createElement("div", { className: "cr-email-form__cros-icon", onClick: this.handleCancel },
                        React.createElement("img", { src: require('../../assets/images/close.svg') }))))));
        this.handleChangePassword = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.changePassword({
                old_password: this.state.oldPassword,
                new_password: this.state.newPassword,
                confirm_password: this.state.confirmationPassword,
            });
        };
        this.closeModal = () => {
            this.setState({
                showModal: false,
            });
        };
        this.showChangeModal = () => {
            this.setState({
                showChangeModal: true,
            });
        };
        this.handleNavigateTo2fa = (enable2fa) => {
            if (enable2fa) {
                this.props.history.push('/security/2fa', { enable2fa });
            }
            else {
                this.setState({
                    showModal: !this.state.showModal,
                });
            }
        };
        this.handleOldPassword = (value) => {
            this.setState({
                oldPassword: value,
            });
        };
        this.handleConfPassword = (value) => {
            this.setState({
                confirmationPassword: value,
            });
        };
        this.handleNewPassword = (value) => {
            this.setState({
                newPassword: value,
            });
        };
        this.handleCancel = () => {
            this.setState({
                showChangeModal: false,
                oldPassword: '',
                newPassword: '',
                confirmationPassword: '',
            });
        };
        this.handleFieldFocus = (field) => {
            return () => {
                switch (field) {
                    case 'oldPassword':
                        this.setState({
                            oldPasswordFocus: !this.state.oldPasswordFocus,
                        });
                        break;
                    case 'newPassword':
                        this.setState({
                            newPasswordFocus: !this.state.newPasswordFocus,
                        });
                        break;
                    case 'confirmationPassword':
                        this.setState({
                            confirmPasswordFocus: !this.state.confirmPasswordFocus,
                        });
                        break;
                    default:
                        break;
                }
            };
        };
        this.state = {
            showChangeModal: false,
            showModal: false,
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
            oldPasswordFocus: false,
            newPasswordFocus: false,
            confirmPasswordFocus: false,
        };
    }
    componentWillReceiveProps(next) {
        if (next.passwordChangeSuccess) {
            this.setState({
                showChangeModal: false,
                oldPassword: '',
                newPassword: '',
                confirmationPassword: '',
                confirmPasswordFocus: false,
            });
        }
    }
    render() {
        const { user, } = this.props;
        const { oldPasswordFocus, newPasswordFocus, confirmationPassword, oldPassword, newPassword, confirmPasswordFocus, } = this.state;
        const oldPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': oldPasswordFocus,
        });
        const newPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': newPasswordFocus,
        });
        const confirmPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': confirmPasswordFocus,
        });
        const changeModalBody = (React.createElement("div", { className: "cr-email-form__form-content" },
            React.createElement("div", { className: oldPasswordClass },
                React.createElement(CustomInput, { type: "password", label: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.old' }), placeholder: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.old' }), defaultLabel: "Old password", handleChangeInput: this.handleOldPassword, inputValue: oldPassword, handleFocusInput: this.handleFieldFocus('oldPassword'), classNameLabel: "cr-email-form__label", classNameInput: "cr-email-form__input", autoFocus: true })),
            React.createElement("div", { className: newPasswordClass },
                React.createElement(CustomInput, { type: "password", label: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' }), placeholder: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' }), defaultLabel: "New password", handleChangeInput: this.handleNewPassword, inputValue: newPassword, handleFocusInput: this.handleFieldFocus('newPassword'), classNameLabel: "cr-email-form__label", classNameInput: "cr-email-form__input", autoFocus: false })),
            React.createElement("div", { className: confirmPasswordClass },
                React.createElement(CustomInput, { type: "password", label: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.conf' }), placeholder: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.conf' }), defaultLabel: "Password confirmation", handleChangeInput: this.handleConfPassword, inputValue: confirmationPassword, handleFocusInput: this.handleFieldFocus('confirmationPassword'), classNameLabel: "cr-email-form__label", classNameInput: "cr-email-form__input", autoFocus: false })),
            React.createElement("div", { className: "cr-email-form__button-wrapper" },
                React.createElement("input", { type: 'submit', value: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.change' }), className: this.isValidForm() ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled', disabled: !this.isValidForm() }))));
        const modal = this.state.showChangeModal ? (React.createElement("div", { className: "cr-modal" },
            React.createElement("form", { className: "cr-email-form", onSubmit: this.handleChangePassword },
                React.createElement("div", { className: "pg-change-password-screen" },
                    this.renderChangeModalHeader(),
                    changeModalBody)))) : null;
        return (React.createElement("div", { className: "pg-profile-page__box pg-profile-page__left-col__basic" },
            React.createElement("div", { className: "pg-profile-page__box-header pg-profile-page__left-col__basic__info-row" },
                React.createElement("div", { className: "pg-profile-page__left-col__basic__info-row__block" },
                    React.createElement("div", { className: "pg-profile-page__row pg-profile-page__details-user" },
                        React.createElement("p", null, user.email)),
                    React.createElement("div", { className: "pg-profile-page__row" },
                        React.createElement("h2", null,
                            "UID: ",
                            user.uid)))),
            React.createElement("div", { className: "pg-profile-page__row" },
                React.createElement("div", null,
                    React.createElement("div", { className: "pg-profile-page__label" }, this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password' })),
                    React.createElement("div", null, "************")),
                React.createElement(Button, { className: "pg-profile-page__btn-secondary-change", onClick: this.showChangeModal, label: this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.change' }) }),
                modal),
            React.createElement("div", { className: "pg-profile-page__row" },
                React.createElement(ProfileTwoFactorAuth, { is2faEnabled: user.otp, navigateTo2fa: this.handleNavigateTo2fa })),
            React.createElement(Modal, { show: this.state.showModal, header: this.renderModalHeader(), content: this.renderModalBody(), footer: this.renderModalFooter() })));
    }
    isValidForm() {
        const { confirmationPassword, oldPassword, newPassword, } = this.state;
        const isNewPasswordValid = newPassword.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = newPassword === confirmationPassword;
        return oldPassword && isNewPasswordValid && isConfirmPasswordValid;
    }
}
const mapStateToProps = (state) => ({
    user: selectUserInfo(state),
    passwordChangeSuccess: selectChangePasswordSuccess(state),
});
const mapDispatchToProps = dispatch => ({
    changePassword: ({ old_password, new_password, confirm_password }) => dispatch(changePasswordFetch({ old_password, new_password, confirm_password })),
});
const ProfileAuthDetailsConnected = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProfileAuthDetailsComponent));

const ProfileAuthDetails = withRouter(ProfileAuthDetailsConnected);
export { ProfileAuthDetails, };