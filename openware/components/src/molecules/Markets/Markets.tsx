import * as React from 'react';
import { FilterInput } from '../';
import { CellData, Table } from '../Table/Table';

interface MarketsProps {
    /**
     * List of markets data
     */
    data: CellData[][];
    /**
     * Callback that is called when a market is selected
     */
    onSelect: (marketIndex: number) => void;
    /**
     * Defines whether to show filters or not
     * @default true
     */
    filters?: boolean;
}

interface MarketsState {
    /**
     * Keeps filtered data
     */
    filteredData: CellData[][];
}

class Markets extends React.Component<MarketsProps, MarketsState> {
    constructor(props: MarketsProps) {
        super(props);

        this.state = {
            filteredData: props.data,
        };
    }

    private headers: string[] = ['Pair', 'Price'];
    private title = 'Markets';

    public componentWillReceiveProps(nextProps: MarketsProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                filteredData: nextProps.data,
            });
        }
    }

    public render() {
        const { filteredData } = this.state;
        const { filters = true } = this.props;
        const tableData = filteredData.length > 0
            ? filteredData
            : [['', '']];

        return (
            <div className="cr-markets">
                <Table
                    data={tableData}
                    filters={filters ? this.filters : []}
                    header={this.headers}
                    onSelect={this.props.onSelect}
                    titleComponent={this.title}
                />
                <FilterInput
                    data={this.props.data}
                    onFilter={this.handleFilter}
                    filter={this.searchFilter}
                />
            </div>
        );
    }

    public searchFilter = (row: CellData[], searchKey: string) => {
        return (row[0] as string).toLowerCase().includes(searchKey.toLowerCase());
    }

    public handleFilter = (result: object[]) => {
        this.setState({
            filteredData: [...result] as CellData[][],
        });
    }

    private filterType = (headerKey: string, searchKey: string) => (item: CellData[]) => {
        const typeIndex = this.headers.indexOf(headerKey);
        return (item[typeIndex] as string).includes(searchKey);
    };

    private get filters() {
        const { data } = this.props;

        const currencyFilters = data && data.length > 0
            ? this.props.data
                .map(this.getMarketFromDataRow)
                .reduce(this.createUniqueCurrencies, [])
                .map(this.transformCurrencyToFilter)
            : [];

        return [
            {
                name: 'All',
                filter: this.filterType('Pair', ''),
            },
            ...currencyFilters,
        ];
    }

    private getMarketFromDataRow = (market: React.ReactNode[]) => market[0] as string;

    private createUniqueCurrencies(currencies: string[], market: string) {
        const isCurrencyUnique = (currency: string) => !currencies.includes(currency);

        const marketCurrencies = market.split('/').map((c: string) => c.trim());
        const uniqueCurrencies = marketCurrencies.filter(isCurrencyUnique);

        return currencies.concat(uniqueCurrencies);
    }

    private transformCurrencyToFilter = (currency: string) => ({
        name: currency,
        filter: this.filterType('Pair', currency),
    });
}

export {
    Markets,
    MarketsProps,
    MarketsState,
};
