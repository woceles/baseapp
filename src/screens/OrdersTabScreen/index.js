import * as React from 'react';
import { FormattedMessage, injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { TabPanel } from '../../components';
import { OrdersElement } from '../../containers/OrdersElement';
import { setDocumentTitle } from '../../helpers';
import { marketsFetch, ordersCancelAllFetch, resetOrdersHistory, selectOrdersHistory, } from '../../modules';
class Orders extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { tab: 'open', currentTabIndex: 0 };
        this.tabMapping = ['open', 'all'];
        this.onCurrentTabChange = index => this.setState({ currentTabIndex: index });
        this.handleMakeRequest = (index) => {
            this.renderTabs();
            if (this.state.tab === this.tabMapping[index]) {
                return;
            }
            this.props.resetOrdersHistory();
            this.setState({ tab: this.tabMapping[index] });
        };
        this.renderTabs = () => {
            const { tab } = this.state;
            return [
                {
                    content: tab === 'open' ? React.createElement(OrdersElement, { type: "open" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.openOrders.tab.open' }),
                },
                {
                    content: tab === 'all' ? React.createElement(OrdersElement, { type: "all" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.openOrders.tab.all' }),
                },
            ];
        };
        this.handleCancelAll = () => this.props.ordersCancelAll(this.state);
    }
    componentDidMount() {
        setDocumentTitle('Orders');
        this.props.marketsFetch();
    }
    componentWillUnmount() {
        this.props.resetOrdersHistory();
    }
    render() {
        const cancelAll = this.props.list.length ? (React.createElement(React.Fragment, null,
            React.createElement("span", { onClick: this.handleCancelAll },
                React.createElement(FormattedMessage, { id: "page.body.openOrders.header.button.cancelAll" }),
                React.createElement("span", { className: "pg-orders-tab__close" })))) : null;
        return (React.createElement("div", { className: "pg-orders-tab pg-container" },
            React.createElement("div", { className: "pg-orders-tab__tabs-content" },
                React.createElement(TabPanel, { panels: this.renderTabs(), onTabChange: this.handleMakeRequest, optionalHead: cancelAll, currentTabIndex: this.state.currentTabIndex, onCurrentTabChange: this.onCurrentTabChange }))));
    }
}
const mapStateToProps = (state) => ({
    list: selectOrdersHistory(state),
});
const mapDispatchToProps = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    ordersCancelAll: payload => dispatch(ordersCancelAllFetch(payload)),
    resetOrdersHistory: () => dispatch(resetOrdersHistory()),
});
const OrdersTabScreen = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Orders));
export { OrdersTabScreen, };