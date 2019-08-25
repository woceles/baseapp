import * as React from 'react';
export declare type FormType = 'buy' | 'sell';
export declare type DropdownElem = number | string | React.ReactNode;
export interface OrderProps {
    type: FormType;
    orderType: string | React.ReactNode;
    price: number | string;
    amount: number | string;
}
export declare type OnSubmitCallback = (order: OrderProps) => void;
export interface OrderComponentProps {
    /**
     * Amount of money in a wallet
     */
    available?: number;
    /**
     * Payment fee that is used in total price calculation
     */
    feeBuy: number;
    /**
     * Payment fee that is used in total price calculation
     */
    feeSell: number;
    /**
     * Callback which is called when a form is submitted
     */
    onSubmit: OnSubmitCallback;
    /**
     * If orderType is 'Limit' this value will be used as price for buy tab
     */
    priceMarketBuy: number;
    /**
     * If orderType is 'Limit' this value will be used as price for sell tab
     */
    priceMarketSell: number;
    /**
     * Name of currency for price field
     */
    from: string;
    /**
     * Name of currency for amount field
     */
    to: string;
    /**
     * Whether order is disabled to execute
     */
    disabled?: boolean;
    handleSendType?: (index: number, label: string) => void;
}
declare const orderTypes: DropdownElem[];
declare class Order extends React.PureComponent<OrderComponentProps> {
    render(): JSX.Element;
    private getPanels;
    private handleChangeTab;
}
export { Order, orderTypes, };
