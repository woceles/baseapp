import * as React from 'react';
interface AlertIconProps {
    /**
     * Type of icon
     */
    type: 'success' | 'error';
}
declare const SuccessIcon: () => JSX.Element;
declare const ErrorIcon: () => JSX.Element;
declare const AlertIcon: React.FunctionComponent<AlertIconProps>;
export { AlertIcon, AlertIconProps, ErrorIcon, SuccessIcon, };
