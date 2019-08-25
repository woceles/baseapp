import * as React from 'react';
interface ModalProps {
    /**
     * Property for
     */
    show: boolean;
    /**
     * Modal header
     */
    header: React.ReactNode;
    /**
     * Content that will be displayed in modal body
     */
    content: React.ReactNode;
    /**
     * Modal footer
     */
    footer: React.ReactNode;
    /**
     * Additional classname
     */
    className?: string;
}
declare const Modal: React.FunctionComponent<ModalProps>;
export { Modal, ModalProps, };
