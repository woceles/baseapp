import * as React from 'react';
import { OrderForm, TabPanel } from '../';

export type FormType = 'buy' | 'sell';

export type DropdownElem = number | string | React.ReactNode;

export interface OrderProps {
    type: FormType;
    orderType: string | React.ReactNode;
    price: number | string;
    amount: number | string;
}

export type OnSubmitCallback = (order: OrderProps) => void;

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

const orderTypes: DropdownElem[] = [
    'Limit',
    'Market',
];

class Order extends React.PureComponent<OrderComponentProps> {
    public render() {
        return (
            <div className="cr-order">
                <TabPanel fixed={true} panels={this.getPanels()} onTabChange={this.handleChangeTab}/>
            </div>
        );
    }

    private getPanels = () => {
        const {
            available,
            disabled,
            feeBuy,
            feeSell,
            priceMarketBuy,
            priceMarketSell,
            from,
            to,
        } = this.props;
        return [
            {
                content: (
                    <OrderForm
                        disabled={disabled}
                        fee={feeBuy}
                        type="buy"
                        from={from}
                        to={to}
                        available={available}
                        priceMarket={priceMarketBuy}
                        onSubmit={this.props.onSubmit}
                        orderTypes={orderTypes}
                    />
                ),
                label: 'Buy',
            },
            {
                content: (
                    <OrderForm
                        fee={feeSell}
                        type="sell"
                        from={from}
                        to={to}
                        available={available}
                        priceMarket={priceMarketSell}
                        onSubmit={this.props.onSubmit}
                        orderTypes={orderTypes}
                    />
                ),
                label: 'Sell',
            },
        ];
    };

    private handleChangeTab = (index: number, label?: string) => {
        if (this.props.handleSendType && label) {
          this.props.handleSendType(index, label);
        }
    }
}

export {
    Order,
    orderTypes,
};
