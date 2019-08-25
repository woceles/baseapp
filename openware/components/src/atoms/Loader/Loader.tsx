import cr from 'classnames';
import * as React from 'react';
import loader =  require('./loader.svg');

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

// tslint:disable-next-line
const Loader: React.SFC<LoaderProps> = ({size = 30, className}) => {
    const classNames = cr('cr-loader', className);
    return (
        <div className={classNames}>
            <img
                width={size}
                height={size}
                src={loader}
                alt=""
            />
        </div>
    );
};

export {
    Loader,
    LoaderProps,
};
