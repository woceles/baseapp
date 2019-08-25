import * as React from 'react';
import { CellData } from '../Table/Table';
interface HistoryProps {
    /**
     * List of history data
     */
    data: CellData[][];
    /**
     * List of headers for history table
     */
    headers?: string[];
}
declare class History extends React.PureComponent<HistoryProps> {
    private defaultHeaders;
    private title;
    render(): JSX.Element;
    renderAction(actionType: string): JSX.Element;
    private mapRows;
}
export { History, HistoryProps, };
