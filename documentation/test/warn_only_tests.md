# Warn only `test`
By default, a failing `test` will set `hasValidationErrors` to `true`. Sometimes you would want to set a warn-only validation test (password strength, for example). In this case, you would add the `WARN` flag to your test function as the last argument.
WARN validations work exactly the same. The only thing different is that the result will be stored under `validationWarnings` instead of `validationErrors`.
In case of a failure, `hasValidationErrors` stays unchanged (other tests may have set it to `true`), the field's `hasValidationWarnings` is set to `true`. It will also bump up `warnCount`.

If no flag is added, your test function will default to `FAIL`.

The `WARN` and `FAIL` flags are constants shipped with passable. You may use the strings `'warn'` and `'fail'`, but for guranteed future compatibility, it is best you use these exports.

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

passable('WarnAndPass', [], (test) => {
    test('WarnMe', 'Should warn and not fail', () => {
        enforce(5).largerThan(500);
    }, WARN);
});
```

Will result in the following object:
```js
{
    name: 'WarnAndPass',
    skipped: [],
    hasValidationErrors: false,
    hasValidationWarnings: true,
    testsPerformed: {
        WarnMe: {
            testCount: 1,
            failCount: 0,
            warnCount: 1
        }
    },
    validationErrors: {},
    validationWarnings: {
        WarnMe: [
            'Should warn and not fail'
        ]
    },
    failCount: 0,
    warnCount: 1,
    testCount: 1
}
```