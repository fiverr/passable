# All ways to fail a `pass`
There are three ways of failing a pass, and marking it as having a validation error:
* Having an `enforce` function which ends up failing.
```js
pass('field', 'should fail by enforce', () => {
    enforce(1).allOf({ largerThan: 5 });
});
```
* explicitly returning false from the `pass` itself (running some logic that returns false).
```js
pass('filed', 'should explicitly fail by false', () => false);
pass('filed', 'should explicitly fail by false', () => { return 1 !== 1; });
```
* Throwing an Error from within the `pass`. Thrown errors within the `pass` function are caught and handled to mark the pass as failing.
```js
pass('filed', 'should fail by a thrown error', () => { throw new Error(); });
```