import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Alerts, ErrorWrapper, Header } from './containers';
import { Layout } from './routes';
class AppLayout extends React.Component {
    render() {
        const { locale, history } = this.props;
        const { lang, messages } = locale;
        return (React.createElement(IntlProvider, { locale: lang, messages: messages, key: lang },
            React.createElement(Router, { history: history },
                React.createElement(ErrorWrapper, null,
                    React.createElement(Header, null),
                    React.createElement(Alerts, null),
                    React.createElement(Layout, null)))));
    }
}
const mapStateToProps = (state) => ({
    locale: state.public.i18n,
});

const App = connect(mapStateToProps, {})(AppLayout);
export { App, };