import { Button, Input, } from '@openware/components';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CopyableTextField } from '../../components';
import { setDocumentTitle } from '../../helpers';
import { alertPush } from '../../modules';
import { enableUser2fa, generate2faQRFetch, selectTwoFactorAuthBarcode, selectTwoFactorAuthQR, selectTwoFactorAuthSuccess, toggle2faFetch, } from '../../modules/user/profile';
const copy = (id) => {
    const copyText = document.querySelector(`#${id}`);
    if (copyText) {
        copyText.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
};
class ToggleTwoFactorAuthComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            otpCode: '',
        };
        this.translate = (e) => {
            return this.props.intl.formatMessage({ id: e });
        };
        this.doCopy = () => {
            copy('referral-id');
            this.props.fetchSuccess({ message: ['page.body.wallets.tabs.deposit.ccy.message.success'], type: 'success' });
        };
        this.renderToggle2fa = (enable2fa) => {
            const { barcode, qrUrl, } = this.props;
            const { otpCode } = this.state;
            const secretRegex = /secret=(\w+)/;
            const secretMatch = qrUrl.match(secretRegex);
            const secret = secretMatch ? secretMatch[1] : null;
            const submitHandler = enable2fa ? this.handleEnable2fa : this.handleDisable2fa;
            return (React.createElement("div", { className: "container mt-5 pg-profile-two-factor-auth__form p-0" },
                React.createElement("div", { className: "row m-0 pg-profile-two-factor-auth__header" },
                    React.createElement("div", { className: "col-11 col-lg-7 offset-lg-4 mt-0 p-0 pl-3" }, this.translate('page.body.profile.header.account.content.twoFactorAuthentication.header')),
                    React.createElement("div", { className: "col-1 mx-0 p-0 px-1", onClick: this.goBack },
                        React.createElement("img", { src: require('../../assets/images/close.svg') }))),
                React.createElement("div", { className: "row m-0 pg-profile-two-factor-auth__body" },
                    React.createElement("div", { className: "col-12 col-lg-8 col-md-9 pr-0 pl-2 pg-profile-two-factor-auth__body--text d-inline-block" },
                        React.createElement("div", { className: "row col-12 pg-profile-two-factor-auth__body--text--group" },
                            React.createElement("div", { className: "d-inline" },
                                React.createElement("span", null, "1   "),
                                this.translate('page.body.profile.header.account.content.twoFactorAuthentication.message.1'),
                                React.createElement("a", { target: "_blank", href: "https://itunes.apple.com/ru/app/google-authenticator/id388497605?mt=8" }, "AppStore "),
                                this.translate('page.body.profile.header.account.content.twoFactorAuthentication.message.or'),
                                React.createElement("a", { target: "_blank", href: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl" }, "Google play"))),
                        React.createElement("div", { className: "row col-12 pg-profile-two-factor-auth__body--text--group" },
                            React.createElement("div", { className: "d-inline" },
                                React.createElement("span", null, "2    "),
                                this.translate('page.body.profile.header.account.content.twoFactorAuthentication.message.2'),
                                React.createElement("br", null),
                                this.translate('page.body.profile.header.account.content.twoFactorAuthentication.message.3')))),
                    React.createElement("div", { className: "col-12 col-lg-4 col-md-3 pt-4 pg-profile-two-factor-auth__body--barcode" }, enable2fa && this.renderTwoFactorAuthQR(barcode))),
                React.createElement("div", { className: "row m-0 p-5 pg-profile-two-factor-auth__copyablefield" }, enable2fa && secret && this.renderSecret(secret)),
                React.createElement("div", { className: "row m-0 pg-profile-two-factor-auth__body" },
                    React.createElement("div", { className: "col-12 pl-2 pg-profile-two-factor-auth__body--text d-inline-block" },
                        React.createElement("div", { className: "row col-12 pg-profile-two-factor-auth__body--text--group" },
                            React.createElement("div", { className: "col-12 col-md-8 col-sm-7" },
                                React.createElement("span", null, "3   "),
                                this.translate('page.body.profile.header.account.content.twoFactorAuthentication.message.4')),
                            React.createElement("div", { className: "col-12 col-md-4 col-sm-5" },
                                React.createElement("fieldset", { className: "pg-profile-two-factor-auth__body--input" },
                                    React.createElement(Input, { onChangeValue: this.handleOtpCodeChange, type: "tel", value: otpCode, placeholder: this.translate('page.body.profile.header.account.content.twoFactorAuthentication.subHeader'), onKeyPress: this.handleEnterPress })))))),
                React.createElement("div", { className: "row p-5" },
                    React.createElement("div", { className: "col-12 m-0" },
                        React.createElement(Button, { className: "p-3 m-0", label: this.translate('page.body.profile.header.account.content.twoFactorAuthentication.enable'), onClick: submitHandler })))));
        };
        this.handleOtpCodeChange = (value) => {
            this.setState({
                otpCode: value,
            });
        };
        this.handleEnterPress = (event) => {
            const enable2fa = this.get2faAction();
            const submitHandler = enable2fa ? this.handleEnable2fa : this.handleDisable2fa;
            if (event.key === 'Enter') {
                event.preventDefault();
                submitHandler();
            }
        };
        this.handleEnable2fa = () => {
            this.props.toggle2fa({
                code: this.state.otpCode,
                enable: true,
            });
        };
        this.handleDisable2fa = () => {
            this.props.toggle2fa({
                code: this.state.otpCode,
                enable: false,
            });
        };
        this.handleNavigateToProfile = () => {
            this.props.history.push('/profile');
        };
        this.get2faAction = () => {
            const routingState = this.props.history.location.state;
            return routingState ? routingState.enable2fa : false;
        };
    }
    componentDidMount() {
        setDocumentTitle('Two factor authentication');
        const enable2fa = this.get2faAction();
        if (enable2fa) {
            this.props.generateQR();
        }
    }
    componentWillReceiveProps(next) {
        if (!this.props.success && next.success) {
            this.handleNavigateToProfile();
        }
    }
    render() {
        const enable2fa = this.get2faAction();
        return (React.createElement("div", { className: "pg-profile-two-factor-auth" }, this.renderToggle2fa(enable2fa)));
    }
    componentDidUpdate(prev) {
        if (!prev.success && this.props.success) {
            this.props.enableUser2fa();
        }
    }
    renderTwoFactorAuthQR(barcode) {
        const src = `data:image/png;base64,${barcode}`;
        return barcode.length > 0 && React.createElement("img", { className: "pg-profile-two-factor-auth__qr", src: src });
    }
    renderSecret(secret) {
        return (React.createElement("fieldset", { onClick: this.doCopy },
            React.createElement("legend", null, this.translate('page.body.profile.header.account.content.twoFactorAuthentication.message.mfa')),
            secret && React.createElement(CopyableTextField, { value: secret, fieldId: "secret-2fa" })));
    }
    goBack() {
        window.history.back();
    }
}
const mapStateToProps = state => ({
    qrUrl: selectTwoFactorAuthQR(state),
    barcode: selectTwoFactorAuthBarcode(state),
    success: selectTwoFactorAuthSuccess(state),
});
const mapDispatchToProps = dispatch => ({
    generateQR: () => dispatch(generate2faQRFetch()),
    toggle2fa: ({ code, enable }) => dispatch(toggle2faFetch({ code, enable })),
    enableUser2fa: () => dispatch(enableUser2fa()),
    fetchSuccess: payload => dispatch(alertPush(payload)),
});
const connected = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ToggleTwoFactorAuthComponent));

const ProfileTwoFactorAuthScreen = withRouter(connected);
export { ProfileTwoFactorAuthScreen, };