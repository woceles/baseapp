import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { selectMobileWalletUi, setMobileWalletUi, } from '../../modules';
import { NavBar } from '../NavBar';

class Head extends React.Component {
    constructor(props) {
        super(props);
        this.openMenu = () => {
            this.setState({
                isActive: true,
            });
            document.getElementsByClassName('pg-header__navbar')[0].addEventListener('click', this.handleOutsideClick);
        };
        this.backWallets = () => {
            this.props.setMobileWalletUi('');
        };
        this.closeMenu = (e) => {
            this.setState({
                isActive: false,
            });
            this.props.setMobileWalletUi('');
        };
        this.handleOutsideClick = (e) => {
            if (e.offsetX > e.target.clientWidth) {
                this.setState({
                    isActive: false,
                });
                document.getElementsByClassName('pg-header__navbar')[0].removeEventListener('click', this.handleOutsideClick);
            }
        };
        this.state = {
            isActive: false,
        };
    }
    render() {
        const { location, mobileWallet, image } = this.props;
        const { isActive } = this.state;
        return (React.createElement(React.Fragment, null, !['/confirm'].some(r => location.pathname.includes(r)) &&
            React.createElement("header", { className: `pg-header ${isActive ? 'pg-header--active' : ''}` },
                React.createElement("div", { className: "pg-container pg-header__content" },
                    React.createElement(Link, { to: '', className: "pg-header__logo" },
                        React.createElement("div", { className: "pg-logo" },
                            React.createElement("img", { src: require(`../../assets/images/logo.svg`) , className: "pg-logo__img", alt: "Logo" }))),
                    React.createElement("div", { className: "pg-header__location" }, mobileWallet ? React.createElement("span", null, mobileWallet) : React.createElement("span", null, location.pathname.split('/')[1])),
                    mobileWallet ?
                        React.createElement("div", { onClick: this.backWallets, className: "pg-header__toggler" },
                            React.createElement("img", { src: require(`../../assets/images/back.svg`) })) :
                        React.createElement("div", { onClick: this.openMenu, className: `pg-header__toggler ${isActive ? 'pg-header__toggler--active' : ''}` },
                            React.createElement("span", { className: "pg-header__toggler-item" }),
                            React.createElement("span", { className: "pg-header__toggler-item" }),
                            React.createElement("span", { className: "pg-header__toggler-item" })),
                    React.createElement("div", { className: "pg-header__navbar" },
                        React.createElement(NavBar, { onLinkChange: this.closeMenu }))))));
    }
}
const mapStateToProps = (state) => ({
    mobileWallet: selectMobileWalletUi(state),
});
const mapDispatchToProps = dispatch => ({
    setMobileWalletUi: payload => dispatch(setMobileWalletUi(payload)),
});
const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(Head));
export { Header, };