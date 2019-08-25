import { Button } from '@openware/components';
import cx from 'classnames';
import * as React from 'react';
import { injectIntl, } from 'react-intl';
import { connect, } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { captchaType, siteKey } from '../../api';
import { Modal, SignUpForm } from '../../components';
import { EMAIL_REGEX, ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD, ERROR_PASSWORD_CONFIRMATION, PASSWORD_REGEX, setDocumentTitle, } from '../../helpers';
import { selectCurrentLanguage, selectSignUpRequireVerification, signUp, } from '../../modules';
export const extractRefID = (props) => new URLSearchParams(props.location.search).get('refid');
class SignUp extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showModal: false,
            email: '',
            password: '',
            confirmPassword: '',
            recaptcha_response: '',
            recaptchaConfirmed: false,
            refId: '',
            hasConfirmed: false,
            emailError: '',
            passwordError: '',
            confirmationError: '',
            emailFocused: false,
            passwordFocused: false,
            confirmPasswordFocused: false,
            refIdFocused: false,
        };
        this.handleCheckboxClick = () => {
            this.setState({
                hasConfirmed: !this.state.hasConfirmed,
            });
        };
        this.onChange = (value) => {
            this.setState({
                recaptchaConfirmed: true,
                recaptcha_response: value,
            });
        };
        this.handleChangeEmail = (value) => {
            this.setState({
                email: value,
            });
        };
        this.handleChangePassword = (value) => {
            this.setState({
                password: value,
            });
        };
        this.handleChangeConfirmPassword = (value) => {
            this.setState({
                confirmPassword: value,
            });
        };
        this.handleChangeRefId = (value) => {
            this.setState({
                refId: value,
            });
        };
        this.handleFocusEmail = () => {
            this.setState({
                emailFocused: !this.state.emailFocused,
            });
        };
        this.handleFocusPassword = () => {
            this.setState({
                passwordFocused: !this.state.passwordFocused,
            });
        };
        this.handleFocusConfirmPassword = () => {
            this.setState({
                confirmPasswordFocused: !this.state.confirmPasswordFocused,
            });
        };
        this.handleFocusRefId = () => {
            this.setState({
                refIdFocused: !this.state.refIdFocused,
            });
        };
        this.handleSignIn = () => {
            this.props.history.push('/signin');
        };
        this.handleSignUp = () => {
            const { email, password, recaptcha_response, refId, } = this.state;
            const { i18n } = this.props;
            if (refId) {
                switch (captchaType()) {
                    case 'none':
                        this.props.signUp({
                            email,
                            password,
                            refid: refId,
                            lang: i18n.toUpperCase(),
                        });
                        break;
                    case 'recaptcha':
                    case 'geetest':
                    default:
                        this.props.signUp({
                            email,
                            password,
                            recaptcha_response,
                            refid: refId,
                            lang: i18n.toUpperCase(),
                        });
                        break;
                }
            }
            else {
                switch (captchaType()) {
                    case 'none':
                        this.props.signUp({
                            email,
                            password,
                            lang: i18n.toUpperCase(),
                        });
                        break;
                    case 'recaptcha':
                    case 'geetest':
                    default:
                        this.props.signUp({
                            email,
                            password,
                            recaptcha_response,
                            lang: i18n.toUpperCase(),
                        });
                        break;
                }
            }
        };
        this.renderModalHeader = () => {
            return (React.createElement("div", { className: "pg-exchange-modal-submit-header" }, this.props.intl.formatMessage({ id: 'page.header.signUp.modal.header' })));
        };
        this.renderModalBody = () => {
            return (React.createElement("div", { className: "pg-exchange-modal-submit-body" },
                React.createElement("h2", null, this.props.intl.formatMessage({ id: 'page.header.signUp.modal.body' }))));
        };
        this.renderModalFooter = () => {
            return (React.createElement("div", { className: "pg-exchange-modal-submit-footer" },
                React.createElement(Button, { className: "pg-exchange-modal-submit-footer__button-inverse", label: "OK", onClick: this.closeModal })));
        };
        this.closeModal = () => {
            this.setState({ showModal: false });
            this.props.history.push('/signin');
        };
        this.extractRefID = (url) => new URLSearchParams(url).get('refid');
        this.handleValidateForm = () => {
            const { email, password, confirmPassword } = this.state;
            const isEmailValid = email.match(EMAIL_REGEX);
            const isPasswordValid = password.match(PASSWORD_REGEX);
            const isConfirmPasswordValid = password === confirmPassword;
            if (!isEmailValid && !isPasswordValid) {
                this.setState({
                    confirmationError: '',
                    emailError: this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL }),
                    passwordError: this.props.intl.formatMessage({ id: ERROR_INVALID_PASSWORD }),
                    hasConfirmed: false,
                });
                return;
            }
            if (!isEmailValid) {
                this.setState({
                    confirmationError: '',
                    emailError: this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL }),
                    passwordError: '',
                    hasConfirmed: false,
                });
                return;
            }
            if (!isPasswordValid) {
                this.setState({
                    confirmationError: '',
                    emailError: '',
                    passwordError: this.props.intl.formatMessage({ id: ERROR_INVALID_PASSWORD }),
                    hasConfirmed: false,
                });
                return;
            }
            if (!isConfirmPasswordValid) {
                this.setState({
                    confirmationError: this.props.intl.formatMessage({ id: ERROR_PASSWORD_CONFIRMATION }),
                    emailError: '',
                    passwordError: '',
                    hasConfirmed: false,
                });
                return;
            }
        };
    }
    componentDidMount() {
        setDocumentTitle('Sign Up');
        const referralCode = this.extractRefID(this.props.location.search) || '';
        this.setState({
            refId: referralCode,
        });
    }
    componentWillReceiveProps(props) {
        if (props.requireVerification) {
            props.history.push('/email-verification', { email: this.state.email });
        }
    }
    render() {
        const { email, password, confirmPassword, refId, recaptcha_response, recaptchaConfirmed, hasConfirmed, emailError, passwordError, confirmationError, emailFocused, passwordFocused, confirmPasswordFocused, refIdFocused, } = this.state;
        const { loading } = this.props;
        const className = cx('pg-sign-up-screen__container', { loading });
        return (React.createElement("div", { className: "pg-sign-up-screen" },
            React.createElement("div", { className: className },
                React.createElement(SignUpForm, { labelSignIn: this.props.intl.formatMessage({ id: 'page.header.signIn' }), labelSignUp: this.props.intl.formatMessage({ id: 'page.header.signUp' }), emailLabel: this.props.intl.formatMessage({ id: 'page.header.signUp.email' }), passwordLabel: this.props.intl.formatMessage({ id: 'page.header.signUp.password' }), confirmPasswordLabel: this.props.intl.formatMessage({ id: 'page.header.signUp.confirmPassword' }), referalCodeLabel: this.props.intl.formatMessage({ id: 'page.header.signUp.referalCode' }), termsMessage: this.props.intl.formatMessage({ id: 'page.header.signUp.terms' }), refId: refId, handleChangeRefId: this.handleChangeRefId, isLoading: loading, onSignIn: this.handleSignIn, onSignUp: this.handleSignUp, siteKey: siteKey(), captchaType: captchaType(), email: email, handleChangeEmail: this.handleChangeEmail, password: password, handleChangePassword: this.handleChangePassword, confirmPassword: confirmPassword, handleChangeConfirmPassword: this.handleChangeConfirmPassword, recaptchaConfirmed: recaptchaConfirmed, recaptcha_response: recaptcha_response, recaptchaOnChange: this.onChange, hasConfirmed: hasConfirmed, clickCheckBox: this.handleCheckboxClick, validateForm: this.handleValidateForm, emailError: emailError, passwordError: passwordError, confirmationError: confirmationError, confirmPasswordFocused: confirmPasswordFocused, refIdFocused: refIdFocused, emailFocused: emailFocused, passwordFocused: passwordFocused, handleFocusEmail: this.handleFocusEmail, handleFocusPassword: this.handleFocusPassword, handleFocusConfirmPassword: this.handleFocusConfirmPassword, handleFocusRefId: this.handleFocusRefId }),
                React.createElement(Modal, { show: this.state.showModal, header: this.renderModalHeader(), content: this.renderModalBody(), footer: this.renderModalFooter() }))));
    }
}
const mapStateToProps = state => ({
    requireVerification: selectSignUpRequireVerification(state),
    i18n: selectCurrentLanguage(state),
});
const mapDispatchProps = dispatch => ({
    signUp: credentials => dispatch(signUp(credentials)),
});

const SignUpScreen = injectIntl(withRouter(connect(mapStateToProps, mapDispatchProps)(SignUp)));
export { SignUpScreen, };