import * as React from 'react';
interface LoaderProps {
    /**
     * Defines the size of a loader
     * @default 30
     */
    size?: number;
    /**
     * Additional classname
     */
    className?: string;
}
declare const Loader: React.SFC<LoaderProps>;
export { Loader, LoaderProps, };
