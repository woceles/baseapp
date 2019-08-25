import { Decimal, } from '@openware/components';
import * as React from 'react';
import { connect } from 'react-redux';
import { selectCurrentMarket, selectMarkets, selectMarketTickers, } from '../../modules';
import { MarketSelector, } from './MarketSelector';
import { PriceBar } from './PriceBar';
import { ProgressLabel, } from './ProgressLabel';
class ToolBarComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false,
        };
        this.getTickerValue = (value) => {
            const { marketTickers, currentMarket } = this.props;
            const defaultTicker = { low: 0, last: 0, high: 0, vol: 0, price_change_percent: '+0.00%' };
            return currentMarket && (marketTickers[currentMarket.id] || defaultTicker)[value];
        };
    }
    render() {
        const { marketTickers, currentMarket } = this.props;
        const defaultTicker = { low: 0, last: 0, high: 0, vol: 0, price_change_percent: '+0.00%' };
        const isPositive = currentMarket && /\+/.test(this.getTickerValue('price_change_percent'));
        const last = this.getTickerValue('last');
        const high = this.getTickerValue('high');
        const low = this.getTickerValue('low');
        const percentage = ((last - low) / ((high - low) / 100)) || 0;
        const bidUnit = currentMarket && currentMarket.bid_unit.toUpperCase();
        return (React.createElement("div", { className: "pg-trading-header-container" },
            React.createElement("div", { className: "pg-trading-header-container-selector" },
                React.createElement(MarketSelector, null)),
            React.createElement("div", { className: "pg-trading-header-container-stats" },
                React.createElement("div", { className: "pg-trading-header-container-daily" },
                    React.createElement(ProgressLabel, { progress: currentMarket && Decimal.format(Number(this.getTickerValue('low')), currentMarket.ask_precision), isPositive: true, additional: "Lowest 24h", bidUnit: bidUnit }),
                    React.createElement("div", { className: "pg-trading-header-container-daily-last" },
                        React.createElement(ProgressLabel, { progress: currentMarket && Decimal.format(Number(this.getTickerValue('last')), currentMarket.ask_precision), isPositive: true, additional: "Last Price", bidUnit: bidUnit })),
                    React.createElement(PriceBar, { percentage: percentage, lastPrice: currentMarket && Decimal.format(Number(this.getTickerValue('last')), currentMarket.ask_precision), bidUnit: bidUnit }),
                    React.createElement(ProgressLabel, { progress: currentMarket && Decimal.format(Number(this.getTickerValue('high')), currentMarket.ask_precision), isPositive: false, additional: "Highest 24h", bidUnit: bidUnit })),
                React.createElement("div", { className: "pg-trading-header-container-total" },
                    React.createElement(ProgressLabel, { progress: currentMarket && Decimal.format(Number(this.getTickerValue('vol')), currentMarket.ask_precision), isPositive: true, additional: "24h Volume", bidUnit: bidUnit }),
                    React.createElement(ProgressLabel, { progress: currentMarket && (marketTickers[currentMarket.id] || defaultTicker).price_change_percent, isPositive: isPositive, additional: "Change" })))));
    }
}
const reduxProps = state => ({
    markets: selectMarkets(state),
    currentMarket: selectCurrentMarket(state),
    marketTickers: selectMarketTickers(state),
});
export const ToolBar = connect(reduxProps)(ToolBarComponent);




