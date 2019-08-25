import * as React from 'react';
interface HeaderItemProps {
    /**
     * Additional class name for styling. By default element receives `cr-header-item` class
     * @default empty
     */
    className?: string;
    /**
     * The string to use as the label for the HeaderItem.
     */
    label: string;
    /**
     * Number to use as a summary
     */
    amount: number;
    /**
     * Optinal string that define currency if it needs
     * @default empty
     */
    currency?: string;
    /**
     * Optinal sign that define change if it needs
     * @default empty
     */
    sign?: string;
}
declare const HeaderItem: React.FunctionComponent<HeaderItemProps>;
export { HeaderItem, HeaderItemProps, };
