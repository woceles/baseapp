import * as React from 'react';
import { OnChangeEvent } from '../../types/index';
interface FilterInputProps {
    /**
     * Data on which the search will be performed
     */
    data: object[];
    /**
     * filter function prop is used to filter data
     */
    filter: (item: any, term: string) => boolean;
    /**
     * onFilter prop is called whenever input value changes
     */
    onFilter: (items: object[]) => void;
    /**
     * Additional class name for styling (by default `cr-search`)
     */
    className?: string;
}
export interface SearchInputState {
    key: string;
}
/**
 * Component for performing search  and filtering objects of the specific dataset.
 */
declare class FilterInput extends React.Component<FilterInputProps, SearchInputState> {
    constructor(props: FilterInputProps);
    filterList(event: OnChangeEvent): void;
    render(): JSX.Element;
}
export { FilterInput, FilterInputProps, };
