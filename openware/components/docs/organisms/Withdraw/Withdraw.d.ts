import * as React from 'react';
interface WithdrawProps {
    /**
     * Value for setting correct symbol for summary field component. Could be 'rectangle', 'circle' or 'empty-circle'
     */
    borderItem?: string;
    /**
     * Value for setting current currency for withdraw
     */
    currency: string;
    /**
     * Fee for defined currency
     * @default 0
     */
    fee: number;
    /**
     * Function for withdraw event
     */
    onClick: (amount: number, rid: string, otpCode: string) => void;
    /**
     * Additional class name. By default element receives `cr-withdraw` class
     * @default empty
     */
    className?: string;
    /**
     * Renders Google Authenticator code input
     */
    twoFactorAuthRequired?: boolean;
}
interface WithdrawState {
    /**
     * Value for current address for withdraw
     * @default ''
     */
    address: string;
    /**
     * Value for current amount for withdraw
     * @default 0
     */
    amount: number;
    /**
     * Google Authenticator 6-digit code
     */
    otpCode: string;
    /**
     * Total value for withdraw
     */
    total: number;
}
/**
 * Component with for for withdraw.
 */
declare class Withdraw extends React.Component<WithdrawProps, WithdrawState> {
    state: {
        address: string;
        amount: number;
        otpCode: string;
        total: number;
    };
    render(): JSX.Element;
    private formatTotal;
    private renderOtpCodeInput;
    private handleClick;
    private handleChangeInputAmount;
    private setTotal;
    private handleChangeInputAddress;
    private handleChangeInputOtpCode;
}
export { Withdraw, WithdrawProps, WithdrawState, };
