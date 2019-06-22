# Warn only `test`
By default, a failing `test` will set `.hasErrors()` to `true`. Sometimes you need to set a warn-only validation test (password strength, for example). In this case, you would add the `WARN` flag to your test function as the last argument.
WARN validations work exactly the same. The only thing different is that the result will be stored under `warnings` instead of `errors`, and `.hasWarnings()` will return true.

If no flag is added, your test function will default to `FAIL`. The `WARN` and `FAIL` flags are constants exported from passable.

```js
// es6 imports
import passable, { WARN } from 'passable';

// es5
const passable = require('passable');
const WARN = passable.WARN;
```

Use it like this:

```js
import passable, { WARN, enforce } from 'passable';

const result = passable('WarnAndPass', (test) => {
    test('WarnMe', 'Should warn and not fail', () => {
        enforce(5).greaterThan(500);
    }, WARN);
});

result.hasWarnings();            // true
result.hasWarnings('WarnMe');    // true
result.hasErrors();              // false
```

You may also use the values directly from the result object.
```js
{
    name: 'WarnAndPass',
    skipped: [],
    testsPerformed: {
        WarnMe: {
            testCount: 1,
            failCount: 0,
            warnCount: 1
        }
    },
    errors: {},
    warnings: {
        WarnMe: [
            'Should warn and not fail'
        ]
    },
    failCount: 0,
    warnCount: 1,
    testCount: 1
}
```