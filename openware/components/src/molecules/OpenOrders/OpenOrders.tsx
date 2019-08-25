import classnames from 'classnames';
import * as React from 'react';
import { CloseButton } from '../../atoms/CloseButton/CloseButton';
import { CellData, Table } from '../Table/Table';

type OnCancelCallback = (index: number) => void;

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


class OpenOrders extends React.Component<OpenOrdersProps> {
    private defaultHeaders = ['Date', 'Action', 'Price', 'Amount', ''];

    public render() {
        const { headers = this.defaultHeaders } = this.props;
        const tableData = this.props.data.map(this.renderRow);
        const orderIndex = headers.findIndex(header => header === 'Order Type');

        if (headers[orderIndex] === 'Order Type'){
           headers[orderIndex] = <span onClick={this.props.function}>Order Type</span>;
        }

        return (
            <div className="cr-open-orders">
                <Table
                    header={headers}
                    data={tableData as CellData[][]}
                />
            </div>
        );
    }

    public renderCell = (rowIndex: number) => (cell: CellData, index: number, row: CellData[]) => {
        const { headers = this.defaultHeaders } = this.props;
        const actionIndex = headers.findIndex(header => header === 'Action');
        const orderIndex = headers.findIndex(header => header === 'Order Type');
        const buySellIndex = headers.findIndex(header => header === '');

        switch (index) {
            case actionIndex:
                return this.renderAction(row[actionIndex] as string);
            case orderIndex:
                return this.renderOrder(row[orderIndex] as string);
            case buySellIndex:
                return this.renderCancelButton(rowIndex);
            default:
                return cell;
        }
    };

    public renderRow = (row: CellData[], index: number) => {
        return row.map(this.renderCell(index)); // format cells and remove first column of order side
    };

    public renderAction(actionType: string) {
        const action = actionType ? actionType.toLowerCase() : actionType;
        const classNames = classnames('cr-open-orders__price', {
            'cr-open-orders__price--buy': action === 'bid',
            'cr-open-orders__price--sell': action === 'ask',
        });
        return <span className={classNames}>{action}</span>;
    }

    public renderOrder(orderType: string) {
        // tslint:disable-next-line:no-magic-numbers
        const type = orderType ? orderType.toLowerCase().slice(0,3) : orderType;
        const classNames = classnames('cr-open-orders__order', {
            'cr-open-orders__order--buy': type === 'buy',
            'cr-open-orders__order--sell': type === 'sel',
        });
        return <span className={classNames}>{orderType}</span>;
    }

    public renderCancelButton = (index: number) => {
        return <CloseButton onClick={this.handleCancel(index)} />;
    };

    private handleCancel = (index: number) => () => {
        this.props.onCancel(index);
    }
}

export {
    OnCancelCallback,
    OpenOrders,
    OpenOrdersProps,
};
