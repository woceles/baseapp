import * as React from 'react';
import { WalletItemProps } from '../../molecules';
interface WalletListProps {
    walletItems: WalletItemProps[];
    /**
     * Callback function which is invoked whenever wallet item is clicked
     */
    onWalletSelectionChange(item: WalletItemProps): void;
}
interface CompositionState {
    activeIndex: number;
}
/**
 * Component to display list of user wallets. It is scrollable and reacts on WalletItem click.
 */
export declare class WalletList extends React.Component<WalletListProps, CompositionState> {
    constructor(props: WalletListProps);
    itemState: (i: number) => boolean;
    makeWalletItem: (props: WalletItemProps, i: number) => JSX.Element;
    handleClick: (i: number, props: WalletItemProps) => void;
    render(): JSX.Element;
}
export { WalletListProps, };
