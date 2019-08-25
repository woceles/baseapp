import { Decimal } from '@openware/components';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
const CurrencyIcon = (props) => {
    return props.icon ?
        React.createElement("img", { className: "cr-wallet-item__single__image-icon", src: props.icon }) :
        React.createElement("span", { className: `cr-wallet-item__icon-code cr-crypto-font-${props.currency}` });
};
const CurrencyInfo = (props) => {
    const balance = (props.wallet || { balance: 0 }).balance.toString();
    const lockedAmount = (props.wallet || { locked: 0 }).locked;
    const currency = (props.wallet || { currency: '' }).currency.toUpperCase();
    const selectedFixed = (props.wallet || { fixed: 0 }).fixed;
    const stringLocked = lockedAmount ? lockedAmount.toString() : undefined;
    const iconUrl = props.wallet ? props.wallet.iconUrl : null;
    return (React.createElement("div", { className: "cr-wallet-item__single" },
        React.createElement(CurrencyIcon, { icon: iconUrl, currency: currency }),
        React.createElement("div", { className: "cr-wallet-item__single-balance" },
            React.createElement("div", null,
                React.createElement("div", { className: "cr-wallet-item__amount-locked" },
                    React.createElement(FormattedMessage, { id: "page.body.wallets.locked" })),
                React.createElement("span", { className: "cr-wallet-item__balance-locked" },
                    React.createElement(Decimal, { fixed: selectedFixed }, stringLocked))),
            React.createElement("div", null,
                React.createElement("span", { className: "cr-wallet-item__balance" },
                    currency,
                    "\u00A0",
                    React.createElement(FormattedMessage, { id: "page.body.wallets.balance" })),
                "\u00A0",
                React.createElement("span", { className: "cr-wallet-item__balance-amount" },
                    React.createElement(Decimal, { fixed: selectedFixed }, balance))))));
};
export { CurrencyInfo, };