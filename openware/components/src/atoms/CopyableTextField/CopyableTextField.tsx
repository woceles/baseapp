import '@openware/cryptofont';

import classnames from 'classnames';
import * as React from 'react';

interface CopyableTextFieldProps {
    /**
     * Text value that will be copied to the clipboard
     */
    value: string;
    /**
     * Additional class name for styling. By default element receives `cr-button` class
     * @default empty
     */
    className?: string;
    /**
     * String value that makes copy field be unique
     */
    fieldId: string;
}

type CopyTypes = HTMLInputElement | null;

const copy = (id: string) => {
    const copyText: CopyTypes = document.querySelector(`#${id}`);

    if (copyText) {
        copyText.select();

        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
};

/**
 * Text field component with ability to copy inner text.
 */
class CopyableTextField extends React.Component<CopyableTextFieldProps> {
    public componentDidMount() {
        if (!this.props.fieldId) {
            throw new Error('CopyableTextField must contain `fieldId` prop');
        }
    }

    public render() {
        const { value, className } = this.props;
        const { fieldId } = this.props;
        const doCopy = () => copy(fieldId);
        const cx = classnames('cr-copyable-text-field', className);
        return (
            <div className={cx}>
                <div className="cr-copyable-text-field__input">
                    <input
                        id={String(fieldId)}
                        readOnly={true}
                        type="text"
                        value={value}
                    />
                </div>
                <div className="cr-copyable-text-field__button" onClick={doCopy}>
                    Copy
                </div>
            </div>
        );
    }
}

export {
    CopyableTextField,
    CopyableTextFieldProps,
};
