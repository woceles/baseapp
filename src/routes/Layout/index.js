import { Loader } from '@openware/components';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { minutesUntilAutoLogout } from '../../api';
import { logoutFetch, selectCurrentMarket, selectUserFetching, selectUserInfo, selectUserLoggedIn, userFetch, walletsReset, } from '../../modules';
import { ChangeForgottenPasswordScreen, ConfirmScreen, EmailVerificationScreen, ForgotPasswordScreen, HistoryScreen, OrdersTabScreen, ProfileScreen, ProfileTwoFactorAuthScreen, SignInScreen, SignUpScreen, TradingScreen, VerificationScreen, WalletsScreen, } from '../../screens';
const renderLoader = () => (React.createElement("div", { className: "pg-loader-container" },
    React.createElement(Loader, null)));
const CHECK_INTERVAL = 15000;
const STORE_KEY = 'lastAction';

const PrivateRoute = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }
    const renderCustomerComponent = props => React.createElement(CustomComponent, Object.assign({}, props));
    if (isLogged) {
        return React.createElement(Route, Object.assign({}, rest, { render: renderCustomerComponent }));
    }
    return (React.createElement(Route, Object.assign({}, rest),
        React.createElement(Redirect, { to: '/signin' })));
};

const PublicRoute = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }
    if (isLogged) {
        return React.createElement(Route, Object.assign({}, rest),
            React.createElement(Redirect, { to: '/wallets' }));
    }
    const renderCustomerComponent = props => React.createElement(CustomComponent, Object.assign({}, props));
    return React.createElement(Route, Object.assign({}, rest, { render: renderCustomerComponent }));
};
class LayoutComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getLastAction = () => {
            if (localStorage.getItem(STORE_KEY) !== null) {
                return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
            }
            return 0;
        };
        this.setLastAction = (lastAction) => {
            localStorage.setItem(STORE_KEY, lastAction.toString());
        };
        this.initListener = () => {
            this.reset();
            for (const type of LayoutComponent.eventsListen) {
                document.body.addEventListener(type, this.reset);
            }
        };
        this.reset = () => {
            this.setLastAction(Date.now());
        };
        this.initInterval = () => {
            this.timer = setInterval(() => {
                this.check();
            }, CHECK_INTERVAL);
        };
        this.check = () => {
            const { user } = this.props;
            const now = Date.now();
            const timeleft = this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
            const diff = timeleft - now;
            const isTimeout = diff < 0;
            if (isTimeout && user.email) {
                this.props.logout();
            }
        };
        this.initListener();
    }
    componentDidMount() {
        this.props.userFetch();
        this.initInterval();
        this.check();
    }
    componentDidUpdate(next) {
        const { isLoggedIn, history } = this.props;
        if (!isLoggedIn && next.isLoggedIn) {
            this.props.walletsReset();
            if (!history.location.pathname.includes('/trading')) {
                history.push('/trading/');
            }
        }
    }
    componentWillUnmount() {
        for (const type of LayoutComponent.eventsListen) {
            document.body.removeEventListener(type, this.reset);
        }
        clearInterval(this.timer);
    }
    render() {
        const { isLoggedIn, userLoading } = this.props;
        return (React.createElement("div", { className: "container-fluid pg-layout" },
            React.createElement(Switch, null,
                React.createElement(PublicRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/signin", component: SignInScreen }),
                React.createElement(PublicRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/accounts/confirmation", component: VerificationScreen }),
                React.createElement(PublicRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/signup", component: SignUpScreen }),
                React.createElement(PublicRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/forgot_password", component: ForgotPasswordScreen }),
                React.createElement(PublicRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/accounts/password_reset", component: ChangeForgottenPasswordScreen }),
                React.createElement(PublicRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/email-verification", component: EmailVerificationScreen }),
                React.createElement(Route, { exact: true, path: "/trading/:market?", component: TradingScreen }),
                React.createElement(PrivateRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/orders", component: OrdersTabScreen }),
                React.createElement(PrivateRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/history", component: HistoryScreen }),
                React.createElement(PrivateRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/confirm", component: ConfirmScreen }),
                React.createElement(PrivateRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/profile", component: ProfileScreen }),
                React.createElement(PrivateRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/wallets", component: WalletsScreen }),
                React.createElement(PrivateRoute, { loading: userLoading, isLogged: isLoggedIn, path: "/security/2fa", component: ProfileTwoFactorAuthScreen }),
                React.createElement(Route, { path: "**" },
                    React.createElement(Redirect, { to: "/trading/" })))));
    }
}
LayoutComponent.eventsListen = [
    'click',
    'keydown',
    'scroll',
    'resize',
    'mousemove',
    'TabSelect',
    'TabHide',
];
const mapStateToProps = state => ({
    currentMarket: selectCurrentMarket(state),
    user: selectUserInfo(state),
    isLoggedIn: selectUserLoggedIn(state),
    userLoading: selectUserFetching(state),
});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutFetch()),
    userFetch: () => dispatch(userFetch()),
    walletsReset: () => dispatch(walletsReset()),
});

const Layout = withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutComponent));
export { Layout, };