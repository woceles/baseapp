import * as React from 'react';
import { FormattedMessage } from 'react-intl';
const bankData = [
    {
        key: React.createElement(FormattedMessage, { id: "page.body.wallets.tabs.deposit.fiat.bankName" }),
        value: 'Diamant Bank',
    },
    {
        key: React.createElement(FormattedMessage, { id: "page.body.wallets.tabs.deposit.fiat.accountNumber" }),
        value: '10120212',
    },
    {
        key: React.createElement(FormattedMessage, { id: "page.body.wallets.tabs.deposit.fiat.accountName" }),
        value: 'name',
    },
    {
        key: React.createElement(FormattedMessage, { id: "page.body.wallets.tabs.deposit.fiat.phoneNumber" }),
        value: '+3 8093 1212 12 12',
    },
    {
        key: React.createElement(FormattedMessage, { id: "page.body.wallets.tabs.deposit.fiat.referenceCode" }),
        value: '8374982374',
    },
];
/**
 * Component to display bank account details which can be used for a
 * deposit
 */
const DepositFiat = (props) => {
    const { description, title } = props;
    const renderDetails = (detail, index) => {
        return (React.createElement("div", { className: "cr-deposit-fiat-detail", key: index },
            React.createElement("p", { className: "cr-deposit-fiat-detail__label" },
                detail.key,
                ":"),
            React.createElement("p", { className: "cr-deposit-fiat-detail__value" }, detail.value)));
    };
    return (React.createElement("div", { className: "cr-deposit-fiat" },
        React.createElement("p", { className: "cr-deposit-fiat__title" }, title),
        React.createElement("p", { className: "cr-deposit-fiat__description" }, description),
        React.createElement("div", { className: "cr-deposit-fiat-credentials" }, bankData.map(renderDetails))));
};
export { DepositFiat, };