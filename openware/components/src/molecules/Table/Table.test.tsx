import {mount, shallow} from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import {CellData, Table} from './Table';

describe('Table', () => {
    describe('#render', () => {
        const header = ['Price', 'Type', 'Volume'];
        const data = [
            ['0', 'Sell', '0.1'],
            ['0', 'Buy', '0.1'],
            ['0', 'Buy', '0.1'],
            ['0', 'Sell', '0.1'],
            ['0', 'Buy', '0.1'],
            ['0', 'Sell', '0.1'],
        ];
        const headerIndex = header.indexOf('Type');
        const filterMethod = (type: string) => (value: CellData[]) => value[headerIndex] === type;

        // tslint:disable-next-line
        const filters: any = [
            {
                name: 'Bids',
                filter: filterMethod('Buy'),
            },
            {
                name: 'Asks',
                filter: filterMethod('Sell'),
            },
            {
                name: 'All',
                filter : () => true,
            },
        ];

        it('always renders a table', () => {
            const wrapper = mount(<Table header={header} data={data} />);
            const table = wrapper.find('table');
            const head = wrapper.find('thead');
            const body = wrapper.find('tbody');
            expect(table.length).toBe(1);
            expect(head.length).toBe(1);
            expect(body.length).toBe(1);
        });

        it('uses table styles by default', () => {
            const tableClassName = 'cr-table';
            const wrapper = mount(<Table data={data} />);
            const { className } = wrapper.find('table').props();
            expect(className).toContain(tableClassName);
        });

        it('render thead styles by default', () => {
            const tableHeadClassName = 'cr-table__head';
            const wrapper = mount(<Table header={header} data={data} />);
            const { className } = wrapper.find('thead').props();
            expect(className).toContain(tableHeadClassName);
        });

        it('render tbody styles by default', () => {
            const tableBodyClassName = 'cr-table__body';
            const wrapper = mount(<Table data={data} />);
            const { className } = wrapper.find('tbody').props();
            expect(className).toContain(tableBodyClassName);
        });

        it('should render thead from header props array', () => {
            const wrapper = mount(<Table header={header} data={data} />);
            const thElements = wrapper.find('thead').find('th');
            expect(thElements.length).toBe(data[0].length);
        });

        it('Check invalid data', () => {
            const fakeData = [
                ['Price', 'Time', 'Volume'],
                ['0', '12:20', '12', 'fake'],
            ];
            const wrapper = () => { mount(<Table data={fakeData} />); };
            expect(wrapper).toThrowError();

        });

        it('should filter data due to passed filters', () => {
            const resultData = data.filter(filterMethod('Buy'));

            const wrapper = mount(<Table filters={filters} header={header} data={data} />);
            const tbElements = wrapper.find('.cr-table__head-row').first().children();


            expect(tbElements.length).toBe(resultData.length);

        });

        it('should filter data according to clicked filter', () => {
            const wrapper = mount(<Table filters={filters} header={header} data={data} />);
            const resultData = data.filter(filterMethod('Sell'));
            const filterButton = wrapper.find('.cr-table__filter').at(1);
            filterButton.simulate('click');

            // tslint:disable-next-line
            const state: any = wrapper.state();

            expect(state.resultData.length).toBe(resultData.length);
        });

        it('should render selected row', () => {
            const onSelect = spy();
            const wrapper = mount(
                <Table
                    filters={filters}
                    header={header}
                    data={data}
                    onSelect={onSelect}
                />,
            );

            wrapper.find('tbody tr').at(1).simulate('click');
            expect(onSelect.calledOnceWith(1));

            const selectedRow = wrapper.find('tbody tr').at(1);
            expect(selectedRow.hasClass('cr-table__row--selected')).toBeTruthy();
        });

        it('should render the same length of background rows as data', () => {
            const fullWidth = 100;
            const renderRowBackground = (i: number) => ({ width: `${i * fullWidth}%` });
            const wrapper = shallow(<Table rowBackground={renderRowBackground} data={data} />);

            const backgroundRows = wrapper.find('.cr-table-background__row');
            expect(backgroundRows).toHaveLength(data.length);
        });
    });
});
