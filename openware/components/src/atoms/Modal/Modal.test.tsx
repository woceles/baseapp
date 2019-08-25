import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import { Button } from '../';
import { Modal, ModalProps } from './Modal';

const defaults: ModalProps = {
    show: true,
    header: <div>Title</div>,
    content: <div>Some content</div>,
    footer: <Button label={'Ok'} onClick={jest.fn()} />,
};

const setup = (props: Partial<ModalProps> = {}) =>
    shallow(<Modal {...{ ...defaults, ...props }} />);

describe('Basic Modal', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className', () => {
        expect(wrapper.hasClass('cr-modal')).toBeTruthy();
    });

    it('should pass along supplied className', () => {
        const className = 'new-class';
        const wrapper = setup({ className });//tslint:disable-line
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it('should render 1 div', () => {
        const divs = wrapper.find('div');
        expect(divs.length).toBe(7);//tslint:disable-line
    });

    it('should render 1 button', () => {
        const btn = wrapper.find('Button');
        expect(btn.length).toBe(1);
    });
});
