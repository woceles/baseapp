import * as React from 'react';
interface CheckboxProps {
    /**
     * Property for setting or getting status of Checkbox component
     */
    checked?: boolean;
    /**
     * Additional class name. By default element receives `cr-checkbox` class
     * @default empty
     */
    className?: string;
    /**
     * Property for disabling Checkbox component
     */
    disabled?: boolean;
    /**
     * Property for label of Checkbox component
     */
    label: string;
    /**
     * Function for getting event of changing status of checkbox
     */
    onChange?: () => void;
    /**
     * Function for getting event of changing status of checkbox
     */
    slider?: boolean;
}
declare const Checkbox: React.FunctionComponent<CheckboxProps>;
export { Checkbox, CheckboxProps, };
