import * as React from 'react';
interface WalletItemProps {
    /**
     * Wallet address
     */
    address?: string;
    /**
     * Crypto currency code
     */
    currency: string;
    /**
     * Amount of currency
     */
    balance: number;
    /**
     * Locked amount of currency
     */
    locked?: number;
    /**
     * type of a currency (fiat or coin)
     */
    type: 'fiat' | 'coin';
    /**
     * Fee of a currency
     */
    fee: number;
    /**
     * true if a wallet
     */
    active?: boolean;
}
/**
 * Component for displaying information about wallet, including address and amount of currency.
 */
declare const WalletItem: React.FunctionComponent<WalletItemProps>;
export { WalletItem, WalletItemProps, };
