import { shallow } from 'enzyme';
import * as React from 'react';
// import { HeaderItem } from '../../atoms/HeaderItem/HeaderItem';
import { MarketInfo, MarketInfoProps } from './MarketInfo';


const defaultProps: MarketInfoProps = {
    marketPairs: [
        'BTC/USDT',
        'EUR/USDT',
    ],

    marketValues: [
        {
          lastTradePrice: 9168.2,
          lastTradeCurrency: 'usdt',
          hourPrice: 10.05,
          hourPriceChange: '+',
          hourValue: 2.345,
          hourValueCurrency: 'btc',
        },
        {
          lastTradePrice: 5364.2,
          lastTradeCurrency: 'usdt',
          hourPrice: 19.05,
          hourPriceChange: '+',
          hourValue: 7.265,
          hourValueCurrency: 'eur',
        },
    ],
};

const setup = (props: Partial<MarketInfoProps> = {}) =>
    shallow(<MarketInfo {...{ ...defaultProps, ...props }} />);

describe('MarketInfo', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('cr-market-info')).toBeTruthy();
    });

    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it('should change market values on select', () => {
        const wrapper = setup();
        wrapper.props().children[0].props.children.props.onSelect(1);
        expect(wrapper.props().children[1].props.children[0].props.amount).toEqual(defaultProps.marketValues[1].lastTradePrice);
    });
});
