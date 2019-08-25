import * as React from 'react';
interface AvatarProps {
    /**
     * Property for an alt of the image. If source is defined, it will be hidden
     */
    title: string;
    /**
     * Additional class name. By default element receives `cr-avatar` class
     * @default empty
     */
    className?: string;
    /**
     * Property for an image. If it is not undefined, image will be hidden and there will be displayed alt instead of image
     */
    source?: string;
}
/**
 * Component to display cryptobase-react Avatar
 */
declare const Avatar: React.FunctionComponent<AvatarProps>;
export { Avatar, AvatarProps, };
