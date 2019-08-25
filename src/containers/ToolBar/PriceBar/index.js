import * as React from 'react';
export class PriceBar extends React.Component {
    render() {
        const { percentage, lastPrice, bidUnit } = this.props;
        const gap = 18;
        const position = percentage > 50 ? 'right' : 'left';
        let positionValue;
        positionValue = position === 'left' ? percentage < gap ? '0' : `${percentage - gap}%` : percentage + gap > 100 ? '0' : `${100 - percentage - gap}%`;
        const style = {};
        style[position] = positionValue;
        return (React.createElement("div", { className: "pg-trading-header-price-bar" },
            React.createElement("div", { className: "pg-trading-header-price-bar-filler" },
                React.createElement("div", { className: "pg-trading-header-price-bar-filler-left", style: { width: `${percentage}%` } }),
                React.createElement("div", { className: "pg-trading-header-price-bar-filler-cursor" }),
                React.createElement("div", { className: "pg-trading-header-price-bar-text", style: style },
                    "Last Price: ",
                    lastPrice,
                    " ",
                    bidUnit),
                React.createElement("div", { className: "pg-trading-header-price-bar-filler-right", style: { width: `${100 - percentage}%` } }))));
    }
}