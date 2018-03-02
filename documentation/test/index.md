# The `test` function
The test function is a single test in your validations. It is similar to unit tests `it` or `test` function. `test` accepts the name of the test, the error message and the actual test function. If you explicitly return true, or if your enforce function passed correctly, it is assumed that the test did not fail.

You can have multipe `test` functions for each field, each with a different error.

```js
Passable('MyForm', (test) => {
    test('name',  'should be ...', () => {...});
    test('name',  'should be ...', () => {...});
    test('age', 'should be ...', () => {...});
});
```

### Table of Contents
* [How to fail a test](./how_to_fail.md)
* [Warn only test](./warn_only_tests.md)
* [Running a specific tests](./specific.md)
