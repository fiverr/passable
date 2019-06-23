# The `test` function
The test function is a single test in your validations. It is similar to unit tests `it` or `test` function. `test` accepts the name of the test, the error message and the actual test logic. Tests can either be sync or async.

You may have multipe `test` functions validating different aspects each field, each with a different error.

You can access Passable's test function in two ways
## Import it directly from passable

> Since 7.1.0

Importing `test` directly is the preferred way to consume it, as it resembles unit testing frameworks the most.

```js
import passable, { enforce, test } from 'passable';

passable('MyForm', () => {

    test('name',  'should be at least 3 chars', () => {
        enforce(data.name).longerThanOrEquals(3);
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
        enforce(data.age).greaterThanOrEquals(18);
    });
});
```

## As the first argument to your tests suite

> Since 5.0.0

This option is the least preferred way to use test, and it is likely to be removed in future major versions.


```js
import passable, { enforce } from 'passable';

passable('MyForm', (test) => {

    test('name',  'should be at least 3 chars', () => {
        enforce(data.name).longerThanOrEquals(3);
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
        enforce(data.age).greaterThanOrEquals(18);
    });
});
```


## Synchronous Tests
In most cases, you would want to test some already existing data value against predefined rules, for example - input field length or email regex. These kinds of validations can be performed synchronously, as they only rely on information already present for you when you initialize the test suite.

The synchronous test is simply a callback function passed as the third argument of the `test` function. If this function throws an exception or explicitly returns `false` the test is considered to be failing. Otherwise, it passes implicitly.

```js
test('name',  'should be at least 3 chars', () => {
    enforce(data.name).longerThan(2);
});
```

### Table of Contents
* [Async tests](./async.md)
* [How to fail a test](./how_to_fail.md)
* [Warn only test](./warn_only_tests.md)
* [Running a specific tests](./specific.md)
