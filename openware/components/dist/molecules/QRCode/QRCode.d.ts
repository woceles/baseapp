import * as React from 'react';
interface QRCodeProps {
    /**
     * Data which is used to generate QR code(e.g. wallet address). By default,
     * lib uses `https://api.qrserver.com/v1/create-qr-code/` service.
     * If you want to change code generating service you should set
     * `process.env.QR_CODE_GENERATOR_URL`
     *
     * @default Required
     */
    data: string;
    /**
     * Defines the size of QR code component.
     * @default 118x118
     */
    dimensions?: string;
    /**
     * Sets img alt attribute
     * @default data property
     */
    alt?: string;
}
/**
 * Component for displaying QR code.
 */
declare const QRCode: React.FunctionComponent<QRCodeProps>;
export { QRCode, QRCodeProps, };
