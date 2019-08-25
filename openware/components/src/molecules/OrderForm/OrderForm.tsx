import classnames from 'classnames';
import * as React from 'react';
import {Dropdown, OrderInput} from '../';
import {Button, CryptoIcon} from '../../atoms';
import {FormType, OnSubmitCallback} from '../Order/Order';

type DropdownElem = number | string | React.ReactNode;

interface OrderFormProps {
    /**
     * Fee that is applied during total order amount calculation
     */
    fee: number;
    /**
     * Price that is applied during total order amount calculation
     */
    priceMarket: number;
    /**
     * Type of form, can be 'buy' or 'cell'
     */
    type: FormType;
    /**
     * Callback that is called when form is submitted
     */
    onSubmit: OnSubmitCallback;
    /**
     * Available types of order
     */
    orderTypes: DropdownElem[];
    /**
     * Additional class name. By default element receives `cr-order` class
     * @default empty
     */
    className?: string;
    /**
     * Name of currency for price field
     */
    from: string;
    /**
     * Name of currency for amount field
     */
    to: string;
    /**
     * Amount of money in a wallet
     */
    available?: number;
    /**
     * Whether order is disabled to execute
     */
    disabled?: boolean;
}

interface OrderFormState {
    orderType: string | React.ReactNode;
    price: string;
    amount: string;
}

class OrderForm extends React.Component<OrderFormProps, OrderFormState> {
    constructor(props: OrderFormProps) {
        super(props);
        this.state = {
            amount: '',
            orderType: 'Limit',
            price: '',
        };
    }

    public render() {
        const {
            disabled,
            type,
            fee,
            orderTypes,
            className,
            priceMarket,
            from,
            to,
            available,
        } = this.props;
        const {amount, price, orderType} = this.state;
        const safeAmount = Number(amount) || 0;
        const safePrice = Number(price) || 0;
        const total = orderType === 'Market'
            ? safeAmount * priceMarket : safeAmount * safePrice;

        const cx = classnames('cr-order-form', className);
        const currencyCodeFrom = `${from.toUpperCase()}-alt`;

        return (
            <div className={cx}>
                <div className="cr-order-item">
                    <label className="cr-order-item__label">Order Type</label>
                    <div className="cr-order-item__content">
                        <Dropdown
                            list={orderTypes}
                            onSelect={this.handleOrderTypeChange}
                        />
                    </div>
                </div>
                {orderType === 'Limit' ? (
                    <div className="cr-order-item">
                        <label className="cr-order-item__label">Price</label>
                        <div className="cr-order-item__content">
                            <OrderInput
                                currency={from}
                                value={price || ''}
                                handleChangeValue={this.handlePriceChange}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="cr-order-item">
                        <label className="cr-order-item__label">Price</label>
                        <div className="cr-order-item__content">
                            <div className="cr-order-input">
                                <div className="cr-order-input__crypto-icon">
                                    <CryptoIcon code={currencyCodeFrom}>{from.toUpperCase()}</CryptoIcon>
                                </div>
                                <div className="cr-order-input__input">
                                    <span className="cr-order-input__price">{priceMarket}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="cr-order-item">
                    <label className="cr-order-item__label">Amount</label>
                    <div className="cr-order-item__content">
                        <OrderInput
                            currency={to}
                            value={amount || ''}
                            handleChangeValue={this.handleAmountChange}
                        />
                    </div>
                </div>
                <div className="cr-order-item cr-order-item__total">
                    <label className="cr-order-item__label">Total</label>
                    <div className="cr-order-item__content">
                        {this.convertTotal(total)} <span className="cr-order-item__available-currency">{from.toUpperCase()}</span>
                    </div>
                </div>
                <div className="cr-order-item cr-order-item__total">
                    <label className="cr-order-item__label">Available</label>
                    <div className="cr-order-item__content">
                        { available ?
                            <div className="cr-order-item__available">
                                <span className="cr-order-item__available">
                                    {this.convertToAvailable(available, total)} <span className="cr-order-item__available-currency">{from.toUpperCase()}</span>
                                </span>
                            </div> :
                        null }
                    </div>
                </div>
                <div className="cr-order-item cr-order-item__total">
                    <label className="cr-order-item__label">Estimated fee</label>
                    <div className="cr-order-item__content">
                        { fee ?
                            <div className="cr-order-item__available">
                               { type === 'buy' ? (
                                  <span className="cr-order-item__available">
                                    {fee} <span className="cr-order-item__available-currency">{to.toUpperCase()}</span>
                                  </span>
                                ) : (
                                  <span className="cr-order-item__available">
                                    {fee} <span className="cr-order-item__available-currency">{from.toUpperCase()}</span>
                                  </span>
                                )
                               }
                            </div> :
                        null }
                    </div>
                </div>
                <Button
                    disabled={disabled}
                    label={type}
                    noMargin={true}
                    onClick={this.handleSubmit}
                />
            </div>
        );
    }

    private convertTotal(total: number, fractionDigit = 6) {
        return +Number(total).toFixed(fractionDigit);
    }

    private convertToAvailable(balance: number, value: number) {
        if (balance && !value) {
            return this.convertTotal(balance);
        }

        const delta = balance - value;
        return delta >= 0 ? this.convertTotal(delta) : 0;
    }

    private handleAmountChange = (text: string) => {
        this.checkValue(text, 'amount');
    };

    private changeState = (type: string, value: string) => {
        if (type === 'price') {
            this.setState({
                price: value,
            });
            return;
        }
        this.setState({
            amount: value,
        });
    };

    private checkValue = (text: string, type: string) => {
        const convertedText = text
            .replace(',', '.')
            .replace('-', '');
        const isDotFirst = convertedText[0] === '.';

        if (isDotFirst) {
            this.changeState(type, '0.');
            return;
        }

        const condition = new RegExp('^(?:[\\d-]*\\.?[\\d-]*|[\\d-]*\\.[\\d-])$');

        if (convertedText.match(condition)) {
            this.changeState(type, convertedText);
        }
    };

    private handlePriceChange = (text: string) => {
        this.checkValue(text, 'price');
    };

    private handleOrderTypeChange = (index: number) => {
        const {orderTypes} = this.props;
        this.setState({
            orderType: orderTypes[index],
        });
    };

    private handleSubmit = () => {
        const {type, priceMarket} = this.props;
        const {amount, orderType, price} = this.state;

        const order = {
            type,
            price: orderType === 'Market' ? priceMarket : price,
            orderType,
            amount,
        };

        this.props.onSubmit(order);
        this.setState({
            price: orderType === 'Market' ? String(priceMarket) : '',
            amount: '',
        });
    };
}


export {
    OrderForm,
    OrderFormProps,
    OrderFormState,
};
