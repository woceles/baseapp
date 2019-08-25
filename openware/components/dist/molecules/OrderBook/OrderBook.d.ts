import * as React from 'react';
import { CellData } from '../Table/Table';
interface OrderBookProps {
    /**
     * Data which is used to render Table.
     */
    data: CellData[][];
    /**
     * Max value of volume which is used to calculate width of background row
     */
    maxVolume?: number;
    /**
     * Data which is used to calculate width of each background row
     */
    orderBookEntry?: number[];
    /**
     * Defines a position of background row
     */
    side?: 'left' | 'right';
    /**
     * Renders table header
     */
    headers?: string[];
    /**
     * Renders table title
     */
    title?: React.ReactNode;
    /**
     * Sets row background color
     */
    rowBackgroundColor?: string;
}
export declare const mapValues: (maxVolume?: number | undefined, data?: number[] | undefined) => {
    value: number;
}[];
declare class OrderBook extends React.PureComponent<OrderBookProps> {
    render(): JSX.Element;
}
export { OrderBook, OrderBookProps, };
