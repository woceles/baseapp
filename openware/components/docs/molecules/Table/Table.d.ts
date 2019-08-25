import * as React from 'react';
declare type CellData = string | number | React.ReactNode | undefined;
interface Filter {
    name: string;
    filter: (cell: CellData[]) => boolean;
}
interface TableState {
    /**
     * Selected filter
     */
    activeFilter?: string;
    /**
     * Filtered data
     */
    resultData?: CellData[][];
    /**
     * Index of selected row
     */
    selectedRowIndex?: number;
}
interface TableProps {
    /**
     * Data which is used to render Table. The first element
     * of array is used to render table head unless `noHead`
     * is true. the rest is used to render Table body.
     *
     * All the elements of an array should have the same length.
     */
    data: CellData[][];
    /**
     * Renders table head.
     */
    header?: React.ReactNode[];
    /**
     *  Pair name & filter is used to filter table data depending on a filter
     */
    filters?: Filter[];
    /**
     * Callback called when a row is selected
     */
    onSelect?: (index: number) => void;
    /**
     * Header which is displayed above the table
     */
    titleComponent?: React.ReactNode;
    /**
     * Defines whether row background shows or not, and calculates width of it
     */
    rowBackground?: (row: number) => React.CSSProperties;
    /**
     * Defines from what side row background starts `(left, right)`
     * @default 'left'
     */
    side?: 'left' | 'right';
    /**
     * Sets row background color
     */
    rowBackgroundColor?: string;
}
/**
 * Cryptobase Table overrides default table
 */
declare class Table extends React.Component<TableProps, TableState> {
    constructor(props: TableProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: TableProps): void;
    render(): JSX.Element;
    private renderTitleComponent;
    private static renderRowCells;
    private handleFilter;
    private handleSelect;
    private renderFilters;
    private renderHead;
    private renderRowBackground;
    private renderBackground;
    private renderBody;
    private ensureDataIsValid;
}
export { CellData, Table, TableProps, TableState, Filter, };
