import { Decimal, Loader, Markets } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
import { injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { selectUserInfo, setCurrentPrice } from '../../modules';
import { marketsTickersFetch, selectCurrentMarket, selectMarkets, selectMarketsLoading, selectMarketTickers, setCurrentMarket, } from '../../modules/public/markets';
import { depthFetch, orderBookFetch } from '../../modules/public/orderBook';
import { walletsFetch } from '../../modules/user/wallets';
class MarketsContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.headers = [
            this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.pair' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.price' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.change' }),
        ];
        this.markets = () => {
            const { currentMarket } = this.props;
            const key = currentMarket && currentMarket.name;
            return (React.createElement(Markets, { filters: false, data: this.mapMarkets(), rowKeyIndex: 0, onSelect: this.handleOnSelect, selectedKey: key, headers: this.headers, title: this.props.intl.formatMessage({ id: 'page.body.trade.header.markets' }), filterPlaceholder: this.props.intl.formatMessage({ id: 'page.body.trade.header.markets.content.search' }) }));
        };
        this.handleOnSelect = (index) => {
            const { markets, currentMarket } = this.props;
            const marketToSet = markets.find(el => el.name === index);
            this.props.setCurrentPrice('');
            if (!currentMarket || currentMarket.id !== marketToSet.id) {
                this.props.setCurrentMarket(marketToSet);
                this.props.depthFetch(marketToSet);
                this.props.orderBookFetch(marketToSet);
            }
        };
    }
    componentDidMount() {
        if (this.props.markets.length === 0) {
            this.props.tickers();
        }
        this.props.walletsFetch();
    }
    render() {
        const { marketsLoading } = this.props;
        const className = classnames('pg-markets', {
            'pg-markets--loading': marketsLoading,
        });
        return (React.createElement("div", { className: className }, marketsLoading ? React.createElement("div", null,
            React.createElement(Loader, null)) : this.markets()));
    }
    mapMarkets() {
        const { markets, marketTickers } = this.props;
        const defaultTicker = {
            last: 0,
            price_change_percent: '+0.00%',
        };
        return markets.map((market) => ([
            market.name,
            Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.ask_precision),
            (marketTickers[market.id] || defaultTicker).price_change_percent,
        ]));
    }
}
const mapStateToProps = (state) => ({
    userData: selectUserInfo(state),
    markets: selectMarkets(state),
    marketsLoading: selectMarketsLoading(state),
    marketTickers: selectMarketTickers(state),
    currentMarket: selectCurrentMarket(state),
});
const mapDispatchToProps = dispatch => ({
    setCurrentMarket: (market) => dispatch(setCurrentMarket(market)),
    walletsFetch: () => dispatch(walletsFetch()),
    depthFetch: (market) => dispatch(depthFetch(market)),
    orderBookFetch: (market) => dispatch(orderBookFetch(market)),
    tickers: () => dispatch(marketsTickersFetch()),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});
export const MarketsComponent = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MarketsContainer));