import * as React from 'react';
import { FormType, OnSubmitCallback } from '../Order/Order';
declare type DropdownElem = number | string | React.ReactNode;
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
declare class OrderForm extends React.Component<OrderFormProps, OrderFormState> {
    constructor(props: OrderFormProps);
    render(): JSX.Element;
    private convertTotal;
    private convertToAvailable;
    private handleAmountChange;
    private changeState;
    private checkValue;
    private handlePriceChange;
    private handleOrderTypeChange;
    private handleSubmit;
}
export { OrderForm, OrderFormProps, OrderFormState, };
