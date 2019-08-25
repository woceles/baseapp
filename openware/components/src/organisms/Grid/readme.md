Grid example:

```js
const breakpointsTest = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0,
};

const colsTest = {
  lg: 12,
  md: 10,
  sm: 768,
  xs: 480,
  xxs: 0,
}

const layoutsTest = {
  lg: [
    { x: 0, y: 0, w: 3, h: 9, i: '0' },
    { x: 3, y: 0, w: 3, h: 5, i: '1' },
    { x: 7, y: 0, w: 3, h: 5, i: '2' },
    { x: 0, y: 7, w: 3, h: 4, i: '3' },
  ],
  md: [
    { x: 0, y: 0, w: 3, h: 9, i: '0' },
    { x: 3, y: 0, w: 3, h: 5, i: '1' },
    { x: 7, y: 0, w: 3, h: 5, i: '2' },
    { x: 0, y: 7, w: 3, h: 4, i: '3' },
  ],
  sm: [
    { x: 0, y: 0, w: 3, h: 9, i: '0' },
    { x: 3, y: 0, w: 3, h: 5, i: '1' },
    { x: 7, y: 0, w: 3, h: 5, i: '2' },
    { x: 0, y: 7, w: 3, h: 4, i: '3' },
  ],
};

const childsTest = [
  {
    i: 0,
    render: () => 'Child Body 0',
    title: 'Title'
  },
  {
    i: 1,
    render: () => 'Child Body 1',
  },
  {
    i: 2,
    render: () => 'Child Body 2',
  },
  {
    i: 3,
    render: () => 'Child Body 3',
  },
]
const onLayoutChangeTest = () => { return; };

<div className="bg-dark">
  <Grid
    breakpoints={breakpointsTest}
    className="layout"
    childs={childsTest}
    cols={colsTest}
    layouts={layoutsTest}
    rowHeight={30}
    onLayoutChange={onLayoutChangeTest}
  />
</div>
```
