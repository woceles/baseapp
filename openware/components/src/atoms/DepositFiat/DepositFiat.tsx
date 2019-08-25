import * as React from 'react';
import { KeyValuePair } from '../../types/index';

interface DepositFiatProps {
    /**
     * Bank account details data
     */
    data: KeyValuePair[];
    /**
     * Sets helper description
     */
    description: string;
    /**
     * Sets title describing the data displayed in children
     */
    title: string;
}

/**
 * Component to display bank account details which can be used for a
 * deposit
 */
class DepositFiat extends React.PureComponent<DepositFiatProps> {

    public render() {
        const {
            data,
            description,
            title,
        } = this.props;

        return (
            <div className="cr-deposit-fiat">
                <p className="cr-deposit-fiat__title">{title}</p>
                <p className="cr-deposit-fiat__description">{description}</p>
                <div className="cr-deposit-fiat-credentials">
                    {data.map(this.renderDetail)}
                </div>
            </div>
        );
    }

    private renderDetail = (detail: KeyValuePair, index: number) => {
        return (
            <div className="cr-deposit-fiat-detail" key={index}>
                <p className="cr-deposit-fiat-detail__label">
                    {`${detail.key}:`}
                </p>
                <p className="cr-deposit-fiat-detail__value">{detail.value}</p>
            </div>
        );
    };
}

export {
    DepositFiat,
    DepositFiatProps,
};
