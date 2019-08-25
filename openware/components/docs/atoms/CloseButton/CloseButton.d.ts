import * as React from 'react';
interface CloseButtonProps {
    /**
     * Callback called on button click
     */
    onClick: () => void;
}
declare const CloseButton: React.FunctionComponent<CloseButtonProps>;
export { CloseButton, CloseButtonProps, };
