import { shallow } from 'enzyme';
import * as React from 'react';
import { HeaderItem, HeaderItemProps } from './HeaderItem';

const defaultProps: HeaderItemProps = {
    amount: 12.1,
    label: '24 hour price',
    currency: 'btc',
};

const setup = (props: Partial<HeaderItemProps> = {}) =>
    shallow(<HeaderItem {...{ ...defaultProps, ...props }} />);

describe('HeaderItem', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('cr-header-item')).toBeTruthy();
    });

    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it('should render correct label', () => {
        const wrapper = setup();
        const { className } = wrapper.find('div').last().props();
        expect(className).toContain('cr-header-item__label');
    });

    it('should render correctly with currency', () => {
        const wrapper = setup();
        expect(wrapper.find('div').get(1).props.className)
            .toContain('cr-header-item__amount-default');
    });

    it('should render correctly with plus sign', () => {
        const wrapper = setup({currency: undefined, sign: '+'});
        expect(wrapper.find('div').get(1).props.className)
            .toContain('cr-header-item__amount-plus');
    });

    it('should render correctly with minus sign', () => {
        const wrapper = setup({currency: undefined, sign: '-'});
        expect(wrapper.find('div').get(1).props.className)
            .toContain('cr-header-item__amount-minus');
    });

    it('should render correctly without currency', () => {
        const wrapper = setup({currency: undefined});
        expect(wrapper.props().children[0].props.children[0]).toEqual(undefined);
    });

});
