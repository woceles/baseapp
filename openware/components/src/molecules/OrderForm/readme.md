OrderForm example:

```js
const orderTypes = [
    'Market',
    'Limit',
];

const onSubmit = () => console.log('submit');

<OrderForm
    fee={1}
    priceMarket="5"
    type="buy"
    from="btc"
    to="eth"
    onSubmit={onSubmit}
    orderTypes={orderTypes}
/>
```
