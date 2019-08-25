import { shallow } from 'enzyme';
import * as React from 'react';
import { OrderInput, OrderInputProps } from './OrderInput';

const defaultProps: OrderInputProps = {
    currency: 'eth',
    handleChangeValue: () => undefined,
    value: '',
};

const setup = (props: Partial<OrderInputProps> = {}) =>
    shallow(<OrderInput {...{ ...defaultProps, ...props }} />);

describe('InputBlock', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('cr-order-input')).toBeTruthy();
    });

    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it('should set correct currency code to the child components', () => {
        const wrapper = setup();
        const { children } = wrapper.find('CryptoIcon').props();
        expect(children).toContain('ETH');
    });
});
