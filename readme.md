## LRU Cache

I was challenged recently to implement an LRU cache in javascript, and I got hung up on some of the details! This is me, thinking through the API design and implementation.

### API

```
const myLRU = new LRU(1000)
myLRU.set("key", {value: 'some', object: 'stuff'})
myLRU.get("key")
> {value: 'some', object: 'stuff'}
```
