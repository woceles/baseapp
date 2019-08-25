WalletList example:

```js
const fixtures = require("./fixtures");

const onWalletSelectionChange = (wallet) => console.log(wallet);
<WalletList onWalletSelectionChange={onWalletSelectionChange} walletItems={fixtures.walletItems(10)}/>
```