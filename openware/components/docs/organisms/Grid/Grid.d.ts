import * as React from 'react';
interface GridGeneralInterface {
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
}
interface LayoutGridGeneralInterface {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
}
interface LayoutGrid {
    lg: LayoutGridGeneralInterface[];
    md: LayoutGridGeneralInterface[];
    sm: LayoutGridGeneralInterface[];
}
interface GridChildInterface {
    i: number;
    render: () => React.ReactNode | GridChildInterface;
    title?: string;
}
interface GridProps {
    /**
     * Property with breakpoints for Grid component
     */
    breakpoints: GridGeneralInterface;
    /**
     * Property for children nodes for Grid component. These nodes are GridItems
     */
    children: GridChildInterface[];
    /**
     * Additional class name. By default element receives `cr-grid` class
     * @default empty
     */
    className?: string;
    /**
     * Property with cols for Grid component
     */
    cols: GridGeneralInterface;
    /**
     * Array of layouts of objects for Grid component
     */
    layouts: LayoutGrid;
    /**
     * Function for getting event of changing layout
     */
    onLayoutChange: () => void;
    /**
     * Value for rowHeight for Grid Component
     */
    rowHeight: number;
    /**
     * A CSS selector for elements that will act as the draggable handle
     */
    draggableHandle?: string;
}
declare const Grid: React.FunctionComponent<GridProps>;
export { Grid, GridProps, GridChildInterface, GridGeneralInterface, LayoutGrid, LayoutGridGeneralInterface, };
