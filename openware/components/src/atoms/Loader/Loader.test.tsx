import { shallow } from 'enzyme';
import * as React from 'react';
import { Loader } from './Loader';

describe('Loader', () => {
    it('should render', () => {
        const wrapper = shallow(<Loader />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className', () => {
        const wrapper = shallow(<Loader />);
        expect(wrapper.hasClass('cr-loader')).toBeTruthy();
    });

    it('should have correct size', () => {
        const wrapper = shallow(<Loader />);
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.props().children.props.height).toEqual(30);
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.props().children.props.width).toEqual(30);
    });

    it('should have correct className and size with another props', () => {
        const wrapper = shallow(<Loader {...{size: 45, className: 'test'}}/>);
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.props().children.props.height).toEqual(45);
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.props().children.props.width).toEqual(45);
        expect(wrapper.hasClass('cr-loader test')).toBeTruthy();
    });
});
