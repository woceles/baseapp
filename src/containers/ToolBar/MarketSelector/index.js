import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { selectCurrentMarket, } from '../../../modules';
import { ArrowIcon, } from '../icons/ArrowIcon';
import { MarketsList, } from './MarketsList';
import { MarketsTabs, } from './MarketsTabs';
class MarketSelectorComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false,
            searchFieldValue: '',
            marketsTabsSelectedValue: '',
        };
        this.handleOpenSelector = () => {
            this.setState({
                isOpen: !this.state.isOpen,
            });
        };
        this.searchFieldChangeHandler = e => {
            this.setState({
                searchFieldValue: e.target.value,
            });
        };
        this.marketsTabsSelectHandler = value => {
            this.setState({
                marketsTabsSelectedValue: value,
            });
        };
    }
    render() {
        const { currentMarket, } = this.props;
        const { isOpen, searchFieldValue, marketsTabsSelectedValue, } = this.state;
        const iconClassName = classnames({
            'pg-trading-header-selector-icon-open': isOpen,
            'pg-trading-header-selector-icon-close': !isOpen,
        });
        const iconImgClassName = classnames({
            'pg-trading-header-selector-icon-img-open': isOpen,
            'pg-trading-header-selector-icon-img-close': !isOpen,
        });
        const listClassName = classnames({
            'pg-trading-header-selector-list-container-open': isOpen,
            'pg-trading-header-selector-list-container-close': !isOpen,
        });
        const searchSelectorClassName = classnames({
            'pg-trading-header-selector-search': isOpen,
            'pg-trading-header-selector-search-closed': !isOpen,
        });
        return (React.createElement("div", { className: "pg-trading-header-selector-container" },
            React.createElement("div", { className: "pg-trading-header-selector", onClick: this.handleOpenSelector },
                React.createElement("div", { className: "pg-trading-header-selector-market" }, currentMarket && currentMarket.name),
                React.createElement("div", { className: "pg-trading-header-selector-title" }, "Select Market"),
                React.createElement("div", { className: iconClassName },
                    React.createElement("div", { className: iconImgClassName },
                        React.createElement(ArrowIcon, { color: isOpen ? '#FFFFFF' : '#737F92' })))),
            React.createElement("div", { className: listClassName },
                React.createElement(MarketsTabs, { onSelect: this.marketsTabsSelectHandler }),
                React.createElement(MarketsList, { search: searchFieldValue, currencyQuote: marketsTabsSelectedValue }),
                React.createElement("div", { className: 'pg-trading-header-selector-search-wrapper' },
                    React.createElement("div", { className: searchSelectorClassName },
                        React.createElement("div", { className: "pg-trading-header-selector-search-icon" },
                            React.createElement("img", { src: require('../../../assets/images/search.svg') })),
                        React.createElement("input", { className: "pg-trading-header-selector-search-field", onChange: this.searchFieldChangeHandler, value: searchFieldValue }))))));
    }
}
const reduxProps = state => ({
    currentMarket: selectCurrentMarket(state),
});
export const MarketSelector = connect(reduxProps)(MarketSelectorComponent);