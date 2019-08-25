import { Button } from '@openware/components';
import '@openware/cryptofont';
import classnames from 'classnames';
import * as React from 'react';
const copy = (id) => {
    const copyText = document.querySelector(`#${id}`);
    if (copyText) {
        copyText.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
};
/**
 * Text field component with ability to copy inner text.
 */
class CopyableTextField extends React.Component {
    componentDidMount() {
        if (!this.props.fieldId) {
            throw new Error('CopyableTextField must contain `fieldId` prop');
        }
    }
    render() {
        const { value, className, disabled, fieldId, copyButtonText, } = this.props;
        const doCopy = () => copy(fieldId);
        const cx = classnames('cr-copyable-text-field', className);
        return (React.createElement("div", { className: cx },
            React.createElement("div", { className: "cr-copyable-text-field__input" },
                React.createElement("input", { id: String(fieldId), readOnly: true, type: "text", value: value, onClick: doCopy, disabled: disabled }),
                React.createElement(Button, { className: "cr-copyable-text-field__button", label: copyButtonText ? copyButtonText : 'Copy', type: 'text', onClick: doCopy, disabled: disabled, noMargin: true }))));
    }
}
export { CopyableTextField, };