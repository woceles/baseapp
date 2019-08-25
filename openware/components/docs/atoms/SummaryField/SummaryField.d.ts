import * as React from 'react';
interface SummaryFieldProps {
    /**
     * Additional class name for styling. By default element receives `cr-input` class
     * @default empty
     */
    className?: string;
    /**
     * The string to use as the label for the SummaryField.
     */
    message: string;
    /**
     * Border item for summary field. It can be 'rectangle', 'circle' or 'empty-circle'
     * @default 'rectangle'
     */
    borderItem?: string;
    /**
     * Content will be displayed instead of amount and currency, if it is necessary
     */
    content: string;
}
/**
 * Component to display currency amount with specific label.
 */
declare const SummaryField: React.FunctionComponent<SummaryFieldProps>;
export { SummaryField, SummaryFieldProps, };
