import * as React from 'react';
declare type DropdownElem = number | string | React.ReactNode;
interface DropdownProps {
    /**
     * List of options
     */
    list: DropdownElem[];
    /**
     * Selection callback function
     * @default empty
     */
    onSelect?: (index: number) => void;
    /**
     *  By default class name 'cr-dropwdown'
     *  This property gives an additional class name
     *  @default empty
     */
    className?: string;
}
interface DropdownState {
    open: boolean;
    selected: number;
}
/**
 *  Cryptobase Dropdown that overrides default dropdown with list of options.
 */
declare class Dropdown extends React.Component<DropdownProps & {}, DropdownState> {
    constructor(props: DropdownProps);
    render(): JSX.Element;
    /**
     * function that handles the selection
     * @param index - number of selected element
     */
    private handleSelect;
    /**
     * function that opens dropdown list
     */
    private handleInputClick;
    /**
     * function that render one element of dropdown list
     * @param option - element
     * @param index - number of element
     */
    private renderOptions;
    /**
     * function that render all dropdown list
     * @param listIsOpen - true, if dropdown list is open
     * @param list - list of elements
     */
    private renderList;
}
export { Dropdown, DropdownProps, };
