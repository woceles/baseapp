Withdraw example:

```js
const handleClick = () => { alert('Withdraw'); }

<div className="bg-dark">
  <Withdraw
    currency="BTC"
    fee={0.000111}
    onClick={handleClick}
    borderItem="empty-circle"
  />
</div>
```
