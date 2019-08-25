import { QRCode } from '@openware/components';
import classnames from 'classnames';
import * as React from 'react';
import { CopyableTextField } from '../CopyableTextField';
/**
 *  Component that displays wallet details that can be used to deposit cryptocurrency.
 */
const DepositCrypto = (props) => {
    const QR_SIZE = 118;
    const { data, dimensions, error, text, copiableTextFieldText, copyButtonText, handleOnCopy, disabled } = props;
    const size = dimensions || QR_SIZE;
    const onCopy = !disabled ? handleOnCopy : undefined;
    const className = classnames({ 'cr-copyable-text-field__disabled': data === '' });
    return (React.createElement("div", { className: className },
        React.createElement("div", { className: 'cr-deposit-crypto' },
            React.createElement("div", null,
                React.createElement("p", { className: 'cr-deposit-info' }, text),
                data ? React.createElement("div", { className: "d-none d-md-block qr-code-wrapper" },
                    React.createElement(QRCode, { dimensions: size, data: data })) : null),
            React.createElement("div", null,
                React.createElement("form", { className: 'cr-deposit-crypto__copyable' },
                    React.createElement("fieldset", { className: 'cr-copyable-text-field', onClick: onCopy },
                        React.createElement("legend", { className: 'cr-deposit-crypto__copyable-title' }, copiableTextFieldText ? copiableTextFieldText : 'Deposit by Wallet Address'),
                        React.createElement(CopyableTextField, { className: 'cr-deposit-crypto__copyable-area', value: data ? data : error, fieldId: data ? 'copy_deposit_1' : 'copy_deposit_2', copyButtonText: copyButtonText, disabled: disabled })))))));
};
export { DepositCrypto, };