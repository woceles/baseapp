// import { Decimal, Markets } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { selectMarkets, } from '../../../../modules/public/markets';
export class MarketsTabsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 0,
            scrollLeft: 0,
        };
        this.fastSearchButtons = () => {
            const { markets } = this.props;
            let listOfQuote = ['All'];
            if (markets.length > 0) {
                listOfQuote = markets.reduce(this.quoteCurrencies, listOfQuote);
            }
            return (React.createElement("div", { className: "pg-trading-header-fast-search-container", onWheel: this.handleOnMouseWheel, ref: this.tabsRef }, listOfQuote.map(this.renderFastSearchButton)));
        };
        this.renderFastSearchButton = (item, index) => {
            const classname = classnames('pg-trading-header-fast-search-button', {
                'pg-trading-header-fast-search-button-active': this.state.selectedItem === index,
            });
            return (

            React.createElement("div", { className: classname, key: index, onClick: () => this.handleSelectButton(index) }, item));
        };
        this.handleOnMouseWheel = (event) => {
            this.tabsRef.current.scrollLeft += event.deltaX;
        };
        this.handleSelectButton = (index) => {
            this.setState({
                selectedItem: index,
            }, () => {
                if (this.props.onSelect) {
                    const { markets } = this.props;
                    let listOfQuote = ['All'];
                    if (markets.length > 0) {
                        listOfQuote = markets.reduce(this.quoteCurrencies, listOfQuote);
                    }
                    this.props.onSelect(listOfQuote[this.state.selectedItem]);
                }
            });
        };
        this.quoteCurrencies = (pV, cV) => {
            const [, quote] = cV.name.split('/');
            if (pV.indexOf(quote) === -1) {
                pV.push(quote);
            }
            return pV;
        };
        this.tabsRef = React.createRef();
    }
    render() {
        return this.fastSearchButtons();
    }
}
const mapStateToProps = (state) => ({
    markets: selectMarkets(state),
});

export const MarketsTabs = connect(mapStateToProps, {})(MarketsTabsComponent);