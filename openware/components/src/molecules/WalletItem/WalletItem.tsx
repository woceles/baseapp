import * as React from 'react';
import { CryptoIcon } from '../../atoms';

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

const style: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
};

const renderLocked = (lockedAmount?: number) => {
    return lockedAmount ? (
        <div className="cr-wallet-item__amount-locked">
            Locked: {lockedAmount}
        </div>) : '';
};

/**
 * Component for displaying information about wallet, including address and amount of currency.
 */
const WalletItem: React.FunctionComponent<WalletItemProps> = (props: WalletItemProps) => {
    const {
        currency,
        balance,
        locked,
        active,
    } = props;
    const cName = `cr-wallet-item ${active ? 'cr-wallet-item--active' : ''}`;
    return (
        <div style={style} className={cName}>
            <div>
                <CryptoIcon className="cr-wallet-item__icon" code={currency.toUpperCase()} />
                <span className="cr-wallet-item__icon-code"> {currency}</span>
            </div>
            <span className="cr-wallet-item__balance">
                {balance}
                <span className="cr-wallet-item__currency">
                    {currency}
                </span>&nbsp;
                <span className="cr-wallet-item__balance-locked">
                    {renderLocked(locked)}
                </span>
            </span>
        </div>
    );
};

export {
    WalletItem,
    WalletItemProps,
};
