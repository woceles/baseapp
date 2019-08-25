import classnames from 'classnames';
import * as React from 'react';
import iconDown = require('./chevron-down.svg');
import iconUp = require('./chevron-up.svg');

type DropdownElem = number | string | React.ReactNode;

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
class Dropdown extends React.Component<DropdownProps & {}, DropdownState> {

    constructor(props: DropdownProps) {
        super(props);
        this.state = {
            open: false,
            selected: 0,
        };
    }

    public render() {
        const { open } = this.state;
        const cx = classnames('cr-dropdown', this.props.className);

        return (
            <div className={cx}>
                <div
                    className={`cr-dropdown__input${open ? '--open' : ''}`}
                    onClick={this.handleInputClick}
                >
                    <span className="cr-dropdown__input-label">
                        {this.props.list[this.state.selected]}
                        </span>
                    <span className="cr-dropdown__input-icon">
                        <img src={this.state.open ? iconUp : iconDown} />
                    </span>
                </div>
                {this.renderList(this.state.open, this.props.list)}
            </div>
        );
    }

    /**
     * function that handles the selection
     * @param index - number of selected element
     */
    private handleSelect = (index: number) => {
        if (this.props.onSelect) {
            this.props.onSelect(index);
        }
        this.setState({
            open: false,
            selected: index,
        });
    };

    /**
     * function that opens dropdown list
     */
    private handleInputClick = () => {
        this.setState({ open: !this.state.open });
    };

    /**
     * function that render one element of dropdown list
     * @param option - element
     * @param index - number of element
     */
    private renderOptions = (option: DropdownElem, index: number) => {
        return (
            <li
                className="cr-dropdown__list-item"
                key={index}
                onClick={this.handleSelect.bind(this, index)}
            >
                <span className="cr-dropdown__list-item-label">
                    {option}
                </span>
            </li>
        );
    };

    /**
     * function that render all dropdown list
     * @param listIsOpen - true, if dropdown list is open
     * @param list - list of elements
     */
    private renderList = (listIsOpen: boolean, list: DropdownElem[]) => {
        return listIsOpen ? (
            <ul className="cr-dropdown__list">
                {list.map(this.renderOptions)}
            </ul>
        ) : '';
    };
}

export {
    Dropdown,
    DropdownProps,
};
