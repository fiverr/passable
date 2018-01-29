# The `pass` function
The pass function is a single test in your validations. It is similar to unit tests `it` function. `pass` accepts the name of the test, the error message and the actual test function. If you explicitly return true, or if your enforce function passed correctly, it is assumed that the pass is true.

You can have multipe `pass` functions for each field, each with a different error.

```js
Passable('MyForm', (pass) => {
    pass('name',  'should be ...', () => {...});
    pass('name',  'should be ...', () => {...});
    pass('age', 'should be ...', () => {...});
});
```

### Table of Contents
* [How to fail a pass](./how_to_fail.md)
* [Warn only passes](./warn_only_passes.md)
* [Running a specific pass](./specific.md)
