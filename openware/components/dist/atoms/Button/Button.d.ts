import '@openware/cryptofont';
import * as React from 'react';
export declare type ButtonClickHandler = (label?: string, e?: React.FormEvent<HTMLInputElement>) => void;
interface ButtonProps {
    /**
     * String that will be displayed as the name on the button
     */
    label: string;
    /**
     * Button click callback
     */
    onClick: ButtonClickHandler;
    /**
     * Additional class name for styling. By default element receives `cr-button` class
     * @default empty
     */
    className?: string;
    /**
     * Remove button margin if true
     */
    noMargin?: boolean;
    /**
     * If true, component will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Value for defining type of button
     * @default "button"
     */
    type?: string;
}
/**
 * Сr-Button overrides default button.
 */
declare const Button: React.FunctionComponent<ButtonProps>;
export { Button, ButtonProps, };
