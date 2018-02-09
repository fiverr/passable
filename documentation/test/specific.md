# Running or skipping `specific` tests
Sometimes you want to test only a specific field out of the whole form. For example, when validating upon user interaction (such as on input change), you probably do not want to validate all other fields as well. Similarly, you might want to **not** run the tests of specific fields, for example - fields that have not been touched by the user.

To specify which fields should or should not run, use the `specific` param. It accepts any of the following:

| Type            | Description
|-----------------|------------
| `null`          | No `test` will be skipped (same as empty array or empty string `[] | ''`)
| `string`        | The names of the `test` function that will run. All the rest will be skipped.
| `Array<string>` | Array with the names of the `test` functions that should run. All the rest will be skipped.
| `Object`        | Allows both setting `test` functions that should run, or not run

**Remember** Using the array or string directly as your `specific` param is exactly the same as using `only`, and is provided as a shorthand to reduce clutter.

```js
passable('formName', ['field_1', 'field_2'], (test) => {...})
// ------
passable('formName', 'field_1', (test) => {...})
```

## `specific` object structure:
> Since 6.0.0

As noted before, The `specific` object gives you more control on which fields should be tested and which should not. It may contain any of the following keys:

| Name   | Type             | Description
|--------|------------------|-----
| `only` | `Array`/`String` | Only these `test` functions will run. The rest will be skipped
| `not`  | `Array`/`String`  | These `test` functions will be skipped. The rest will run normally

```js
passable('formName', {only: 'field_1'}, (test) => {...})
// ------
passable('formName', {only: ['field_1', 'field_2']}, (test) => {...})
// ------
passable('formName', {not: 'field_1'}, (test) => {...})
// ------
passable('formName', {not: ['field_1', 'field_2']}, (test) => {...})
```

## Production use

The easiest way to use the `specific` argument in production, is to wrap your validation with a function that passes down the fields to include, only if needed.

In the following example, only First test is going to run. Second will be skipped.
```js
const result = validate(['First'], data);

function validate (specific) {
    return Passable('MyForm', specific, (test) => {
        test('First',  'should pass', () => {...});
        test('Second', 'should be skipped', () => {...});
    });
};
```