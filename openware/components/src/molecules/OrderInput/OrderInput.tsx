import classnames from 'classnames';
import * as React from 'react';
import { CryptoIcon, Input } from '../../atoms';

interface OrderInputProps {
    /**
     * Additional class name for styling. By default element receives `cr-input-block` class
     * @default empty
     */
    className?: string;
    /**
     * Code of cryptocurrency
     * @default empty
     */
    currency: string;
    /**
     * Value of Input component
     */
    value: string | number;
    /**
     * Function for getting value of input
     * @default empty
     */
    handleChangeValue: (text: string) => void;
}

/**
 * Input with cryptocurrency icon and label.
 */
const OrderInput: React.FunctionComponent<OrderInputProps> = (props: OrderInputProps) => {
    const { currency, className, value, handleChangeValue } = props;
    const cx = classnames('cr-order-input', className);
    const currencyCode = `${currency.toUpperCase()}-alt`;
    return (
        <div className={cx}>
            <div className="cr-order-input__crypto-icon">
                <CryptoIcon code={currencyCode}>{currency.toUpperCase()}</CryptoIcon>
            </div>
            <div className="cr-order-input__input">
                <Input
                    className="cr-order-input__input"
                    type="text"
                    placeholder="0"
                    value={value}
                    onChangeValue={handleChangeValue}
                />
            </div>
        </div>
    );
};

export {
    OrderInput,
    OrderInputProps,
};
