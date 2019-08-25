import { Button, Checkbox, Table } from '@openware/components';
import cr from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CopyableTextField, CustomInput } from '../../components';
import { localeFullDate } from '../../helpers/localeFullDate';
import { alertPush, apiKeyCreateFetch, apiKeyDeleteFetch, apiKeys2FAModal, apiKeysFetch, apiKeyUpdateFetch, selectUserInfo, } from '../../modules';
import { selectApiKeys, selectApiKeysDataLoaded, selectApiKeysModal, } from '../../modules/user/apiKeys/selectors';


class ProfileApiKeysComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            otpCode: '',
            codeFocused: false,
        };
        this.t = (key) => {
            return this.props.intl.formatMessage({ id: key });
        };
        this.copy = (id) => {
            const copyText = document.querySelector(`#${id}`);
            if (copyText) {
                copyText.select();
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
            }
        };
        this.getTableHeaders = () => {
            return [
                this.t('page.body.profile.apiKeys.table.header.kid'),
                this.t('page.body.profile.apiKeys.table.header.algorithm'),
                this.t('page.body.profile.apiKeys.table.header.state'),
                '',
                this.t('page.body.profile.apiKeys.table.header.created'),
                this.t('page.body.profile.apiKeys.table.header.updated'),
                '',
            ];
        };
        this.renderModalHeader = () => {
            const headerText = this.props.modal.action === 'createSuccess' ? this.t('page.body.profile.apiKeys.modal.created_header')
                : this.t('page.body.profile.apiKeys.modal.header');
            return (React.createElement("div", { className: "cr-email-form__options-group" },
                React.createElement("div", { className: "cr-email-form__option" },
                    React.createElement("div", { className: "cr-email-form__option-inner" },
                        headerText,
                        React.createElement("span", { className: "pg-profile-page__close pg-profile-page__pull-right", onClick: this.handleHide2FAModal })))));
        };
        this.renderModalBody = () => {
            const { otpCode, codeFocused } = this.state;
            const emailGroupClass = cr('cr-email-form__group', {
                'cr-email-form__group--focused': codeFocused,
            });
            let body;
            let button;
            switch (this.props.modal.action) {
                case 'getKeys':
                    button =
                        (React.createElement(Button, { label: this.t('page.body.profile.apiKeys.modal.btn.show'), onClick: this.handleGetKeys, disabled: !otpCode.match(/.{6}/g), className: otpCode ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled' }));
                    break;
                case 'createKey':
                    button =
                        (React.createElement(Button, { label: this.t('page.body.profile.apiKeys.modal.btn.create'), onClick: this.handleCreateKey, className: otpCode ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled' }));
                    break;
                case 'createSuccess':
                    button =
                        (React.createElement(Button, { label: this.t('page.body.profile.apiKeys.modal.btn.create'), onClick: this.handleCreateSuccess, className: 'cr-email-form__button' }));
                    body = (React.createElement("div", { className: "cr-success-create" },
                        React.createElement("div", { className: "pg-copyable-text__section" },
                            React.createElement("fieldset", { onClick: () => this.handleCopy('access-key-id', 'access') },
                                React.createElement("legend", null,
                                    React.createElement("span", null, this.t('page.body.profile.apiKeys.modal.access_key'))),
                                React.createElement(CopyableTextField, { className: "pg-copyable-text-field__input", fieldId: 'access-key-id', value: this.props.modal.apiKey.kid, copyButtonText: this.t('page.body.profile.content.copyLink') }))),
                        React.createElement("div", { className: "secret-section" },
                            React.createElement("span", { className: "secret-sign" }, "\u26A0"),
                            React.createElement("p", { className: "secret-warning" },
                                React.createElement("span", null, this.t('page.body.profile.apiKeys.modal.secret_key')),
                                React.createElement("br", null),
                                this.t('page.body.profile.apiKeys.modal.secret_key_info'),
                                React.createElement("span", null,
                                    " ",
                                    this.t('page.body.profile.apiKeys.modal.secret_key_store')))),
                        React.createElement("div", { className: "pg-copyable-text__section" },
                            React.createElement("fieldset", { onClick: () => this.handleCopy('secret-key-id', 'secret') },
                                React.createElement("legend", null,
                                    React.createElement("span", null, this.t('page.body.profile.apiKeys.modal.secret_key'))),
                                React.createElement(CopyableTextField, { className: "pg-copyable-text-field__input", fieldId: 'secret_key-id', value: this.props.modal.apiKey.secret, copyButtonText: this.t('page.body.profile.content.copyLink') }))),
                        React.createElement("p", { className: "note-section" },
                            React.createElement("span", null,
                                this.t('page.body.profile.apiKeys.modal.note'),
                                " "),
                            React.createElement("br", null),
                            this.t('page.body.profile.apiKeys.modal.note_content')),
                        React.createElement("div", { className: "button-confirmation" }, button)));
                    break;
                case 'updateKey':
                    button =
                        this.props.modal.apiKey.state === 'active' ?
                            (React.createElement(Button, { label: this.t('page.body.profile.apiKeys.modal.btn.disabled'), onClick: this.handleUpdateKey, className: otpCode ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled' }))
                            :
                                (React.createElement(Button, { label: this.t('page.body.profile.apiKeys.modal.btn.activate'), onClick: this.handleUpdateKey, className: otpCode ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled' }));
                    break;
                case 'deleteKey':
                    button =
                        (React.createElement(Button, { label: this.t('page.body.profile.apiKeys.modal.btn.delete'), onClick: this.handleDeleteKey, className: otpCode ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled' }));
                    break;
                default:
                    break;
            }
            body = !body ? (React.createElement("div", { className: "cr-email-form__form-content" },
                React.createElement("div", { className: "cr-email-form__header" }, this.t('page.body.profile.apiKeys.modal.title')),
                React.createElement("div", { className: emailGroupClass },
                    React.createElement(CustomInput, { type: "number", label: this.t('page.body.profile.apiKeys.modal.label'), placeholder: this.t('page.body.profile.apiKeys.modal.placeholder'), defaultLabel: "2FA code", handleChangeInput: this.handleOtpCodeChange, inputValue: otpCode || '', handleFocusInput: this.handleChangeFocusField, classNameLabel: "cr-email-form__label", classNameInput: "cr-email-form__input", autoFocus: true, onKeyPress: this.handleEnterPress })),
                React.createElement("div", { className: "cr-email-form__button-wrapper" }, button))) : body;
            return (React.createElement(React.Fragment, null, body));
        };
        this.handleChangeFocusField = () => {
            this.setState(prev => ({
                codeFocused: !prev.codeFocused,
            }));
        };
        this.handleHide2FAModal = () => {
            const payload = { active: false };
            this.props.toggleApiKeys2FAModal(payload);
        };
        this.handleOtpCodeChange = (value) => {
            this.setState({
                otpCode: value,
            });
        };
        this.renderOnClick = () => {
            switch (this.props.modal.action) {
                case 'getKeys':
                    this.handleGetKeys();
                    break;
                case 'createKey':
                    this.handleCreateKey();
                    break;
                case 'createSuccess':
                    this.handleCreateSuccess();
                    break;
                case 'updateKey':
                    this.handleUpdateKey();
                    break;
                case 'deleteKey':
                    this.handleDeleteKey();
                    break;
                default:
                    break;
            }
        };
        this.handleEnterPress = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.renderOnClick();
            }
        };
        this.handleGetKeysClick = () => {
            const payload = { active: true, action: 'getKeys' };
            this.props.toggleApiKeys2FAModal(payload);
        };
        this.handleGetKeys = () => {
            const payload = { totp_code: this.state.otpCode };
            this.props.getApiKeys(payload);
            this.setState({ otpCode: '' });
        };
        this.handleCreateKeyClick = () => {
            const payload = { active: true, action: 'createKey' };
            this.props.toggleApiKeys2FAModal(payload);
        };
        this.handleCreateKey = () => {
            const payload = { totp_code: this.state.otpCode };
            this.props.createApiKey(payload);
            this.setState({ otpCode: '' });
        };
        this.handleCreateSuccess = () => {
            const payload = { active: false };
            this.props.toggleApiKeys2FAModal(payload);
        };
        this.handleToggleStateKeyClick = apiKey => {
            const payload = { active: true, action: 'updateKey', apiKey };
            this.props.toggleApiKeys2FAModal(payload);
        };
        this.handleUpdateKey = () => {
            const apiKey = { ...this.props.modal.apiKey };
            apiKey.state = apiKey.state === 'active' ? 'disabled' : 'active';
            const payload = { totp_code: this.state.otpCode, apiKey: apiKey };
            this.props.updateApiKey(payload);
            this.setState({ otpCode: '' });
        };
        this.handleCopy = (id, type) => {
            this.copy(id);
            this.props.fetchSuccess({ message: [`success.api_keys.copied.${type}`], type: 'success' });
        };
        this.handleDeleteKeyClick = apiKey => {
            const payload = { active: true, action: 'deleteKey', apiKey };
            this.props.toggleApiKeys2FAModal(payload);
        };
        this.handleDeleteKey = () => {
            const payload = { kid: this.props.modal.apiKey.kid, totp_code: this.state.otpCode };
            this.props.deleteApiKey(payload);
            this.setState({ otpCode: '' });
        };
    }
    render() {
        const { user, dataLoaded, apiKeys } = this.props;
        const modal = this.props.modal.active ? (React.createElement("div", { className: "cr-modal" },
            React.createElement("div", { className: "cr-email-form" },
                this.renderModalHeader(),
                this.renderModalBody()))) : null;
        return (React.createElement("div", { className: "pg-profile-page__api-keys" },
            React.createElement("div", { className: "pg-profile-page-header" },
                React.createElement("div", { className: "pg-profile-page__api-keys__header" },
                    React.createElement("h3", null, this.t('page.body.profile.apiKeys.header')),
                    user.otp && dataLoaded && (React.createElement("span", { className: "pg-profile-page__pull-right", onClick: this.handleCreateKeyClick }, this.t('page.body.profile.apiKeys.header.create'))))),
            !user.otp && (React.createElement("p", { className: "pg-profile-page__label pg-profile-page__text-center" }, this.t('page.body.profile.apiKeys.noOtp'))),
            user.otp && !dataLoaded && (React.createElement("div", { className: "pg-profile-page__text-center" },
                React.createElement("div", { className: "cr-button", onClick: this.handleGetKeysClick },
                    React.createElement("span", null, "Show")))),
            user.otp && dataLoaded && !apiKeys.length && (React.createElement("div", { className: "pg-profile-page__label pg-profile-page__text-center" }, this.t('page.body.profile.apiKeys.noKeys'))),
            user.otp && dataLoaded && apiKeys.length > 0 && (React.createElement(Table, { header: this.getTableHeaders(), data: apiKeys && apiKeys.length ? this.getTableData(apiKeys) : [[]] })),
            modal));
    }
    getTableData(apiKeysData) {
        return apiKeysData.map(item => ([
            item.kid,
            item.algorithm,
            (React.createElement("div", { className: "pg-profile-page__api-keys__state" },
                React.createElement("span", { className: item.state === 'active' ? 'pg-profile-page__api-keys__state__active'
                        : 'pg-profile-page__api-keys__state__disabled' }, item.state))),
            (React.createElement("div", { className: "pg-profile-page__api-keys__state-checkbox" },
                React.createElement(Checkbox, { checked: item.state === 'active', className: 'pg-profile-page__switch', onChange: () => this.handleToggleStateKeyClick(item), label: '', slider: true }))),
            localeFullDate(item.created_at),
            localeFullDate(item.updated_at),
            (React.createElement("span", { className: "pg-profile-page__close", key: item.kid, onClick: () => this.handleDeleteKeyClick(item) })),
        ]));
    }
}
const mapStateToProps = (state) => ({
    apiKeys: selectApiKeys(state),
    dataLoaded: selectApiKeysDataLoaded(state),
    modal: selectApiKeysModal(state),
    user: selectUserInfo(state),
});
const mapDispatchToProps = dispatch => ({
    toggleApiKeys2FAModal: (payload) => dispatch(apiKeys2FAModal(payload)),
    getApiKeys: payload => dispatch(apiKeysFetch(payload)),
    createApiKey: payload => dispatch(apiKeyCreateFetch(payload)),
    updateApiKey: payload => dispatch(apiKeyUpdateFetch(payload)),
    deleteApiKey: payload => dispatch(apiKeyDeleteFetch(payload)),
    fetchSuccess: payload => dispatch(alertPush(payload)),
});
const connected = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProfileApiKeysComponent));
const ProfileApiKeys = withRouter(connected);
export { ProfileApiKeys, };