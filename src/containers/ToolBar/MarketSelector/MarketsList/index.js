import { Decimal, Table } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
import { injectIntl, intlShape, } from 'react-intl';
import { connect } from 'react-redux';
import { depthFetch, orderBookFetch, selectCurrentMarket, selectMarkets, selectMarketTickers, setCurrentMarket, setCurrentPrice, } from '../../../../modules';

class MarketsListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.currencyPairSelectHandler = (key) => {
            const { markets } = this.props;
            const marketToSet = markets.find(el => el.name === key);
            this.props.setCurrentPrice('');
            if (marketToSet) {
                this.props.setCurrentMarket(marketToSet);
                this.props.depthFetch(marketToSet);
                this.props.orderBookFetch(marketToSet);
            }
        };
        this.getHeaders = () => [
            { id: 'id', translationKey: 'market' },
            { id: 'last', translationKey: 'last_price' },
            { id: 'vol', translationKey: 'volume' },
            { id: 'price_change_percent_num', translationKey: 'change' },
        ].map(obj => {
            const { sortBy, reverseOrder } = this.state;
            return ({
                ...obj,
                selected: sortBy === obj.id,
                reversed: sortBy === obj.id && reverseOrder,
            });
        }).map(obj => {
            const { sortBy, reverseOrder } = this.state;
            const classname = classnames({
                'pg-dropdown-markets-list-container__header-selected': obj.selected,
            });
            const arrowClassname = classnames({
                'pg-dropdown-markets-list-container__arrow-down': !(obj.id === sortBy && !reverseOrder),
                'pg-dropdown-markets-list-container__arrow-up': obj.id === sortBy && !reverseOrder,
            });
            return (React.createElement("span", { className: classname, key: obj.id, onClick: () => this.handleHeaderClick(obj.id) },
                this.props.intl.formatMessage({ id: `page.body.trade.header.markets.content.${obj.translationKey}` }),
                React.createElement("i", { className: arrowClassname })));
        });
        this.handleHeaderClick = (key) => {
            const { sortBy, reverseOrder } = this.state;
            if (key !== sortBy) {
                this.setState({ sortBy: key, reverseOrder: false });
            }
            else {
                this.setState({ reverseOrder: !reverseOrder });
            }
        };
        this.state = {
            sortBy: 'id',
            reverseOrder: false,
        };
    }
    render() {
        const data = this.mapMarkets();
        return (React.createElement("div", { className: "pg-dropdown-markets-list-container" },
            React.createElement(Table, { data: data.length > 0 ? data : [[]], header: this.getHeaders(), onSelect: this.currencyPairSelectHandler, selectedKey: this.props.currentMarket && this.props.currentMarket.name, rowKeyIndex: 0 })));
    }
    mapMarkets() {
        const { markets, marketTickers, search, currencyQuote } = this.props;
        const defaultTicker = {
            last: 0,
            vol: 0,
            price_change_percent: '+0.00%',
        };
        const regExp = new RegExp(search.toLowerCase());
        const arr = [];
        const marketsMapped = markets.map((market) => {
            return {
                ...market,
                last: (marketTickers[market.id] || defaultTicker).last,
                vol: (marketTickers[market.id] || defaultTicker).vol,
                price_change_percent: (marketTickers[market.id] || defaultTicker).price_change_percent,
                price_change_percent_num: Number.parseFloat((marketTickers[market.id] || defaultTicker).price_change_percent),
            };
        });
        const { sortBy, reverseOrder } = this.state;
        marketsMapped.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0);
        reverseOrder && marketsMapped.reverse();
        return marketsMapped.reduce((pV, cV) => {
            const [, quote] = cV.name.toLowerCase().split('/');
            if (regExp.test(cV.id.toLowerCase()) &&
                (currencyQuote === '' ||
                    currencyQuote.toLowerCase() === quote ||
                    currencyQuote.toLowerCase() === 'all')) {
                pV.push(cV);
            }
            return pV;
        }, arr).map((market, index) => {
            const isPositive = /\+/.test((marketTickers[market.id] || defaultTicker).price_change_percent);
            const classname = classnames({
                'pg-dropdown-markets-list-container__positive': isPositive,
                'pg-dropdown-markets-list-container__negative': !isPositive,
            });
            return [
                market.name,
                (React.createElement("span", { className: classname }, Decimal.format(Number(market.last), market.ask_precision))),
                (React.createElement("span", { className: classname }, Decimal.format(Number(market.vol), market.ask_precision))),
                (React.createElement("span", { className: classname }, market.price_change_percent)),
            ];
        });
    }
}

MarketsListComponent.propTypes = {
    intl: intlShape.isRequired,
};
const mapStateToProps = (state) => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    marketTickers: selectMarketTickers(state),
});
const mapDispatchToProps = {
    setCurrentMarket,
    depthFetch,
    orderBookFetch,
    setCurrentPrice,
};
export const MarketsList = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MarketsListComponent));