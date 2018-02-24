# All ways to fail a `test`
There are two ways of failing a test, and marking it as having a validation error:
* explicitly returning false from the `test` itself (running some logic that returns false).
```js
test('filed', 'should explicitly fail by false', () => false);
test('filed', 'should explicitly fail by false', () => { return 1 !== 1; });
```
* Throwing an Error from within the `test`. Thrown errors within the `test` function are caught and handled to mark the test as failing.
```js
test('filed', 'should fail by a thrown error', () => { throw new Error(); });
```
This also includes `enforce` failures, which throws on failure:

```js
test('field', 'should fail by enforce', () => {
    enforce(1).allOf({ largerThan: 5 });
});
```