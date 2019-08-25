Order example:

```js
const onSubmit = (value) => console.log(value);

<Order
  feeBuy={0.0001}
  feeSell={0.0002}
  onSubmit={onSubmit}
  priceMarketBuy={5}
  priceMarketSell={10}
  from="btc"
  to="eth"
/>
```
