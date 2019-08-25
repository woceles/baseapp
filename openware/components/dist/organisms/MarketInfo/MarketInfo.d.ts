import * as React from 'react';
interface MarketInfoValues {
    lastTradePrice: number;
    lastTradeCurrency: string;
    hourPrice: number;
    hourPriceChange: string;
    hourValue: number;
    hourValueCurrency: string;
}
interface MarketInfoProps {
    /**
     *  By default class name 'cr-sign-in-form'
     *  This property gives an additional class name
     */
    className?: string;
    /**
     * Platform market pairs for markets dropdown
     */
    marketPairs: string[];
    /**
     *  Market values for all market pairs
     */
    marketValues: MarketInfoValues[];
}
interface MarketInfoState {
    currentValues: MarketInfoValues;
}
declare class MarketInfo extends React.Component<MarketInfoProps, MarketInfoState> {
    constructor(props: MarketInfoProps);
    render(): JSX.Element;
    private onMarketChange;
}
export { MarketInfo, MarketInfoProps, MarketInfoValues, MarketInfoState, };
