import * as React from 'react';
interface AlertProps {
    /**
     * Additional message
     */
    description: string;
    /**
     * Alert message
     */
    title: string;
    /**
     * Type of message
     */
    type: 'success' | 'error';
}
declare const Alert: React.FunctionComponent<AlertProps>;
export { Alert, AlertProps, };
