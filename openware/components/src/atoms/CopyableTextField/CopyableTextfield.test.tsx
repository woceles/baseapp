import { shallow } from 'enzyme';
import * as React from 'react';
import { SinonStub, stub } from 'sinon';
import * as uuid from 'uuid';
import { CopyableTextField, CopyableTextFieldProps } from './CopyableTextField';

const ID = '0xdeadbeef';
const defaultProps: CopyableTextFieldProps = {
    value: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4dfE',
    fieldId: 'copy_id',
};

const setup = (props: Partial<CopyableTextFieldProps> = {}) =>
    shallow(<CopyableTextField {...{ ...defaultProps, ...props }} />);

describe('CopyableTextField', () => {
    let uuidMock: SinonStub;

    beforeAll(() => {
        uuidMock = stub(uuid, 'v4').returns(ID);
    });

    afterAll(() => {
        uuidMock.reset();
    });

    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('cr-copyable-text-field')).toBeTruthy();
    });

    it('should render 1 input tag', () => {
        const wrapper = setup();
        const input = wrapper.find('input');
        expect(input.length).toBe(1);
    });

    it('should render 3 divs', () => {
        const wrapper = setup();
        const divs = wrapper.find('div');
        // tslint:disable-next-line:no-magic-numbers
        expect(divs.length).toBe(3);
    });

    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it('should render correct className for input field', () => {
        const wrapper = setup();
        expect(wrapper.find('div').get(1).props.className)
            .toContain('cr-copyable-text-field__input');
    });

    it('should render correct className for clickable block', () => {
        const wrapper = setup();
        const { className } = wrapper.find('div').last().props();
        expect(className).toContain('cr-copyable-text-field__button');
    });
});
