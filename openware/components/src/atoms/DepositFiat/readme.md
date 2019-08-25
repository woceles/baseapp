DepositFiat example:

```js
const description = `
  Please use information below to complete you bank payment.
  Your deposit will be reflected in your account within two business days.
`;

const testData = [
  {
    key: 'Bank Name',
    value: 'Diamant Bank',
  },
  {
    key: 'Account number',
    value: '1036272',
  },
  {
    key: 'Account name',
    value: 'account_name',
  },
  {
    key: 'Phone number',
    value: '+432 0965 95',
  },
  {
    key: 'Your Reference code',
    value: '123456',
  },
];

<DepositFiat
  data={testData}
  description={description}
  title="You can deposit in bank on this credential"
/>

```
