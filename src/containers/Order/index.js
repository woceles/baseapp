import { Loader, } from '@openware/components';
import * as React from 'react';
import { FormattedMessage, injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { Order } from '../../components';
import { selectCurrentPrice, selectDepthAsks, selectDepthBids, selectUserLoggedIn, selectWallets, setCurrentPrice, walletsFetch, } from '../../modules';
import { selectCurrentMarket, selectMarketTickers } from '../../modules/public/markets';
import { orderExecuteFetch, selectOrderExecuteLoading, } from '../../modules/user/orders';
class OrderInsert extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getOrderTypes = [
            this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.orderType.limit' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.orderType.market' }),
        ];
        this.handleSubmit = (value) => {
            if (!this.props.currentMarket) {
                return;
            }
            const { type, price, orderType, amount } = value;
            this.props.setCurrentPrice('');
            const resultData = {
                market: this.props.currentMarket.id,
                side: type,
                volume: amount.toString(),
                ord_type: orderType.toLowerCase(),
            };
            const order = orderType === 'Limit' ? { ...resultData, price: price.toString() } : resultData;
            this.props.orderExecute(order);
        };
        this.getOrderType = (index, label) => {
            this.setState({
                orderSide: label.toLowerCase(),
            });
        };
        this.state = {
            orderSide: 'buy',
            priceLimit: 0,
            width: 0,
        };
        this.orderRef = React.createRef();
    }
    componentDidUpdate() {
        if (this.orderRef.current && this.state.width !== this.orderRef.current.clientWidth) {
            this.setState({
                width: this.orderRef.current.clientWidth,
            });
        }
    }
    componentWillReceiveProps(next) {
        const { userLoggedIn, accountWallets } = this.props;
        if (userLoggedIn && (!next.wallets || next.wallets.length === 0)) {
            accountWallets();
        }
        if (+next.currentPrice && next.currentPrice !== this.state.priceLimit) {
            this.setState({
                priceLimit: +next.currentPrice,
            });
        }
    }
    render() {
        const { executeLoading, marketTickers, currentMarket, wallets, asks, bids } = this.props;
        if (!currentMarket) {
            return null;
        }
        const { priceLimit } = this.state;
        const walletBase = this.getWallet(currentMarket.ask_unit, wallets);
        const walletQuote = this.getWallet(currentMarket.bid_unit, wallets);
        const to = currentMarket.ask_unit;
        const from = currentMarket.bid_unit;
        const currentTicker = marketTickers[currentMarket.id];
        const defaultCurrentTicker = { last: '0' };
        const headerContent = (React.createElement("div", { className: "cr-table-header__content" },
            React.createElement("div", { className: "cr-title-component" },
                React.createElement(FormattedMessage, { id: "page.body.trade.header.newOrder" }))));
        return (React.createElement("div", { className: 'pg-order', ref: this.orderRef },
            this.state.width > 449 ? headerContent : undefined,
            React.createElement(Order, { asks: asks, bids: bids, disabled: executeLoading, feeBuy: Number(currentMarket.ask_fee), feeSell: Number(currentMarket.ask_fee), from: from, availableBase: this.getAvailableValue(walletBase), availableQuote: this.getAvailableValue(walletQuote), onSubmit: this.handleSubmit, priceMarketBuy: Number((currentTicker || defaultCurrentTicker).last), priceMarketSell: Number((currentTicker || defaultCurrentTicker).last), priceLimit: priceLimit, to: to, handleSendType: this.getOrderType, orderTypes: this.getOrderTypes, currentMarketAskPrecision: currentMarket.ask_precision, currentMarketBidPrecision: currentMarket.bid_precision, amountText: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.amount' }), availableText: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.available' }), orderTypeText: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.orderType' }), priceText: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.price' }), totalText: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.total' }), labelFirst: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.tabs.buy' }), labelSecond: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.tabs.sell' }), estimatedFeeText: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.estimatedFee' }), submitBuyButtonText: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.tabs.buy' }), submitSellButtonText: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.tabs.sell' }), width: this.state.width }),
            executeLoading && React.createElement(Loader, null)));
    }
    getWallet(currency, wallets) {
        const currencyLower = currency.toLowerCase();
        return wallets.find(w => w.currency === currencyLower);
    }
    getAvailableValue(wallet) {
        return wallet ? wallet.balance : 0;
    }
}
const mapStateToProps = (state) => ({
    bids: selectDepthBids(state),
    asks: selectDepthAsks(state),
    currentMarket: selectCurrentMarket(state),
    executeLoading: selectOrderExecuteLoading(state),
    marketTickers: selectMarketTickers(state),
    wallets: selectWallets(state),
    currentPrice: selectCurrentPrice(state),
    userLoggedIn: selectUserLoggedIn(state),
});
const mapDispatchToProps = dispatch => ({
    accountWallets: () => dispatch(walletsFetch()),
    orderExecute: payload => dispatch(orderExecuteFetch(payload)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});

const OrderComponent = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrderInsert));
export { OrderComponent, };