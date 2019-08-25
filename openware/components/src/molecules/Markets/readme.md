```js
const data = [
  ['ETH / BTC', '0.0710000'],
  ['XPR / BTC', '0.0710000'],
  ['XPR / LTC', '0.0710000'],
  ['USDT / BTC', '0.0710000'],
  ['LTC / BTC', '0.0710000'],
];

const onSelect = (index) => console.log(index);

<Markets data={data} onSelect={onSelect} />
```