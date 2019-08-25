import * as React from 'react';
import { GridChildInterface } from '../../organisms';
interface GridItemProps {
    children: React.ReactNode | GridChildInterface;
    /**
     * Additional class name. By default element receives `cr-grid-item` class
     * @default empty
     */
    className?: string;
    title?: string;
}
declare const GridItem: React.FunctionComponent<GridItemProps>;
export { GridItem, GridItemProps, };
