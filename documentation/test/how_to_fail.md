# All ways to fail a `test`
With the exclusion of async tests, there are two ways of failing a test, and marking it as having a validation error:

* explicitly returning false from the `test` itself (running some logic that returns false).
```js
test('field', 'should explicitly fail by returning `false`', () => false);
test('field', 'should explicitly fail by returning `false`', () => data.value !== 1);
```
* Throwing an Error from within the `test`. Thrown errors within the `test` function are caught and handled to mark the test as failing.
```js
test('field', 'should fail by a thrown error', () => { throw new Error(); });
```
This also includes `enforce` failures, which throws when the validation criteria are not met:

```js
test('field', 'should fail by enforce', () => {
    enforce(1).largerThan(5);
});
```

## Failing an async test
Since async test is not a function, but a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), the way to fail the test is simply to reject the promise:

```js
test('Field3', 'should wait some and fail', new Promise((resolve, reject) => setTimeout(reject, 3000)));
```