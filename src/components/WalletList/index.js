import * as React from 'react';
import { WalletItem } from '../WalletItem';
const removeAlt = (str) => str.replace('-alt', '');
const style = {
    listStyleType: 'none',
    padding: 'calc(var(--gap) * 0.5) calc(var(--gap))',
};
/**
 * Component to display list of user wallets. It is scrollable and reacts on WalletItem click.
 */
export class WalletList extends React.Component {
    constructor(props) {
        super(props);
        this.itemState = (i) => {
            return this.props.activeIndex === i;
        };
        this.makeWalletItem = (props, i) => (React.createElement("li", { key: i, style: style, onClick: this.handleClick.bind(this, i, props) },
            React.createElement(WalletItem, Object.assign({ key: i }, {
                ...props,
                active: this.itemState(i),
                currency: removeAlt(props.currency),
            }))));
        this.handleClick = (i, props) => {
            if (this.props.onWalletSelectionChange) {
                this.props.onWalletSelectionChange(props);
            }
            if (this.props.onActiveIndexChange) {
                this.props.onActiveIndexChange(i);
            }
        };
    }
    render() {
        return (React.createElement("ul", { className: "cr-wallet-list" }, this.props.walletItems.map(this.makeWalletItem)));
    }
}