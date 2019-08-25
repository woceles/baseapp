import * as React from 'react';
interface WalletTradeItemProps {
    /**
     * Crypto currency code
     */
    currency: string;
    /**
     * Amount of currency
     */
    balance: number;
    /**
     * Additional class name for styling (by default `cr-wallet-trades-item`)
     */
    className?: string;
}
/**
 * Component for displaying information about wallet, including address and amount of currency.
 */
declare const WalletTradeItem: React.FunctionComponent<WalletTradeItemProps>;
export { WalletTradeItem, WalletTradeItemProps, };
