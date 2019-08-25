import { TabPanel } from '@openware/components';
import * as React from 'react';
import { OrderForm } from '../';
const defaultOrderTypes = [
    'Limit',
    'Market',
];
const splitBorder = 449;
const defaultWidth = 635;
class Order extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.getPanels = () => {
            const { availableBase, availableQuote, disabled, feeBuy, feeSell, priceMarketBuy, priceMarketSell, priceLimit, from, to, currentMarketAskPrecision, currentMarketBidPrecision, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitBuyButtonText, submitSellButtonText, labelFirst, labelSecond, orderTypes, asks, bids, } = this.props;
            return [
                {
                    content: (React.createElement(OrderForm, { proposals: asks, disabled: disabled, fee: feeBuy, type: "buy", from: from, to: to, available: availableQuote, priceMarket: priceMarketBuy, priceLimit: priceLimit, onSubmit: this.props.onSubmit, orderTypes: orderTypes ? orderTypes : defaultOrderTypes, currentMarketAskPrecision: currentMarketAskPrecision, currentMarketBidPrecision: currentMarketBidPrecision, orderTypeText: orderTypeText, priceText: priceText, amountText: amountText, totalText: totalText, availableText: availableText, estimatedFeeText: estimatedFeeText, submitButtonText: submitBuyButtonText })),
                    label: labelFirst ? labelFirst : 'Buy',
                },
                {
                    content: (React.createElement(OrderForm, { proposals: bids, fee: feeSell, type: "sell", from: from, to: to, available: availableBase, priceMarket: priceMarketSell, priceLimit: priceLimit, onSubmit: this.props.onSubmit, orderTypes: orderTypes ? orderTypes : defaultOrderTypes, currentMarketAskPrecision: currentMarketAskPrecision, currentMarketBidPrecision: currentMarketBidPrecision, orderTypeText: orderTypeText, priceText: priceText, amountText: amountText, totalText: totalText, availableText: availableText, estimatedFeeText: estimatedFeeText, submitButtonText: submitSellButtonText })),
                    label: labelSecond ? labelSecond : 'Sell',
                },
            ];
        };
        this.getPanelsBuy = () => {
            const { availableQuote, disabled, feeBuy, priceMarketBuy, priceLimit, from, to, currentMarketAskPrecision, currentMarketBidPrecision, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitBuyButtonText, labelFirst, orderTypes, asks, } = this.props;
            return [
                {
                    content: (React.createElement(OrderForm, { proposals: asks, disabled: disabled, fee: feeBuy, type: "buy", from: from, to: to, available: availableQuote, priceMarket: priceMarketBuy, priceLimit: priceLimit, onSubmit: this.props.onSubmit, orderTypes: orderTypes ? orderTypes : defaultOrderTypes, currentMarketAskPrecision: currentMarketAskPrecision, currentMarketBidPrecision: currentMarketBidPrecision, orderTypeText: orderTypeText, priceText: priceText, amountText: amountText, totalText: totalText, availableText: availableText, estimatedFeeText: estimatedFeeText, submitButtonText: submitBuyButtonText })),
                    label: labelFirst ? labelFirst : 'Buy',
                },
            ];
        };
        this.getPanelsSell = () => {
            const { availableBase, feeSell, priceMarketSell, priceLimit, from, to, currentMarketAskPrecision, currentMarketBidPrecision, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitSellButtonText, labelSecond, orderTypes, bids, } = this.props;
            return [
                {
                    content: (React.createElement(OrderForm, { proposals: bids, fee: feeSell, type: "sell", from: from, to: to, available: availableBase, priceMarket: priceMarketSell, priceLimit: priceLimit, onSubmit: this.props.onSubmit, orderTypes: orderTypes ? orderTypes : defaultOrderTypes, currentMarketAskPrecision: currentMarketAskPrecision, currentMarketBidPrecision: currentMarketBidPrecision, orderTypeText: orderTypeText, priceText: priceText, amountText: amountText, totalText: totalText, availableText: availableText, estimatedFeeText: estimatedFeeText, submitButtonText: submitSellButtonText })),
                    label: labelSecond ? labelSecond : 'Sell',
                },
            ];
        };
        this.handleChangeTab = (index, label) => {
            if (this.props.handleSendType && label) {
                this.props.handleSendType(index, label);
            }
        };
    }
    render() {
        const { width = defaultWidth, } = this.props;
        if (width < splitBorder) {
            return (React.createElement("div", { className: "cr-order" },
                React.createElement(TabPanel, { fixed: true, panels: this.getPanels(), onTabChange: this.handleChangeTab, tabIndex: this.props.tabIndex })));
        }
        return (React.createElement("div", { className: "cr-order cr-order--extended" },
            React.createElement("div", { className: "cr-order--extended__buy" },
                React.createElement(TabPanel, { fixed: true, panels: this.getPanelsBuy(), onTabChange: this.handleChangeTab, tabIndex: this.props.tabIndex })),
            React.createElement("div", { className: "cr-order--extended__sell" },
                React.createElement(TabPanel, { fixed: true, panels: this.getPanelsSell(), onTabChange: this.handleChangeTab, tabIndex: this.props.tabIndex }))));
    }
}
export { Order, };