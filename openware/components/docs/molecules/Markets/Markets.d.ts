import * as React from 'react';
import { CellData } from '../Table/Table';
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
declare class Markets extends React.Component<MarketsProps, MarketsState> {
    constructor(props: MarketsProps);
    private headers;
    private title;
    componentWillReceiveProps(nextProps: MarketsProps): void;
    render(): JSX.Element;
    searchFilter: (row: React.ReactNode[], searchKey: string) => boolean;
    handleFilter: (result: object[]) => void;
    private filterType;
    private readonly filters;
    private getMarketFromDataRow;
    private createUniqueCurrencies;
    private transformCurrencyToFilter;
}
export { Markets, MarketsProps, MarketsState, };
