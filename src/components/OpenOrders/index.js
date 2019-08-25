import { CloseButton, Table } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
class OpenOrders extends React.Component {
    constructor() {
        super(...arguments);
        this.defaultHeaders = ['Date', 'Action', 'Price', 'Amount', ''];
        this.defaultHeadersKeys = ['Date', 'Action', 'Price', 'Amount', ''];
        this.renderCell = (rowIndex) => (cell, index, row) => {
            const { headersKeys = this.defaultHeadersKeys } = this.props;
            const actionIndex = headersKeys.findIndex(header => header === 'Action');
            const orderIndex = headersKeys.findIndex(header => header === 'Order Type');
            const buySellIndex = headersKeys.findIndex(header => header === '');
            switch (index) {
                case actionIndex:
                    return this.renderAction(row[actionIndex], row[buySellIndex]);
                case orderIndex:
                    return this.renderOrder(row[buySellIndex]);
                case buySellIndex:
                    return this.renderCancelButton(rowIndex);
                default:
                    return cell;
            }
        };
        this.renderRow = (row, index) => {
            return row.map(this.renderCell(index)); // format cells and remove first column of order side
        };
        this.renderCancelButton = (index) => {
            return React.createElement(CloseButton, { onClick: this.handleCancel(index) });
        };
        this.handleCancel = (index) => () => {
            this.props.onCancel(index);
        };
    }
    render() {
        const { headers = this.defaultHeaders } = this.props;
        const { headersKeys = this.defaultHeadersKeys } = this.props;
        const tableData = this.props.data.map(this.renderRow);
        const orderIndex = headersKeys.findIndex(header => header === 'Order Type');
        if (headersKeys[orderIndex] === 'Order Type') {
            headers[orderIndex] = React.createElement("span", { onClick: this.props.function }, "Order Type");
        }
        return (React.createElement("div", { className: "cr-open-orders" },
            React.createElement(Table, { header: headers, data: tableData })));
    }
    renderAction(actionName, actionType) {
        const action = actionType ? actionType.toLowerCase() : actionType;
        const classNames = classnames('cr-open-orders__price', {
            'cr-open-orders__price--buy': action === 'buy',
            'cr-open-orders__price--sell': action === 'sell',
        });
        return React.createElement("span", { className: classNames }, actionName);
    }
    renderOrder(orderType) {
        
        const type = orderType ? orderType.toLowerCase().slice(0, 3) : orderType;
        const classNames = classnames('cr-open-orders__order', {
            'cr-open-orders__order--buy': type === 'buy',
            'cr-open-orders__order--sell': type === 'sel',
        });
        return React.createElement("span", { className: classNames }, orderType);
    }
}
export { OpenOrders, };