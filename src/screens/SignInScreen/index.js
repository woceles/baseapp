import cx from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SignInComponent, TwoFactorAuth } from '../../components';
import { EMAIL_REGEX, ERROR_EMPTY_PASSWORD, ERROR_INVALID_EMAIL, setDocumentTitle } from '../../helpers';
import { selectAlertState, selectSignInRequire2FA, selectSignUpRequireVerification, selectUserFetching, selectUserLoggedIn, signIn, signInError, signInRequire2FA, signUpRequireVerification, } from '../../modules';
class SignIn extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            email: '',
            emailError: '',
            emailFocused: false,
            password: '',
            passwordError: '',
            passwordFocused: false,
            otpCode: '',
            error2fa: '',
            codeFocused: false,
        };
        this.renderSignInForm = () => {
            const { loading } = this.props;
            const { email, emailError, emailFocused, password, passwordError, passwordFocused } = this.state;
            return (React.createElement(SignInComponent, { email: email, emailError: emailError, emailFocused: emailFocused, emailPlaceholder: this.props.intl.formatMessage({ id: 'page.header.signIn.email' }), password: password, passwordError: passwordError, passwordFocused: passwordFocused, passwordPlaceholder: this.props.intl.formatMessage({ id: 'page.header.signIn.password' }), labelSignIn: this.props.intl.formatMessage({ id: 'page.header.signIn' }), labelSignUp: this.props.intl.formatMessage({ id: 'page.header.signUp' }), emailLabel: this.props.intl.formatMessage({ id: 'page.header.signIn.email' }), passwordLabel: this.props.intl.formatMessage({ id: 'page.header.signIn.password' }), receiveConfirmationLabel: this.props.intl.formatMessage({ id: 'page.header.signIn.receiveConfirmation' }), forgotPasswordLabel: this.props.intl.formatMessage({ id: 'page.header.signIn.forgotPassword' }), isLoading: loading, onForgotPassword: this.forgotPassword, onSignUp: this.handleSignUp, onSignIn: this.handleSignIn, handleChangeFocusField: this.handleFieldFocus, isFormValid: this.validateForm, refreshError: this.refreshError, changeEmail: this.handleChangeEmailValue, changePassword: this.handleChangePasswordValue }));
        };
        this.render2FA = () => {
            const { loading } = this.props;
            const { otpCode, error2fa, codeFocused } = this.state;
            return (React.createElement(TwoFactorAuth, { isLoading: loading, onSubmit: this.handle2FASignIn, title: this.props.intl.formatMessage({ id: 'page.password2fa' }), label: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.code2fa' }), buttonLabel: this.props.intl.formatMessage({ id: 'page.header.signIn' }), message: this.props.intl.formatMessage({ id: 'page.password2fa.message' }), codeFocused: codeFocused, otpCode: otpCode, error: error2fa, handleOtpCodeChange: this.handleChangeOtpCode, handleChangeFocusField: this.handle2faFocus, handleClose2fa: this.handleClose }));
        };
        this.refreshError = () => {
            this.setState({
                emailError: '',
                passwordError: '',
            });
        };
        this.handleChangeOtpCode = (value) => {
            this.setState({
                error2fa: '',
                otpCode: value,
            });
        };
        this.handleSignIn = () => {
            const { email, password } = this.state;
            this.props.signIn({
                email,
                password,
            });
        };
        this.handle2FASignIn = () => {
            const { email, password, otpCode } = this.state;
            if (!otpCode) {
                this.setState({
                    error2fa: 'Please enter 2fa code',
                });
            }
            else {
                this.props.signIn({
                    email,
                    password,
                    otp_code: otpCode,
                });
            }
        };
        this.handleSignUp = () => {
            this.props.history.push('/signup');
        };
        this.forgotPassword = () => {
            this.props.history.push('/forgot_password');
        };
        this.handleFieldFocus = (field) => {
            switch (field) {
                case 'email':
                    this.setState(prev => ({
                        emailFocused: !prev.emailFocused,
                    }));
                    break;
                case 'password':
                    this.setState(prev => ({
                        passwordFocused: !prev.passwordFocused,
                    }));
                    break;
                default:
                    break;
            }
        };
        this.handle2faFocus = () => {
            this.setState(prev => ({
                codeFocused: !prev.codeFocused,
            }));
        };
        this.validateForm = () => {
            const { email, password } = this.state;
            const isEmailValid = email.match(EMAIL_REGEX);
            if (!isEmailValid) {
                this.setState({
                    emailError: this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL }),
                    passwordError: '',
                });
                return;
            }
            if (!password) {
                this.setState({
                    emailError: '',
                    passwordError: this.props.intl.formatMessage({ id: ERROR_EMPTY_PASSWORD }),
                });
                return;
            }
        };
        this.handleChangeEmailValue = (value) => {
            this.setState({
                email: value,
            });
        };
        this.handleChangePasswordValue = (value) => {
            this.setState({
                password: value,
            });
        };
        this.handleClose = () => {
            this.props.signInRequire2FA({ require2fa: false });
        };
    }
    componentDidMount() {
        setDocumentTitle('Sign In');
        this.props.signInError({ code: undefined, message: undefined });
        this.props.signUpRequireVerification({ requireVerification: false });
    }
    componentWillReceiveProps(props) {
        if (props.isLoggedIn) {
            this.props.history.push('/wallets');
        }
        if (props.requireEmailVerification) {
            props.history.push('/email-verification', { email: this.state.email });
        }
    }
    render() {
        const { loading, require2FA } = this.props;
        const className = cx('pg-sign-in-screen__container', { loading });
        return (React.createElement("div", { className: "pg-sign-in-screen" },
            React.createElement("div", { className: className }, require2FA ? this.render2FA() : this.renderSignInForm())));
    }
}
const mapStateToProps = state => ({
    alert: selectAlertState(state),
    isLoggedIn: selectUserLoggedIn(state),
    loading: selectUserFetching(state),
    require2FA: selectSignInRequire2FA(state),
    requireEmailVerification: selectSignUpRequireVerification(state),
});
const mapDispatchProps = dispatch => ({
    signIn: data => dispatch(signIn(data)),
    signInError: error => dispatch(signInError(error)),
    signInRequire2FA: payload => dispatch(signInRequire2FA(payload)),
    signUpRequireVerification: data => dispatch(signUpRequireVerification(data)),
});

const SignInScreen = injectIntl(withRouter(connect(mapStateToProps, mapDispatchProps)(SignIn)));

export { SignInScreen, };