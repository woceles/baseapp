import { Button, CryptoIcon, Decimal, Dropdown, OrderInput, PercentageButton } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
import { getAmount, getTotalPrice } from '../../helpers/getTotalPrice';
const handleSetValue = (value, defaultValue) => (value || defaultValue);
const cleanPositiveFloatInput = (text) => {
    let cleanInput = text
        .replace(',', '.')
        .replace(/-+/, '')
        .replace(/^0+/, '0')
        .replace(/\.+/, '.')
        .replace(/^0+([1-9])/, '$1');
    if (cleanInput[0] === '.') {
        cleanInput = `0${cleanInput}`;
    }
    return cleanInput;
};
const checkButtonIsDisabled = (safeAmount, safePrice, price, props, state) => {
    const invalidAmount = safeAmount <= 0;
    const invalidLimitPrice = Number(price) <= 0 && state.orderType === 'Limit';
    const invalidMarketPrice = safePrice <= 0 && state.orderType === 'Market';
    return props.disabled || !props.available || invalidAmount || invalidLimitPrice || invalidMarketPrice;
};
class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleOrderTypeChange = (index) => {
            const { orderTypes } = this.props;
            this.setState({
                orderType: orderTypes[index],
            });
        };
        this.handleFieldFocus = (field) => {
            switch (field) {
                case this.props.priceText:
                    this.setState(prev => ({
                        priceFocused: !prev.priceFocused,
                    }));
                    break;
                case this.props.amountText:
                    this.setState(prev => ({
                        amountFocused: !prev.amountFocused,
                    }));
                    break;
                default:
                    break;
            }
        };
        this.handlePriceChange = (value) => {
            const convertedValue = cleanPositiveFloatInput(String(value));
            const condition = new RegExp(`^(?:[\\d-]*\\.?[\\d-]{0,${this.state.currentMarketBidPrecision}}|[\\d-]*\\.[\\d-])$`);
            if (convertedValue.match(condition)) {
                this.setState({
                    price: convertedValue,
                });
            }
        };
        this.handleAmountChange = (value) => {
            const convertedValue = cleanPositiveFloatInput(String(value));
            const condition = new RegExp(`^(?:[\\d-]*\\.?[\\d-]{0,${this.state.currentMarketAskPrecision}}|[\\d-]*\\.[\\d-])$`);
            if (convertedValue.match(condition)) {
                this.setState({
                    amount: convertedValue,
                });
            }
        };
        this.handleChangeAmountByButton = (value, type) => {
            switch (type) {
                case 'buy':
                    switch (this.state.orderType) {
                        case 'Limit':
                            this.setState({
                                amount: this.props.available && +this.state.price ? (Decimal.format(this.props.available / +this.state.price * value, this.state.currentMarketAskPrecision)) : '',
                            });
                            break;
                        case 'Market':
                            this.setState({
                                amount: this.props.available ? (Decimal.format(getAmount(Number(this.props.available), this.props.proposals, value), this.state.currentMarketAskPrecision)) : '',
                            });
                            break;
                        default:
                            break;
                    }
                    break;
                case 'sell':
                    this.setState({
                        amount: this.props.available ? (Decimal.format(this.props.available * value, this.state.currentMarketAskPrecision)) : '',
                    });
                    break;
                default:
                    break;
            }
        };
        this.handleSubmit = () => {
            const { type } = this.props;
            const { amount, price, priceMarket, orderType } = this.state;
            const order = {
                type,
                orderType,
                amount,
                price: orderType === 'Market' ? priceMarket : price,
            };
            this.props.onSubmit(order);
            this.setState({
                amount: '',
                price: '',
            });
        };
        this.state = {
            orderType: 'Limit',
            amount: '',
            price: '',
            priceMarket: this.props.priceMarket,
            currentMarketAskPrecision: this.props.currentMarketAskPrecision || 6,
            currentMarketBidPrecision: this.props.currentMarketBidPrecision || 6,
            priceFocused: false,
            amountFocused: false,
        };
    }
    componentWillReceiveProps(next) {
        const nextPriceLimitTruncated = Decimal.format(next.priceLimit, this.state.currentMarketBidPrecision);
        if (this.state.orderType === 'Limit' && next.priceLimit && nextPriceLimitTruncated !== this.state.price) {
            this.setState({
                price: nextPriceLimitTruncated,
            });
        }
        this.setState({
            priceMarket: next.priceMarket,
            currentMarketAskPrecision: next.currentMarketAskPrecision,
            currentMarketBidPrecision: next.currentMarketBidPrecision,
        });
    }
    render() {
        const { type, fee, orderTypes, className, from, to, available, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitButtonText, proposals, } = this.props;
        const { orderType, amount, price, priceMarket, currentMarketAskPrecision, currentMarketBidPrecision, priceFocused, amountFocused, } = this.state;
        const safeAmount = Number(amount) || 0;
        const totalPrice = getTotalPrice(amount, proposals);
        const safePrice = totalPrice / Number(amount) || priceMarket;
        const total = orderType === 'Market'
            ? totalPrice : safeAmount * (Number(price) || 0);
        const amountPercentageArray = [0.25, 0.5, 0.75, 1];
        const cx = classnames('cr-order-form', className);
        const currencyCodeFrom = `${from.toUpperCase()}-alt`;
        const availableCurrency = type === 'buy' ? from : to;
        return (React.createElement("div", { className: cx },
            React.createElement("div", { className: "cr-order-item" },
                orderTypeText ? React.createElement("div", { className: "cr-order-item__dropdown__label" }, orderTypeText) : null,
                React.createElement(Dropdown, { list: orderTypes, onSelect: this.handleOrderTypeChange })),
            orderType === 'Limit' ? (React.createElement("div", { className: "cr-order-item" },
                React.createElement(OrderInput, { currency: from, label: priceText, placeholder: priceText, value: handleSetValue(price, ''), isFocused: priceFocused, handleChangeValue: this.handlePriceChange, handleFocusInput: () => this.handleFieldFocus(priceText) }))) : (React.createElement("div", { className: "cr-order-item" },
                React.createElement("div", { className: "cr-order-input" },
                    React.createElement("fieldset", { className: "cr-order-input__fieldset" },
                        React.createElement("legend", { className: 'cr-order-input__fieldset__label' }, handleSetValue(priceText, '')),
                        React.createElement("div", { className: "cr-order-input__fieldset__input" },
                            "\u2248",
                            React.createElement("span", { className: "cr-order-input__fieldset__input__price" }, handleSetValue(Decimal.format(safePrice, currentMarketBidPrecision), '0')))),
                    React.createElement("div", { className: "cr-order-input__crypto-icon" },
                        React.createElement(CryptoIcon, { code: currencyCodeFrom }, from.toUpperCase()))))),
            React.createElement("div", { className: "cr-order-item" },
                React.createElement(OrderInput, { currency: to, label: amountText, placeholder: amountText, value: handleSetValue(amount, ''), isFocused: amountFocused, handleChangeValue: this.handleAmountChange, handleFocusInput: () => this.handleFieldFocus(amountText) })),
            React.createElement("div", { className: "cr-order-item" },
                React.createElement("div", { className: "cr-order-item__percentage-buttons" },
                    React.createElement(PercentageButton, { label: `${amountPercentageArray[0] * 100}%`, onClick: () => this.handleChangeAmountByButton(amountPercentageArray[0], type) }),
                    React.createElement(PercentageButton, { label: `${amountPercentageArray[1] * 100}%`, onClick: () => this.handleChangeAmountByButton(amountPercentageArray[1], type) }),
                    React.createElement(PercentageButton, { label: `${amountPercentageArray[2] * 100}%`, onClick: () => this.handleChangeAmountByButton(amountPercentageArray[2], type) }),
                    React.createElement(PercentageButton, { label: `${amountPercentageArray[3] * 100}%`, onClick: () => this.handleChangeAmountByButton(amountPercentageArray[3], type) }))),
            React.createElement("div", { className: "cr-order-item" },
                React.createElement("div", { className: "cr-order-item__total" },
                    React.createElement("label", { className: "cr-order-item__total__label" }, handleSetValue(totalText, 'Total')),
                    React.createElement("div", { className: "cr-order-item__total__content" },
                        orderType === 'Limit' ? (React.createElement("span", { className: "cr-order-item__total__content__amount" }, Decimal.format(total, currentMarketAskPrecision))) : (React.createElement("span", { className: "cr-order-item__total__content__amount" },
                            "\u2248",
                            Decimal.format(total, currentMarketAskPrecision))),
                        React.createElement("span", { className: "cr-order-item__total__content__currency" }, from.toUpperCase())))),
            React.createElement("div", { className: "cr-order-item" },
                React.createElement("div", { className: "cr-order-item__available" },
                    React.createElement("label", { className: "cr-order-item__available__label" }, handleSetValue(availableText, 'Available')),
                    React.createElement("div", { className: "cr-order-item__available__content" },
                        React.createElement("span", { className: "cr-order-item__available__content__amount" }, available ? Decimal.format(available, currentMarketAskPrecision) : ''),
                        React.createElement("span", { className: "cr-order-item__available__content__currency" }, available ? availableCurrency.toUpperCase() : '')))),
            React.createElement("div", { className: "cr-order-item" },
                React.createElement("div", { className: "cr-order-item__fee" },
                    React.createElement("label", { className: "cr-order-item__fee__label" }, handleSetValue(estimatedFeeText, 'Estimated fee')),
                    React.createElement("div", { className: "cr-order-item__fee__content" },
                        React.createElement("span", { className: "cr-order-item__fee__content__amount" }, fee ? (type === 'buy' ? (Decimal.format(fee * +amount, currentMarketAskPrecision)) : (Decimal.format(fee * total, currentMarketAskPrecision))) : ''),
                        React.createElement("span", { className: "cr-order-item__fee__content__currency" }, fee ? (type === 'buy' ? to.toUpperCase() : from.toUpperCase()) : '')))),
            React.createElement("div", { className: "cr-order-item" },
                React.createElement(Button, { disabled: checkButtonIsDisabled(safeAmount, safePrice, price, this.props, this.state), label: submitButtonText || type, noMargin: true, onClick: this.handleSubmit }))));
    }
}
export { OrderForm, };