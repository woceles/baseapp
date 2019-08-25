import { CloseButton, Decimal, Loader, Pagination } from '@openware/components';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { History } from '../../components';
import { localeDate, setTradeColor } from '../../helpers';
import { ordersHistoryCancelFetch, selectCancelAllFetching, selectCancelFetching, selectCurrentPageIndex, selectMarkets, selectOrdersFirstElemIndex, selectOrdersHistory, selectOrdersHistoryLoading, selectOrdersLastElemIndex, selectOrdersNextPageExists, selectTotalOrdersHistory, userOrdersHistoryFetch, } from '../../modules';
class OrdersComponent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderContent = () => {
            const { firstElemIndex, lastElemIndex, total, pageIndex, nextPageExists } = this.props;
            return (React.createElement(React.Fragment, null,
                React.createElement(History, { headers: this.renderHeaders(), data: this.retrieveData() }),
                React.createElement(Pagination, { firstElemIndex: firstElemIndex, lastElemIndex: lastElemIndex, total: total, page: pageIndex, nextPageExists: nextPageExists, onClickPrevPage: this.onClickPrevPage, onClickNextPage: this.onClickNextPage })));
        };
        this.onClickPrevPage = () => {
            const { pageIndex, type } = this.props;
            this.props.userOrdersHistoryFetch({ pageIndex: Number(pageIndex) - 1, type, limit: 25 });
        };
        this.onClickNextPage = () => {
            const { pageIndex, type } = this.props;
            this.props.userOrdersHistoryFetch({ pageIndex: Number(pageIndex) + 1, type, limit: 25 });
        };
        this.renderHeaders = () => {
            return [
                this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.date' }),
                this.props.intl.formatMessage({ id: 'page.body.openOrders.header.orderType' }),
                this.props.intl.formatMessage({ id: 'page.body.openOrders.header.pair' }),
                this.props.intl.formatMessage({ id: 'page.body.openOrders.header.price' }),
                this.props.intl.formatMessage({ id: 'page.body.openOrders.header.amount' }),
                this.props.intl.formatMessage({ id: 'page.body.openOrders.header.executed' }),
                this.props.intl.formatMessage({ id: 'page.body.openOrders.header.remaining' }),
                this.props.intl.formatMessage({ id: 'page.body.openOrders.header.costRemaining' }),
                this.props.intl.formatMessage({ id: 'page.body.openOrders.header.status' }),
                '',
            ];
        };
        this.retrieveData = () => {
            return [...this.props.list]
                .map(item => this.renderOrdersHistoryRow(item));
        };
        this.renderOrdersHistoryRow = item => {
            const { id, executed_volume, market, ord_type, price, avg_price, remaining_volume, origin_volume, side, state, updated_at, } = item;
            const currentMarket = this.props.marketsData.find(m => m.id === market)
                || { name: '', bid_precision: 0, ask_precision: 0 };
            const orderType = this.getType(side, ord_type);
            const marketName = currentMarket ? currentMarket.name : market;
            const costRemaining = remaining_volume * price; // price or avg_price ???
            const date = localeDate(updated_at);
            const status = this.setOrderStatus(state);
            const actualPrice = ord_type === 'market' || status === 'done' ? avg_price : price;
            return [
                date,
                React.createElement("span", { style: { color: setTradeColor(side).color }, key: id }, orderType),
                marketName,
                React.createElement(Decimal, { key: id, fixed: currentMarket.bid_precision }, actualPrice),
                React.createElement(Decimal, { key: id, fixed: currentMarket.ask_precision }, origin_volume),
                React.createElement(Decimal, { key: id, fixed: currentMarket.ask_precision }, executed_volume),
                React.createElement(Decimal, { key: id, fixed: currentMarket.ask_precision }, remaining_volume),
                React.createElement(Decimal, { key: id, fixed: currentMarket.ask_precision }, costRemaining.toString()),
                status,
                state === 'wait' && React.createElement(CloseButton, { key: id, onClick: this.handleCancel(id) }),
            ];
        };
        this.getType = (side, orderType) => {
            if (!side || !orderType) {
                return '';
            }
            return this.props.intl.formatMessage({ id: `page.body.openOrders.header.orderType.${side}.${orderType}` });
        };
        this.setOrderStatus = (status) => {
            switch (status) {
                case 'done':
                    return (React.createElement("span", { className: "pg-history-elem-executed" },
                        React.createElement(FormattedMessage, { id: `page.body.openOrders.content.status.done` })));
                case 'cancel':
                    return (React.createElement("span", { className: "pg-history-elem-canceled" },
                        React.createElement(FormattedMessage, { id: `page.body.openOrders.content.status.cancel` })));
                case 'wait':
                    return (React.createElement("span", { className: "pg-history-elem-opened" },
                        React.createElement(FormattedMessage, { id: `page.body.openOrders.content.status.wait` })));
                default:
                    return status;
            }
        };
        this.handleCancel = (id) => () => {
            const { cancelAllFetching, cancelFetching, type, list } = this.props;
            if (cancelAllFetching || cancelFetching) {
                return;
            }
            this.props.ordersHistoryCancelFetch({ id, type, list });
        };
    }
    componentDidMount() {
        const { type } = this.props;
        this.props.userOrdersHistoryFetch({ pageIndex: 0, type, limit: 25 });
    }
    render() {
        const { list, fetching } = this.props;
        const emptyMsg = this.props.intl.formatMessage({ id: 'page.noDataToShow' });
        return (React.createElement("div", { className: `pg-history-elem ${list.length ? '' : 'pg-history-elem-empty'}` },
            fetching && React.createElement(Loader, null),
            list.length ? this.renderContent() : null,
            !list.length && !fetching ? React.createElement("p", { className: "pg-history-elem__empty" }, emptyMsg) : null));
    }
}
const mapStateToProps = (state) => ({
    marketsData: selectMarkets(state),
    pageIndex: selectCurrentPageIndex(state),
    firstElemIndex: selectOrdersFirstElemIndex(state, 25),
    list: selectOrdersHistory(state),
    fetching: selectOrdersHistoryLoading(state),
    lastElemIndex: selectOrdersLastElemIndex(state, 25),
    nextPageExists: selectOrdersNextPageExists(state, 25),
    total: selectTotalOrdersHistory(state),
    cancelAllFetching: selectCancelAllFetching(state),
    cancelFetching: selectCancelFetching(state),
});
const mapDispatchToProps = dispatch => ({
    ordersHistoryCancelFetch: payload => dispatch(ordersHistoryCancelFetch(payload)),
    userOrdersHistoryFetch: payload => dispatch(userOrdersHistoryFetch(payload)),
});
export const OrdersElement = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrdersComponent));