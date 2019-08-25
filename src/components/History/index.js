import { Table } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
class History extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.defaultHeaders = ['Time', 'Action', 'Price', 'Amount', 'Total'];
        this.title = 'Trades History';
        this.mapRows = (cell, index) => {
            const { headers = this.defaultHeaders } = this.props;
            const actionIndex = headers.findIndex(header => header === 'Action');
            return index === actionIndex ? this.renderAction(cell) : cell;
        };
    }
    render() {
        const { headers = this.defaultHeaders } = this.props;
        const tableData = this.props.data.map(row => row.map(this.mapRows));
        return (React.createElement(Table, { data: tableData, header: headers, titleComponent: this.title }));
    }
    renderAction(actionType) {
        const action = actionType ? actionType.toLowerCase() : actionType;
        const className = classnames('cr-history-action', {
            'cr-history-action--buy': action === 'bid',
            'cr-history-action--sell': action === 'ask',
        });
        return React.createElement("span", { className: className }, action);
    }
}
export { History, };