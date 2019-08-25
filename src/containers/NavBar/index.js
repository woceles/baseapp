import classnames from 'classnames';
import * as React from 'react';
import {
    FormattedMessage
} from 'react-intl';
import {
    connect,
} from 'react-redux';
import {
    Link,
    withRouter
} from 'react-router-dom';
import {
    pgRoutes
} from '../../constants';
import {
    changeLanguage,
    logoutFetch,
    selectCurrentLanguage,
    selectCurrentMarket,
    selectUserInfo,
    selectUserLoggedIn,
    walletsReset,
} from '../../modules';
class NavBarComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false,
            isOpenLanguage: false,
            email: '',
            name: '',
            message: '',
            recaptchaResponse: '',
            errorModal: false,
        };
        this.navItem = (address, onLinkChange) => (values, index) => {
            const [name, url] = values;
            const {
                isLoggedIn,
                currentMarket
            } = this.props;
            const cx = classnames('pg-navbar__content-item', {
                'pg-navbar__content-item--active': this.shouldUnderline(address, url),
                'pg-navbar__content-item-logging': isLoggedIn,
            });
            const handleLinkChange = () => {
                if (onLinkChange) {
                    onLinkChange();
                }
            };
            const path = url.includes('/trading') && currentMarket ? `/trading/${currentMarket.id}` : url;
            return (React.createElement("li", {
                    onClick: handleLinkChange,
                    key: index
                },
                React.createElement(Link, {
                        className: cx,
                        to: path
                    },
                    React.createElement(FormattedMessage, {
                        id: name
                    }))));
        };
        this.shouldUnderline = (address, url) => (url === '/trading/' && address.includes('/trading')) || address === url;
        this.getProfile = () => {
            const {
                user
            } = this.props;
            return (React.createElement("div", {
                    className: "pg-navbar__header-profile"
                },
                React.createElement(Link, {
                        className: "pg-navbar__admin-logout",
                        to: "/profile",
                        onClick: this.handleRouteChange('/profile')
                    },
                    React.createElement(FormattedMessage, {
                        id: 'page.header.navbar.profile'
                    })),
                React.createElement("span", null, user.email),
                React.createElement("img", {
                    onClick: this.handleLogOut,
                    className: "pg-navbar__header-profile-logout",
                    src: require(`../../assets/images/logout.svg`)
                })));
        };
        this.getLanguageMenu = () => {
            return (React.createElement("div", {
                    className: "dropdown-menu dropdown-menu-language",
                    role: "menu"
                },
                React.createElement("div", {
                    className: "dropdown-menu-item-lang",
                    onClick: e => this.handleChangeLanguage('en')
                }, "EN"),
                React.createElement("div", {
                    className: "dropdown-menu-item-lang",
                    onClick: e => this.handleChangeLanguage('ru')
                }, "RU"),
                React.createElement("div", {
                    className: "dropdown-menu-item-lang",
                    onClick: e => this.handleChangeLanguage('zh')
                }, "\u4E2D\u56FD")));
        };
        this.getUserEmailMenu = () => {
            const {
                isOpen
            } = this.state;
            const userClassName = classnames('navbar-user-menu', {
                'navbar-user-menu-active': isOpen,
            });
            return (React.createElement("div", {
                    className: "btn-group pg-navbar__header-settings__account-dropdown dropdown-toggle"
                },
                React.createElement("div", {
                        onClick: this.openMenu,
                        className: userClassName
                    },
                    React.createElement("img", {
                        src: require(`./${isOpen ? 'open' : 'close'}-avatar.svg`)
                    }),
                    React.createElement("img", {
                        className: "icon",
                        src: require(`./${isOpen ? 'open' : 'close'}-icon.svg`)
                    })),
                isOpen ? this.getUserMenu() : null));
        };
        this.getUserMenu = () => {
            return (React.createElement("div", {
                    className: "dropdown-menu dropdown-menu-user",
                    role: "menu"
                },
                React.createElement("div", {
                        className: "dropdown-menu-item-user"
                    },
                    React.createElement(Link, {
                            className: "pg-navbar__admin-logout",
                            to: "/profile",
                            onClick: this.handleRouteChange('/profile')
                        },
                        React.createElement(FormattedMessage, {
                            id: 'page.header.navbar.profile'
                        }))),
                React.createElement("div", {
                        className: "dropdown-menu-item-user"
                    },
                    React.createElement("a", {
                            className: "pg-navbar__admin-logout",
                            onClick: this.handleLogOut
                        },
                        React.createElement(FormattedMessage, {
                            id: 'page.header.navbar.logout'
                        })))));
        };
        this.handleRouteChange = (to) => () => {
            this.setState({
                isOpen: false
            }, () => {
                this.props.history.push(to);
            });
        };
        this.handleLogOut = () => {
            this.setState({
                isOpen: false,
            }, () => {
                this.props.logout();
            });
        };
        this.openMenu = () => {
            this.setState({
                isOpen: !this.state.isOpen,
            }, () => {
                if (this.state.isOpen) {
                    document.addEventListener('click', this.closeMenu);
                } else {
                    document.removeEventListener('click', this.closeMenu);
                }
            });
        };
        this.closeMenu = () => {
            this.setState({
                isOpen: false,
            }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        };
        this.toggleLanguageMenu = () => {
            this.setState({
                isOpenLanguage: !this.state.isOpenLanguage,
            }, () => {
                if (this.state.isOpenLanguage) {
                    document.addEventListener('click', this.closeLanguageMenu);
                } else {
                    document.removeEventListener('click', this.closeLanguageMenu);
                }
            });
        };
        this.closeLanguageMenu = () => {
            this.setState({
                isOpenLanguage: false,
            }, () => {
                document.removeEventListener('click', this.closeLanguageMenu);
            });
        };
        this.handleChangeLanguage = (language) => {
            this.props.changeLanguage(language);
        };
    }
    render() {
        const {
            location,
            user,
            lang
        } = this.props;
        const {
            isOpenLanguage
        } = this.state;
        const address = location ? location.pathname : '';
        const languageName = lang.toUpperCase();
        const languageClassName = classnames('dropdown-menu-language-field', {
            'dropdown-menu-language-field-active': isOpenLanguage,
        });
        return (React.createElement("div", {
                className: 'pg-navbar'
            },
            user.email ? this.getProfile() : null,
            React.createElement("ul", {
                className: "pg-navbar__content"
            }, pgRoutes(!!user.email).map(this.navItem(address, this.props.onLinkChange))),
            React.createElement("div", {
                    className: "pg-navbar__header-settings"
                },
                user.email ? this.getUserEmailMenu() : null,
                React.createElement("div", {
                        className: "btn-group pg-navbar__header-settings__account-dropdown dropdown-toggle dropdown-menu-language-container"
                    },
                    React.createElement("div", {
                            onClick: this.toggleLanguageMenu,
                            className: languageClassName
                        },
                        languageName,
                        React.createElement("img", {
                            className: "icon",
                            src: require(`./${isOpenLanguage ? 'open' : 'close'}-icon.svg`)
                        })),
                    isOpenLanguage ? this.getLanguageMenu() : null)),
            React.createElement("div", {
                    className: "pg-navbar__header-language",
                    onClick: this.toggleLanguageMenu
                },
                React.createElement("span", null, "LANGUAGE"),
                React.createElement("span", null,
                    languageName,
                    React.createElement("img", {
                        className: "icon",
                        src: require(`./${isOpenLanguage ? 'open' : 'close'}-icon.svg`)
                    })),
                isOpenLanguage ? this.getLanguageMenu() : null)));
    }
}
const mapStateToProps = (state) => ({
    currentMarket: selectCurrentMarket(state),
    address: '',
    lang: selectCurrentLanguage(state),
    user: selectUserInfo(state),
    isLoggedIn: selectUserLoggedIn(state),
});
const mapDispatchToProps = dispatch => ({
    changeLanguage: payload => dispatch(changeLanguage(payload)),
    logout: () => dispatch(logoutFetch()),
    walletsReset: () => dispatch(walletsReset()),
});

const NavBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarComponent));
export {
    NavBar,
};