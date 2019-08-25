import * as React from 'react';
interface DepositCryptoProps {
    /**
     * Data which is used to generate QR code
     */
    data: string;
    /**
     * Data which is used to display error if data is undefined
     */
    error: string;
    /**
     * Defines the size of QR code component.
     * @default lg (180x180)
     */
    dimensions?: string;
    /**
     *  Renders text of a component
     */
    text?: string;
}
interface DepositInfoProps {
    /**
     *  Renders text of a component
     */
    data?: string;
}
declare const DepositInfo: React.FunctionComponent<DepositInfoProps>;
/**
 *  Component that displays wallet details that can be used to deposit cryptocurrency.
 */
declare class DepositCrypto extends React.Component<DepositCryptoProps> {
    render(): JSX.Element;
}
export { DepositInfo, DepositInfoProps, DepositCrypto, DepositCryptoProps, };
