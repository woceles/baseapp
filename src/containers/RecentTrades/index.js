import { Decimal, Table } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
import { FormattedMessage, injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { localeDateSec, setTradeColor } from '../../helpers';
import { selectCurrentMarket, selectCurrentPrice, setCurrentPrice, } from '../../modules';
import { recentTradesFetch, selectRecentTradesOfCurrentMarket } from '../../modules/public/recentTrades';
class RecentTradesComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.getHeaders = () => {
            return [
                this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.price' }),
                this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.amount' }),
                this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.time' }),
            ];
        };
        this.handleOnSelect = (index) => {
            const { recentTrades, currentPrice } = this.props;
            const priceToSet = recentTrades[Number(index)] ? recentTrades[Number(index)].price : '';
            if (currentPrice !== priceToSet) {
                this.props.setCurrentPrice(priceToSet);
            }
        };
    }
    componentWillReceiveProps(next) {
        if (next.currentMarket && this.props.currentMarket !== next.currentMarket) {
            this.props.tradesFetch(next.currentMarket);
        }
    }
    componentDidMount() {
        if (this.props.currentMarket) {
            this.props.tradesFetch(this.props.currentMarket);
        }
    }
    render() {
        const className = classnames({
            'cr-table__noData': !this.props.recentTrades.length,
        });
        return (React.createElement("div", { className: className },
            React.createElement("div", { className: "pg-recent-trades" },
                React.createElement("div", { className: "cr-table-header__content" },
                    React.createElement("div", { className: "cr-title-component" },
                        React.createElement(FormattedMessage, { id: "page.body.trade.header.recentTrades" }))),
                React.createElement(Table, { data: this.getTrades(this.props.recentTrades), header: this.getHeaders(), onSelect: this.handleOnSelect }))));
    }
    getTrades(trades) {
        const priceFixed = this.props.currentMarket ? this.props.currentMarket.bid_precision : 0;
        const amountFixed = this.props.currentMarket ? this.props.currentMarket.ask_precision : 0;
        const renderRow = item => {
            const { id, created_at, taker_type, price, volume } = item;
            return [
                React.createElement("span", { style: { color: setTradeColor(taker_type).color }, key: id },
                    React.createElement(Decimal, { fixed: priceFixed }, price)),
                React.createElement("span", { style: { color: setTradeColor(taker_type).color }, key: id },
                    React.createElement(Decimal, { fixed: amountFixed }, volume)),
                React.createElement("span", { style: { color: setTradeColor(taker_type).color }, key: id }, localeDateSec(created_at).slice(5)),
            ];
        };
        return (trades.length > 0)
            ? trades.map(renderRow)
            : [[[''], this.props.intl.formatMessage({ id: 'page.noDataToShow' })]];
    }
}
const mapStateToProps = (state) => ({
    recentTrades: selectRecentTradesOfCurrentMarket(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
});
const mapDispatchToProps = dispatch => ({
    tradesFetch: market => dispatch(recentTradesFetch(market)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});
export const RecentTrades = injectIntl(connect(mapStateToProps, mapDispatchToProps)(RecentTradesComponent));