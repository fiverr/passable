# Asynchronous Tests

Sometimes you would want to validate data with information from the server, for example - username availability. In these cases, you should add an async test to your suite, reaching the server before going in and performing the validation. An async test is a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object. When it *resolves*, the test passes, and when it *rejects* the test fails. An async test will not complete unless either happens.

There are two ways to perform an async test. One, is by passing a promise as your test, and the other by returning a promise from your test function.

## Passing a Promise directly

```js
test('name', 'must be unique', new Promise((resolve, reject) => {
    fetch(`/userExists?name=${name}`)
        .then(res => res.json)
        .then(data => {
            if (data.exists) {
                reject(); // rejects and marks the test as failing
            } else {
                resolve(); // completes. doesn't mark the test as failing
            }
        });
}));
```

## Returning a Promise / Async/Await

```js
test('name',  'Should be unique', async () => {
    const res = await doesUserExist(user);
    return res;
});

test('name',  'I fail', async () => Promise.reject());
```

## Rejecting with rejection message

What if your promise can reject with different messages? No problem!
You can reject the promise with your own message by passing it to the
rejection callback.

Notice that when using rejection messages we do not need to pass `statement`
argument to `test`. This means that the statement will always be inferred
from the rejection message.

In case you do pass `statement`, it will serve as a fallback message in any
case that the rejection message is not provided.

```js
test('name', new Promise((resolve, reject) => {
    fetch(`/checkUsername?name=${name}`)
        .then(res => res.json)
        .then(data => {
            if (data.status === 'fail') {
                reject(data.message); // rejects with message and marks the test as failing
            } else {
                resolve(); // completes. doesn't mark the test as failing
            }
        });
}));
```