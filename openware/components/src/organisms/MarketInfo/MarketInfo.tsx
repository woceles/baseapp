import classnames from 'classnames';
import * as React from 'react';

import { HeaderItem } from '../../atoms/index';
import { Dropdown } from '../../molecules/index';

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

class MarketInfo extends React.Component<MarketInfoProps,MarketInfoState> {
    constructor(props: MarketInfoProps) {
        super(props);
        this.state = {
          currentValues: props.marketValues[0],
        };
    }

    public render() {
        const { currentValues } = this.state;

        const { marketPairs, className } = this.props;

        const cx = classnames('cr-market-info',className);

        const changeMarket = (selected: number) => this.onMarketChange(selected);

        return (
            <nav className={cx}>
              <div className="cr-market-dropdown">
                <Dropdown className="cr-market-info__pairs-dropdown" list={marketPairs} onSelect={changeMarket}/>
              </div>
              <div className="cr-market-info__values">
                <HeaderItem className="cr-market-info__values-item" label="Last trade price" amount={currentValues.lastTradePrice} currency={currentValues.lastTradeCurrency}/>
                <HeaderItem className="cr-market-info__values-item" label="24 hour price" amount={currentValues.hourPrice} sign={currentValues.hourPriceChange}/>
                <HeaderItem className="cr-market-info__values-item" label="24 hour value" amount={currentValues.hourValue} currency={currentValues.hourValueCurrency}/>
              </div>
            </nav>
        );
    }

    private onMarketChange = (index: number) => {
        const { marketValues } = this.props;

        this.setState({
            currentValues: marketValues[index],
        });
    }
}

export {
    MarketInfo,
    MarketInfoProps,
    MarketInfoValues,
    MarketInfoState,
};
