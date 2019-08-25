import { shallow } from 'enzyme';
import * as React from 'react';
import { Avatar, AvatarProps } from './Avatar';

const defaultProps: AvatarProps = {
  source: undefined,
  title: 'KE',
};

const setup = (props: Partial<AvatarProps> = {}) =>
  shallow(<Avatar {...{ ...defaultProps, ...props }} />);

describe('Avatar', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct className', () => {
    const wrapper = setup();
    expect(wrapper.hasClass('cr-avatar')).toBeTruthy();
  });

  it('should pass along supplied className', () => {
    const className = 'some-class';
    const wrapper = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });

  it('should render correct component depends on props', () => {
    let wrapper = setup();
    let images = wrapper.find('img');
    expect(images.length).toBe(0);
    wrapper = setup({source: 'source'});
    images = wrapper.find('img');
    expect(images.length).toBe(1);
  });
});
