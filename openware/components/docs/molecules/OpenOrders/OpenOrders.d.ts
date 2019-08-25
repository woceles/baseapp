import * as React from 'react';
import { CellData } from '../Table/Table';
declare type OnCancelCallback = (index: number) => void;
interface OpenOrdersProps {
    /**
     * List of open orders, takes order side ('buy' | 'sell') as last element of a row
     */
    data: CellData[][];
    /**
     * Callback that is called when cancel button of order row is clicked
     */
    onCancel: OnCancelCallback;
    /**
     * List of headers for open orders table
     */
    headers?: React.ReactNode[];
    /**
     * toggleByOrderType function
     */
    function?: () => void;
}
declare class OpenOrders extends React.Component<OpenOrdersProps> {
    private defaultHeaders;
    render(): JSX.Element;
    renderCell: (rowIndex: number) => (cell: React.ReactNode, index: number, row: React.ReactNode[]) => {} | null | undefined;
    renderRow: (row: React.ReactNode[], index: number) => ({} | null | undefined)[];
    renderAction(actionType: string): JSX.Element;
    renderOrder(orderType: string): JSX.Element;
    renderCancelButton: (index: number) => JSX.Element;
    private handleCancel;
}
export { OnCancelCallback, OpenOrders, OpenOrdersProps, };
