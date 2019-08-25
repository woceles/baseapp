import * as React from 'react';
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
declare const OrderInput: React.FunctionComponent<OrderInputProps>;
export { OrderInput, OrderInputProps, };
