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
declare class DepositFiat extends React.PureComponent<DepositFiatProps> {
    render(): JSX.Element;
    private renderDetail;
}
export { DepositFiat, DepositFiatProps, };
