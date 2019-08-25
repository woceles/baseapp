import * as React from 'react';

const QR_CODE_GENERATOR_URL = 'https://api.qrserver.com/v1/create-qr-code/';
const QRCodeURL = process.env.QR_CODE_GENERATOR || QR_CODE_GENERATOR_URL;

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
const QRCode: React.FunctionComponent<QRCodeProps> = (props: QRCodeProps) => {
    const getImageSize = (type?: string) => {
        switch (type) {
            case 'lg': {
                return '180x180';
            }
            case 'md': {
                return '118x118';
            }
            case 'sm': {
                return '50x50';
            }
            default: {
                return '118x118';
            }
        }
    };

    const getQRCodeURL = (d: string, size?: string) =>
        `${QRCodeURL}?data=${encodeURI(d)}&size=${getImageSize(size)}`;

    const { data = '', dimensions, alt } = props;
    return (
        <div className="qr-code">
            <img
                className="qr-code__img"
                src={getQRCodeURL(data, dimensions)}
                alt={alt || data}
            />
        </div>
    );
};

export {
    QRCode,
    QRCodeProps,
};
