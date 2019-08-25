import { Loader } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { OpenOrders } from '../../components';
import { localeFullDate, preciseData, setTradeColor } from '../../helpers';
import { openOrdersCancelFetch, selectCancelOpenOrdersFetching, selectCurrentMarket, selectOpenOrdersFetching, selectOpenOrdersList, selectUserLoggedIn, userOpenOrdersFetch, } from '../../modules';
export class OpenOrdersContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.renderHeadersKeys = () => {
            return [
                'Date',
                'Price',
                'Amount',
                'Total',
                'Filled',
                '',
            ];
        };
        this.renderHeaders = () => {
            const currentAskUnit = this.props.currentMarket ? ` (${this.props.currentMarket.ask_unit.toUpperCase()})` : null;
            const currentBidUnit = this.props.currentMarket ? ` (${this.props.currentMarket.bid_unit.toUpperCase()})` : null;
            return [
                this.translate('page.body.trade.header.openOrders.content.date'),
                this.translate('page.body.trade.header.openOrders.content.price').concat(currentBidUnit),
                this.translate('page.body.trade.header.openOrders.content.amount').concat(currentAskUnit),
                this.translate('page.body.trade.header.openOrders.content.total').concat(currentBidUnit),
                this.translate('page.body.trade.header.openOrders.content.filled'),
                '',
            ];
        };
        this.openOrders = () => {
            return (React.createElement(OpenOrders, { headersKeys: this.renderHeadersKeys(), headers: this.renderHeaders(), data: this.renderData(), onCancel: this.handleCancel }));
        };
        this.renderData = () => {
            const { list, currentMarket } = this.props;
            if (list.length === 0) {
                return [[[''], [''], this.translate('page.noDataToShow')]];
            }
            return list.map((item) => {
                const { id, price, created_at, remaining_volume, origin_volume, side } = item;
                const executedVolume = Number(origin_volume) - Number(remaining_volume);
                const remainingAmount = Number(remaining_volume);
                const total = Number(origin_volume) * Number(price);
                const filled = ((executedVolume / Number(origin_volume)) * 100).toFixed(2);
                const priceFixed = currentMarket ? currentMarket.bid_precision : 0;
                const amountFixed = currentMarket ? currentMarket.ask_precision : 0;
                return [
                    localeFullDate(created_at),
                    React.createElement("span", { style: { color: setTradeColor(side).color }, key: id }, preciseData(price, priceFixed)),
                    React.createElement("span", { style: { color: setTradeColor(side).color }, key: id }, preciseData(remainingAmount, amountFixed)),
                    React.createElement("span", { style: { color: setTradeColor(side).color }, key: id }, preciseData(total, amountFixed)),
                    React.createElement("span", { style: { color: setTradeColor(side).color }, key: id },
                        filled,
                        "%"),
                    side,
                ];
            });
        };
        this.translate = (e) => this.props.intl.formatMessage({ id: e });
        this.handleCancel = (index) => {
            const { list, cancelFetching } = this.props;
            if (cancelFetching) {
                return;
            }
            const orderToDelete = list[index];
            this.props.openOrdersCancelFetch({ id: orderToDelete.id, list });
        };
    }
    componentDidMount() {
        const { currentMarket, userLoggedIn } = this.props;
        if (userLoggedIn && currentMarket) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        }
    }
    componentWillReceiveProps(next) {
        const { userLoggedIn, currentMarket } = next;
        const { userLoggedIn: prevUserLoggedIn, currentMarket: prevCurrentMarket } = this.props;
        if (!prevUserLoggedIn && userLoggedIn && currentMarket) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        }
        else if (userLoggedIn && currentMarket && prevCurrentMarket !== currentMarket) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        }
    }
    render() {
        const { list, fetching } = this.props;
        const classNames = classnames('pg-open-orders', {
            'pg-open-orders--empty': !list.length,
            'pg-open-orders--loading': fetching,
        });
        return (React.createElement("div", { className: classNames },
            React.createElement("div", { className: "cr-table-header__content" },
                React.createElement("div", { className: "cr-title-component" },
                    React.createElement(FormattedMessage, { id: "page.body.trade.header.openOrders" }))),
            fetching ? React.createElement(Loader, null) : this.openOrders()));
    }
}
const mapStateToProps = (state) => ({
    currentMarket: selectCurrentMarket(state),
    list: selectOpenOrdersList(state),
    fetching: selectOpenOrdersFetching(state),
    cancelFetching: selectCancelOpenOrdersFetching(state),
    userLoggedIn: selectUserLoggedIn(state),
});
const mapDispatchToProps = dispatch => ({
    userOpenOrdersFetch: payload => dispatch(userOpenOrdersFetch(payload)),
    openOrdersCancelFetch: payload => dispatch(openOrdersCancelFetch(payload)),
});
export const OpenOrdersComponent = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OpenOrdersContainer));