import { mount } from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { QRCode } from './QRCode';

describe('QRCode', () => {
    describe('#render', () => {
        it('uses medium size by default', () => {
            const mdSize = '118x118';
            const wrapper = mount(
                <QRCode data={'avervr24v'} />,
            );
            const { src } = wrapper.find('img').first().props();
            expect(src).toContain(mdSize);
        });

        it('uses medium size if size prop is md', () => {
            const mdSize = '118x118';
            const wrapper = mount(
                <QRCode data={'avervr24v'} dimensions={'md'} />,
            );
            const { dimensions } = wrapper.props();
            const { src } = wrapper.find('img').first().props();
            expect(src).toContain(mdSize);
            expect(dimensions).toBe('md');
        });

        it('should contain default props', () => {
            const text = 'data';
            const size = '118x118';
            const alternative = 'some text';
            const wrapper = mount(
                <QRCode data={text} dimensions={size} alt={alternative} />,
            );
            expect(wrapper.props().data).toEqual(text);
            expect(wrapper.props().dimensions).toEqual(size);
            expect(wrapper.props().alt).toEqual(alternative);
        });

        it('renders correctly data with empty spaces', () => {
            const address = 'wallet address';
            const wrapper = mount(
                <QRCode data={address} dimensions="sm" />,
            );
            const { src } = wrapper.find('img').first().props();
            expect(src).toContain(encodeURI(address));
        });

        it('renders correctly', () => {
            const tree = renderer
                .create(
                    <QRCode data="sevaerverv343" dimensions="sm" />,
                )
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
