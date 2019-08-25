import { Loader } from '@openware/components';
import * as React from 'react';
import { injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setDocumentTitle } from '../../helpers';
import { emailVerificationFetch, selectCurrentLanguage, selectSendEmailVerificationLoading, } from '../../modules';
class EmailVerificationComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            this.props.emailVerificationFetch({
                email: this.props.location.state.email,
                lang: this.props.i18n.toLowerCase(),
            });
        };
    }
    componentDidMount() {
        setDocumentTitle('Email verification');
        if (!this.props.location.state || !this.props.location.state.email) {
            this.props.history.push('/signin');
        }
    }
    render() {
        const { emailVerificationLoading } = this.props;
        const title = this.props.intl.formatMessage({ id: 'page.header.signUp.modal.header' });
        const text = this.props.intl.formatMessage({ id: 'page.header.signUp.modal.body' });
        const button = this.props.intl.formatMessage({ id: 'page.resendConfirmation' });
        return (React.createElement("div", { className: "pg-emailverification-container" },
            React.createElement("div", { className: "pg-emailverification" },
                React.createElement("div", { className: "pg-emailverification-title" }, title),
                React.createElement("div", { className: "pg-emailverification-body" },
                    React.createElement("div", { className: "pg-emailverification-body-text" }, text),
                    React.createElement("div", { className: "pg-emailverification-body-container" }, emailVerificationLoading ? React.createElement(Loader, null) : React.createElement("button", { className: "pg-emailverification-body-container-button", onClick: this.handleClick }, button))))));
    }
}
const mapStateToProps = state => ({
    emailVerificationLoading: selectSendEmailVerificationLoading(state),
    i18n: selectCurrentLanguage(state),
});
const mapDispatchProps = {
    emailVerificationFetch,
};

export const EmailVerificationScreen = injectIntl(withRouter(connect(mapStateToProps, mapDispatchProps)(EmailVerificationComponent)));