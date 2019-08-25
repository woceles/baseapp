import { shallow } from 'enzyme';
import * as React from 'react';
import { SinonSpy, spy } from 'sinon';
import { Button } from '../../atoms';
import { FormType, orderTypes } from '../Order/Order';
import { OrderForm, OrderFormProps } from './OrderForm';

const defaultProps = {
    fee: 1,
    onSubmit: spy(),
    orderTypes,
    type: 'buy' as FormType,
    priceMarket: 5,
    from: 'btc',
    to: 'eth',
};

const setup = (props: Partial<OrderFormProps> = {}) =>
    shallow(<OrderForm {...{ ...defaultProps, ...props }} />);

describe('OrderForm', () => {
    it('should match snapshot', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('cr-order-form')).toBeTruthy();
    });

    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it('should render submit button', () => {
        let wrapper = setup();
        let submitButton = wrapper.find(Button);
        expect(submitButton.props().label.toLowerCase()).toBe('buy');

        wrapper = setup({ type: 'sell' });
        submitButton = wrapper.find(Button);
        expect(submitButton.props().label.toLowerCase()).toBe('sell');
    });

    it('should call onSubmit callback', () => {
        let wrapper = setup();
        const onSubmit: SinonSpy = spy();
        wrapper = setup({ onSubmit });
        const amount = '4';
        const price = '10';
        const nextState = { amount: '4', price: '10' };
        wrapper.setState(nextState);

        const submitButton = wrapper.find(Button);
        submitButton.simulate('click');

        expect(onSubmit.calledOnceWith({type: 'buy', orderType: 'Limit', price, amount})).toBeTruthy();
    });
});
