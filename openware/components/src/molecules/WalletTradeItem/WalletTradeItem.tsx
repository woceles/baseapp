import classnames from 'classnames';
import * as React from 'react';
import { CryptoIcon } from '../../atoms';
import iconRight = require('./chevron-right.svg');

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
const WalletTradeItem: React.FunctionComponent<WalletTradeItemProps> = (props: WalletTradeItemProps) => {
    const {
        className,
        currency,
        balance,
    } = props;
    const cx = classnames('cr-wallet-trades-item', className);
    const currencyCode = `${currency.toUpperCase()}-alt`;
    return (
        <div className={cx}>
            <div className="cr-wallet-trades-item__body">
                <div className="cr-wallet-trades-item__body-crypto">
                    <CryptoIcon className="cr-wallet-trades-item__body-crypto-icon" code={currencyCode} />
                </div>
                <div className="cr-wallet-trades-item__body-data">
                    <div className="cr-wallet-trades-item__body-data-currency">
                        {currency.toUpperCase()}
                    </div>
                    <div className="cr-wallet-trades-item__body-data-balance">
                        {balance}
                    </div>
                </div>
            </div>
            <div className="cr-wallet-trades-item__arrow">
                <img src={iconRight} />
            </div>
        </div>
    );
};

export {
    WalletTradeItem,
    WalletTradeItemProps,
};
