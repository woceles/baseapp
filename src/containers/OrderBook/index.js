import { CombinedOrderBook, Decimal, Loader } from '@openware/components';
import classNames from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, } from 'react-redux';
import { accumulateVolume, calcMaxVolume, sortAsks, sortBids } from '../../helpers';
import { selectCurrentMarket, selectCurrentPrice, selectDepthAsks, selectDepthBids, selectDepthLoading, selectMarketTickers, setCurrentPrice, } from '../../modules';
// render big/small breakpoint
const breakpoint = 449;
class OrderBookContainer extends React.Component {
    constructor(props) {
        super(props);
        this.orderBook = (bids, asks) => {
            const isLarge = this.state.width >= breakpoint;
            const asksData = isLarge ? asks : asks.slice(0).reverse();
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: 'cr-table-header__content' }, this.props.intl.formatMessage({ id: 'page.body.trade.orderbook' })),
                React.createElement(CombinedOrderBook, { maxVolume: calcMaxVolume(bids, asks), orderBookEntryAsks: accumulateVolume(asks), orderBookEntryBids: accumulateVolume(bids), rowBackgroundColorAsks: 'rgba(232, 94, 89, 0.4)', rowBackgroundColorBids: 'rgba(84, 180, 137, 0.4)', dataAsks: this.renderOrderBook(asksData, 'asks', this.props.intl.formatMessage({ id: 'page.noDataToShow' }), this.props.currentMarket), dataBids: this.renderOrderBook(bids, 'bids', this.props.intl.formatMessage({ id: 'page.noDataToShow' }), this.props.currentMarket), headers: this.renderHeaders(), lastPrice: this.lastPrice(), onSelectAsks: this.handleOnSelectAsks, onSelectBids: this.handleOnSelectBids, isLarge: isLarge })));
        };
        this.lastPrice = () => {
            const { marketTickers, currentMarket } = this.props;
            const defaultTicker = {
                last: 0,
                price_change_percent: '+0.00%',
            };
            if (currentMarket && marketTickers[currentMarket.id] && marketTickers[currentMarket.id].price_change_percent) {
                const cn = classNames('', {
                    'cr-combined-order-book__market-negative': (marketTickers[currentMarket.id] || defaultTicker).price_change_percent.includes('-'),
                    'cr-combined-order-book__market-positive': (marketTickers[currentMarket.id] || defaultTicker).price_change_percent.includes('+'),
                });
                return (React.createElement(React.Fragment, null,
                    React.createElement("span", { className: cn },
                        Decimal.format(Number((marketTickers[currentMarket.id] || defaultTicker).last), currentMarket.ask_precision),
                        " ",
                        currentMarket.bid_unit.toUpperCase()),
                    React.createElement("span", null, "Last Market Price")));
            }
            else {
                return React.createElement(React.Fragment, null,
                    React.createElement("span", { className: 'cr-combined-order-book__market-negative' }, "0"),
                    React.createElement("span", null, "Last Market Price"));
            }
        };
        this.renderHeaders = () => {
            return [
                this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.price' }),
                this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.amount' }),
                this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.volume' }),
            ];
        };
        this.renderOrderBook = (array, side, message, currentMarket) => {
            let total = accumulateVolume(array);
            const isLarge = this.state.width > breakpoint;
            const priceFixed = currentMarket ? currentMarket.bid_precision : 0;
            const amountFixed = currentMarket ? currentMarket.ask_precision : 0;
            return (array.length > 0) ? array.map((item, i) => {
                const [price, volume] = item;
                const index = array.length - i - 1;
                switch (side) {
                    case 'bids':
                        return [
                            React.createElement("span", { key: i },
                                React.createElement(Decimal, { fixed: priceFixed }, price)),
                            React.createElement(Decimal, { key: i, fixed: amountFixed }, volume),
                            React.createElement(Decimal, { key: i, fixed: amountFixed }, total[i]),
                        ];
                    default:
                        if (isLarge) {
                            return [
                                React.createElement(Decimal, { key: i, fixed: amountFixed }, total[i]),
                                React.createElement(Decimal, { key: i, fixed: amountFixed }, volume),
                                React.createElement("span", { key: i },
                                    React.createElement(Decimal, { fixed: priceFixed }, price)),
                            ];
                        }
                        else {
                            total = accumulateVolume(array.slice(0).reverse());
                            return [
                                React.createElement("span", { key: i },
                                    React.createElement(Decimal, { fixed: priceFixed }, price)),
                                React.createElement(Decimal, { key: i, fixed: amountFixed }, volume),
                                React.createElement(Decimal, { key: i, fixed: amountFixed }, total[index]),
                            ];
                        }
                }
            }) : [[[''], message]];
        };
        this.handleOnSelectBids = (index) => {
            const { currentPrice, bids } = this.props;
            const priceToSet = bids[Number(index)] ? bids[Number(index)][0] : '';
            if (currentPrice !== priceToSet) {
                this.props.setCurrentPrice(priceToSet);
            }
        };
        this.handleOnSelectAsks = (index) => {
            const { currentPrice, asks } = this.props;
            const isLarge = this.state.width >= breakpoint;
            const asksData = isLarge ? asks : asks.slice(0).reverse();
            const priceToSet = asksData[Number(index)] ? asksData[Number(index)][0] : '';
            if (currentPrice !== priceToSet) {
                this.props.setCurrentPrice(priceToSet);
            }
        };
        this.state = {
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
    render() {
        const { bids, isLoading, asks } = this.props;
        const cn = classNames('pg-combined-order-book ', {
            'cr-combined-order-book--loading': isLoading,
            'pg-combined-order-book--no-data-asks': !asks.length,
            'pg-combined-order-book--no-data-bids': !bids.length,
        });
        return (React.createElement("div", { className: cn, ref: this.orderRef }, isLoading ? React.createElement("div", null,
            React.createElement(Loader, null)) : this.orderBook(sortBids(bids), sortAsks(asks))));
    }
}
const mapStateToProps = state => ({
    bids: selectDepthBids(state),
    asks: selectDepthAsks(state),
    isLoading: selectDepthLoading(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
    marketTickers: selectMarketTickers(state),
});
const mapDispatchToProps = dispatch => ({
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});
const OrderBook = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrderBookContainer));
export { OrderBook, };