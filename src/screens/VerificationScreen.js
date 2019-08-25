import * as React from 'react';
import { connect, } from 'react-redux';
import { Redirect } from 'react-router';
import { changeLanguage, selectEmailVerified, verificationFetch, } from '../modules';
export const extractToken = (props) => new URLSearchParams(props.location.search).get('confirmation_token');
export const extractLang = (props) => new URLSearchParams(props.location.search).get('lang');
class Verification extends React.Component {
    componentDidMount() {
        const token = extractToken(this.props);
        const lang = extractLang(this.props);
        if (token) {
            this.props.verification({ token });
        }
        if (lang) {
            this.props.changeLanguage(lang.toLowerCase());
        }
    }
    render() {
        return (React.createElement(Redirect, { to: '/signin' }));
    }
}
const mapStateToProps = state => ({
    isEmailVerified: selectEmailVerified(state),
});
const mapDispatchToProps = dispatch => ({
    verification: data => dispatch(verificationFetch(data)),
    changeLanguage: lang => dispatch(changeLanguage(lang)),
});
const VerificationScreen = connect(mapStateToProps, mapDispatchToProps)(Verification);
export { VerificationScreen, };