import { shallow } from 'enzyme';
import * as React from 'react';
import { Checkbox, CheckboxProps } from './Checkbox';

const defaultProps: CheckboxProps = {
  disabled: false,
  label: 'text',
};

const setup = (props: Partial<CheckboxProps> = {}) =>
  shallow(<Checkbox {...{ ...defaultProps, ...props }} />);

describe('Checkbox', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct className', () => {
    const wrapper = setup();
    expect(wrapper.hasClass('cr-checkbox')).toBeTruthy();
  });

  it('should pass along supplied className', () => {
    const className = 'some-class';
    const wrapper = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });

  it('should have correct className when disabled is true', () => {
    const wrapper = setup({disabled: true});
    expect(wrapper.hasClass('cr-checkbox__disabled')).toBeTruthy();
  });

  it('checkitem element should have correct class', () => {
    const wrapper = setup();
    const { className } = wrapper.find('span').first().props();
    expect(className).toContain('cr-checkbox__checkitem');
  });

  it('checkitem element should have correct class', () => {
    const wrapper = setup();
    const labelProps = wrapper.find('span').last().props();
    const { children } = labelProps;
    const { className } = labelProps;
    expect(children).toContain('text');
    expect(className).toContain('cr-checkbox__label');
  });
});
