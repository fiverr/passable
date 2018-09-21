# The `test` function
The test function is a single test in your validations. It is similar to unit tests `it` or `test` function. `test` accepts the name of the test, the error message and the actual test logic. Tests can either be sync or async.

You may have multipe `test` functions validating different aspects each field, each with a different error.

```js
import passable, { enforce } from 'passable';

passable('MyForm', (test) => {

    test('name',  'should be at least 3 chars', () => {
        enforce(data.name).largerThan(2);
    });

    test('name',  'must be unique', new Promise((resolve, reject) => {
        fetch(`/userExists?name=${name}`)
            .then(res => res.json)
            .then(data => {
                if (data.exists) {
                    reject();
                } else {
                    resolve();
                }
            }
    }));

    test('age', 'must be at least 18', () => {
        enforce(data.age).largerThan(17);
    });
});
```

## Synchronous Tests
In most cases, you would want to test some already existing data value against predefined rules, for example - input field length or email regex. These kinds of validations can be performed synchronously, as they only rely on information already present for you when you initialize the test suite.

The synchronous test is simply a callback function passed as the third argument of the `test` function. If this function throws an exception or explicitly returns `false` the test is considered to be failing. Otherwise, it passes implicitly.

```js
test('name',  'should be at least 3 chars', () => {
    enforce(data.name).largerThan(2);
});
```

## Asynchronous Tests
Sometimes you would want to validate data with information from the server, for example - username availability. In these cases, you should add an async test to your suite, reaching the server before going in and performing the validation. An async test is a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object. When it *resolves*, the test passes, and when it *rejects* the test fails. An async test will not complete unless either happens.

```js
test('name',  'must be unique', new Promise((resolve, reject) => {
    fetch(`/userExists?name=${name}`)
        .then(res => res.json)
        .then(data => {
            if (data.exists) {
                reject(); // rejects and marks the test as failing
            } else {
                resolve(); // completes. doesn't mark the test as failing
            }
        }
}));
```

### Table of Contents
* [How to fail a test](./how_to_fail.md)
* [Warn only test](./warn_only_tests.md)
* [Running a specific tests](./specific.md)
