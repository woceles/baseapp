```js
const orders = [
  ['13:50', 'bid', '1,442.43', '4,323.04', ''],
  ['13:50', 'ask', '1,442.43', '44,323.12', ''],
  ['13:50', 'ask', '1,442.43', '4,323.23', ''],
  ['13:50', 'bid', '1,442.43', '543.33', ''],
];

const onCancel = (index) => { console.log(index) };

<OpenOrders data={orders} onCancel={onCancel} />
```
