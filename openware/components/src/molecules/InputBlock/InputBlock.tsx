import classnames from 'classnames';
import * as React from 'react';
import { Input } from '../../atoms';

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
const InputBlock: React.FunctionComponent<InputBlockProps> = (props: InputBlockProps) => {
    const {
        currency, message, type, placeholder,
        className, value, handleChangeValue,
    } = props;
    const cx = classnames('cr-input-block', className);
    return (
        <div className={cx}>
            {currency} {message}
            <Input
                className="cr-input-block__input"
                type={type}
                placeholder={placeholder}
                value={value}
                onChangeValue={handleChangeValue}
            />
        </div>
    );
};

export {
    InputBlock,
    InputBlockProps,
};
