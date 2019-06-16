# All ways to fail a `test`
With the exclusion of async tests, there are two ways of failing a test, and marking it as having a validation error:

## Throwing an Error

Throwing an error from within the `test`. Thrown errors within the `test` function are caught and handled to mark the test as failing.
```js
test('field', 'should fail by a thrown error', () => { throw new Error(); });
```
This also includes `enforce` failures, which throws when the validation criteria are not met:

```js
test('field', 'should fail by enforce', () => {
    enforce(1).greaterThan(5);
});
```

## explicitly returning `false`

Explicitly returning `false` from the `test` itself (running some logic that returns false) will fail your test. This is good especially for migration periods in which your previous validations relied on a boolean flag, and you want to quickly just copy things over.

```js
test('field', 'should explicitly fail by returning `false`', () => false);
test('field', 'should explicitly fail by returning `false`', () => data.value !== 1);
```

## Promise rejection (Async)

Since [async tests](https://fiverr.github.io/passable/test/async.html) rely on <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">Promise</a>, the way to fail the test is simply to reject it:

```js
test('Field3', 'should wait some and fail', new Promise((resolve, reject) => setTimeout(reject, 3000)));
test('Field4', 'should wait some and fail', () => new Promise((resolve, reject) => setTimeout(reject, 3000)));
```