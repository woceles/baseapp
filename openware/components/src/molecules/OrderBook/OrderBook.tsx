import * as React from 'react';
import { CellData, Table } from '../Table/Table';

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

export const mapValues = (maxVolume?: number, data?: number[]) => {
    const resultData = data && maxVolume && data.length ? data.map(currentVolume => {
        // tslint:disable-next-line:no-magic-numbers
        return { value: (currentVolume / maxVolume) * 100};
    }) : [];

    return resultData.sort((a, b) => a.value - b.value);
};

class OrderBook extends React.PureComponent<OrderBookProps> {
    public render() {
        const {
            data,
            maxVolume,
            orderBookEntry,
            side,
            headers,
            title,
            rowBackgroundColor,
        } = this.props;
        const resultData = mapValues(maxVolume, orderBookEntry);

        const getRowWidth = (index: number) => {
            if (resultData && resultData.length) {
                return {
                    width: `${resultData[index].value}%`,
                };
            }
            return {
                display: 'none',
            };
        };
        return (
            <div className="cr-order-book" >
                <Table
                    rowBackground={getRowWidth}
                    data={data}
                    side={side}
                    header={headers}
                    rowBackgroundColor={rowBackgroundColor}
                    titleComponent={title}
                />
            </div>
        );
    }
}

export {
    OrderBook,
    OrderBookProps,
};
