import '@openware/cryptofont';
import * as React from 'react';
interface CopyableTextFieldProps {
    /**
     * Text value that will be copied to the clipboard
     */
    value: string;
    /**
     * Additional class name for styling. By default element receives `cr-button` class
     * @default empty
     */
    className?: string;
    /**
     * String value that makes copy field be unique
     */
    fieldId: string;
}
/**
 * Text field component with ability to copy inner text.
 */
declare class CopyableTextField extends React.Component<CopyableTextFieldProps> {
    componentDidMount(): void;
    render(): JSX.Element;
}
export { CopyableTextField, CopyableTextFieldProps, };
