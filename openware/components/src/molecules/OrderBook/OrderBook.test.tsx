import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { CellData } from '../Table/Table';
import {  mapValues, OrderBook, OrderBookProps } from './OrderBook';

const data: CellData[][] = [
    ['12349', '14', '12'],
    ['12349', '14', '1211'],
    ['12349', '14', '124'],
    ['12349', '14', '121'],
    ['12349', '14', '1991'],
];

const headers = ['Total', 'Amount', 'Price'];
const title = 'Bids';

const defaultProps: OrderBookProps = {
    data,
    headers,
    title,
};

const setup = (props: Partial<OrderBook> = {}) =>
    shallow(<OrderBook {...{ ...defaultProps, ...props }} />);

describe('History', () => {
    let wrapper: ShallowWrapper<History>;

    beforeEach(() => {
        wrapper = setup();
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should return correct data', () => {
        // tslint:disable-next-line:no-magic-numbers
        const orderEntry = [1, 0.2, 3, 2, 0.5];
        const maxVolume = 3;

        const expectedData = [
            { value: 6.666666666666667 },
            { value: 16.666666666666664 },
            { value: 33.33333333333333 },
            { value: 66.66666666666666 },
            { value: 100 },
        ];

        const result = mapValues(maxVolume, orderEntry);
        expect(result).toEqual(expectedData);
    });
});
