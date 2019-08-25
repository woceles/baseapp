import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { CellData } from '../Table/Table';
import { Markets, MarketsProps, MarketsState } from './Markets';

const data: CellData[][] = [
    ['ETH / BTC', '0.223100'],
    ['ETH / LTC', '0.223100'],
    ['LTC / BTC', '0.223100'],
];
const onSelect = spy();

const defaultProps: MarketsProps = {
    data,
    onSelect,
};

const setup = (props?: Partial<MarketsProps>) =>
    shallow(<Markets {...{ ...defaultProps, ...props }} />);

describe('Markets', () => {
   let wrapper: ShallowWrapper;

   beforeEach(() => {
      wrapper = setup();
   });

   it('should render', () => {
       expect(wrapper).toMatchSnapshot();
   });

   it('should render empty data', () => {
       wrapper = setup({ data: [] });
       expect(wrapper).toMatchSnapshot();
   });

   it('should correctly filter rows', () => {
       expect((wrapper.instance() as Markets).searchFilter(['ETH / BTC', '0.123'], 'btc')).toBeTruthy();
       expect((wrapper.instance() as Markets).searchFilter(['ETH / BTC', '0.342'], 'ltc')).toBeFalsy();
   });

   it('should set filtered data to state', () => {
      const component: ReactWrapper = mount(
          <Markets data={data} onSelect={onSelect} />,
      );

      const filteredData: CellData = [
          ['ETH / BTC', '0.123'],
      ];

      (component.instance() as Markets).handleFilter(filteredData as object[]);

      expect((component.state() as MarketsState).filteredData).toEqual(filteredData);
   });

   it('should set new data to state', () => {
       const component: ReactWrapper = mount(
           <Markets data={data} onSelect={onSelect} />,
       );

       const filteredData: CellData = [
           ['ETH / BTC', '0.123'],
       ];

       component.setProps({ data: filteredData });
       expect((component.state() as MarketsState).filteredData).toEqual(filteredData);
   });
});
