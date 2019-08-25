import * as React from 'react';
interface InputBlockProps {
    /**
     * Additional class name for styling. By default element receives `cr-input-block` class
     * @default empty
     */
    className?: string;
    /**
     * Code of the cryptocurrency
     * @default empty
     */
    currency?: string;
    /**
     * Function for getting value of input tag
     * @default empty
     */
    handleChangeValue: (value: string) => void;
    /**
     * Placeholder for Input component
     * @default empty
     */
    placeholder?: string;
    /**
     * Message for input
     */
    message: string;
    /**
     * Type of Input component
     * @default 'text'
     */
    type?: string;
    /**
     * Value of Input component
     * @default ''
     */
    value: string | number;
}
/**
 * Input component with ability to render label with cryptocurrency name.
 */
declare const InputBlock: React.FunctionComponent<InputBlockProps>;
export { InputBlock, InputBlockProps, };
