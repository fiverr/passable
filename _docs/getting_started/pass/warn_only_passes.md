# Warn only `pass`
By default, a failing `pass` will set `hasValidationErrors` to `true`. Sometimes you would want to set a warn-only validation test (password strength, for example). In this case, you would add the 'warn' flag to your pass function.
This will leave `hasValidationErrors` unchanged (other tests may have set it to `true`), and update `hasValidationWarnings` to `true`. It will also bump up `warnCount`.

If no flag is added, your pass function will default to `fail`.

```
Passable('WarnAndPass', (pass, enforce) => {
    pass('WarnMe', 'Should warn and not fail', 'warn', () => false);
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