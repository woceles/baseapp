import * as React from 'react';
import { CopyableTextField } from '../../atoms';
import { QRCode } from '../QRCode/QRCode';

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

const DepositInfo: React.FunctionComponent<DepositInfoProps> = (props: DepositInfoProps) => {
    return (
        <p className={'cr-deposit-info'}>
            {props.data}
        </p>
    );
};

/**
 *  Component that displays wallet details that can be used to deposit cryptocurrency.
 */
class DepositCrypto extends React.Component<DepositCryptoProps> {
    public render() {
        const {
            data,
            dimensions = 'lg',
            error,
            text,
        } = this.props;
        return (
            <div className={'cr-deposit-crypto'}>
                <div>
                    <DepositInfo data={text} />
                    <form className={'cr-deposit-crypto__copyable'}>
                        <fieldset className={'cr-copyable-text-field'}>
                            <legend className={'cr-deposit-crypto__copyable-title'}>
                                Deposit by Wallet Address
                            </legend>
                            { data ? (
                            <CopyableTextField
                                className={'cr-deposit-crypto__copyable-area'}
                                value={data}
                                fieldId={'copy_deposit_1'}
                            />
                            ) : (
                            <CopyableTextField
                                className={'cr-deposit-crypto__copyable-area'}
                                fieldId={'copy_deposit_2'}
                                value={error}
                            />
                            )}
                        </fieldset>
                    </form>
                </div>
                <div>
                    <QRCode
                        dimensions={dimensions}
                        data={data}
                    />
                </div>
            </div>
        );
    }
}

export {
    DepositInfo,
    DepositInfoProps,
    DepositCrypto,
    DepositCryptoProps,
};
