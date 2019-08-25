import classnames from 'classnames';
import * as React from 'react';
import { Button, Input, SummaryField } from '../../atoms';

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
class Withdraw extends React.Component<WithdrawProps, WithdrawState> {
    public state = {
        address: '',
        amount: 0,
        otpCode: '',
        total: 0,
    };

    public render() {
        const {
            address,
            amount,
            total,
        } = this.state;
        const {
            borderItem,
            className,
            currency,
            fee,
            twoFactorAuthRequired,
        } = this.props;
        const cx = classnames('cr-withdraw', className);
        const lastDividerClassName = classnames('cr-withdraw__divider', {
            'cr-withdraw__divider-one': twoFactorAuthRequired,
            'cr-withdraw__divider-two': !twoFactorAuthRequired,
        });
        const contentFee = `${String(fee)} ${currency.toUpperCase()}`;

        const contentTotal = total
            ? `${this.formatTotal(total, currency)} ${currency.toUpperCase()}`
            : `0 ${currency.toUpperCase()}`;

        const formattedCurrency = currency.toUpperCase();
        return (
            <div className={cx}>
                <div className="cr-withdraw-column">
                    <form>
                        <fieldset className="cr-withdraw__input">
                            <legend>
                                {formattedCurrency} "Withdrawal Address"
                            </legend>
                            <Input
                                className="cr-input-block__input"
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChangeValue={this.handleChangeInputAddress}
                            />
                        </fieldset>
                    </form>
                    <div className="cr-withdraw__divider cr-withdraw__divider-one" />
                    <form>
                        <fieldset className="cr-withdraw__input">
                            <legend>
                                Withdrawal Amount
                            </legend>
                            <Input
                                className="cr-input-block__input"
                                type="number"
                                placeholder="0"
                                value={amount}
                                onChangeValue={this.handleChangeInputAmount}
                            />
                        </fieldset>
                    </form>
                    <div className={lastDividerClassName} />
                    {twoFactorAuthRequired && this.renderOtpCodeInput()}
                </div>
                <div className="cr-withdraw-column">
                    <div>
                        <SummaryField
                            className="cr-withdraw__summary-field "
                            message="Fee"
                            content={contentFee}
                            borderItem={borderItem}
                        />
                        <SummaryField
                            className="cr-withdraw__summary-field"
                            message="Total Withdraw Amount"
                            content={contentTotal}
                            borderItem={borderItem}
                        />
                    </div>
                    <div className="cr-withdraw__deep">
                        <Button
                            className="cr-withdraw__button"
                            label="WITHDRAW"
                            onClick={this.handleClick}
                        />
                    </div>
                </div>
            </div>
        );
    }


    private formatTotal(value: string | number, currency: string) {
        const currencyAmountPrecision = 8;
        const bchAmountPrecision = 4;
        return currency.toLowerCase() === 'bch'
            ? Number(value).toFixed(bchAmountPrecision)
            : Number(value).toFixed(currencyAmountPrecision);
    }

    private renderOtpCodeInput = () => {
        const { otpCode } = this.state;
        return (
            <React.Fragment>
                <form>
                    <fieldset className="cr-withdraw__input">
                        <legend>
                            6-digit GAuthenticator Code
                        </legend>
                        <Input
                            type="text"
                            className="cr-input-block__input"
                            placeholder="XXXXXX"
                            value={otpCode}
                            onChangeValue={this.handleChangeInputOtpCode}
                        />
                    </fieldset>
                </form>
                <div className="cr-withdraw__divider cr-withdraw__divider-two" />
            </React.Fragment>
        );
    }

    private handleClick = () => this.props.onClick(
        this.state.total,
        this.state.address,
        this.state.otpCode,
    );

    private handleChangeInputAmount = (text: string) => {
        const value: number = parseFloat(text);
        if (value < 0) {
            this.setTotal(0);
        } else {
            this.setTotal(value - value * this.props.fee);
        }
        this.setState({
            amount: value,
        });
    };

    private setTotal = (value: number) => {
        this.setState({
            total: value,
        });
    };

    private handleChangeInputAddress = (text: string) => {
        this.setState({
            address: text,
        });
    };

    private handleChangeInputOtpCode = (otpCode: string) => {
        this.setState({ otpCode });
    }
}

export {
    Withdraw,
    WithdrawProps,
    WithdrawState,
};
