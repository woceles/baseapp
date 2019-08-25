import * as React from 'react';

interface AlertIconProps {
    /**
     * Type of icon
     */
    type: 'success' | 'error';
}

const SuccessIcon = () => (
    <div className="cr-alert-icon cr-alert-icon--success">
        <div className="cr-alert-icon--success__left" />
        <div className="cr-alert-icon--success__center" />
        <div className="cr-alert-icon--success__right" />
    </div>
);

const ErrorIcon = () => (
    <div className="cr-alert-icon cr-alert-icon--error">
        <div className="cr-alert-icon--error__left" />
        <div className="cr-alert-icon--error__right" />
    </div>
);

const AlertIcon: React.FunctionComponent<AlertIconProps> = (props: AlertIconProps) => {
    const { type } = props;

    return type === 'success'
        ? <SuccessIcon />
        : <ErrorIcon />;
};

export {
    AlertIcon,
    AlertIconProps,
    ErrorIcon,
    SuccessIcon,
};
