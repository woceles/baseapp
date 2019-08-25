Market information header example:
```js
const testPairs = [
    'BTC/USDT',
    'USD/ETH',
    'EUR/USDT',
];

const testValues = [
    {
      lastTradePrice: 9168.2,
      lastTradeCurrency: 'usdt',
      hourPrice: 10.05,
      hourPriceChange: '+',
      hourValue: 2.345,
      hourValueCurrency: 'btc',
    },
    {
      lastTradePrice: 2468.2,
      lastTradeCurrency: 'eth',
      hourPrice: 9.05,
      hourPriceChange: '-',
      hourValue: 3.565,
      hourValueCurrency: 'usd',
    },
    {
      lastTradePrice: 5364.2,
      lastTradeCurrency: 'usdt',
      hourPrice: 19.05,
      hourPriceChange: '+',
      hourValue: 7.265,
      hourValueCurrency: 'eur',
    }, 
];


<MarketInfo marketPairs={testPairs} marketValues={testValues}/>
```