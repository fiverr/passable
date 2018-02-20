# Running or skipping `specific` tests
Sometimes you want to test only a specific field out of the whole dataset. For example, when validating upon user interaction (such as input change), you probably do not need to validate all other fields as well. Similarly, you might want to **not** run the tests of specific fields, for example - fields that have not been touched by the user.

To specify which fields should or should not run, use the `specific` param. It is the third argument in the `passable()` function, and it is optional.

`specific` accepts any of the following:

| Type            | Description
|-----------------|------------
| `null`          | No `test` will be skipped (same as empty array or empty string `[] | ''`)
| `string`        | The names of the `test` function that will run. All the rest will be skipped.
| `Array<string>` | Array with the names of the `test` functions that should run. All the rest will be skipped.
| `Object`        | Allows both setting `test` functions that should run, or not run

**Remember** Using the array or string directly as your `specific` param is exactly the same as using `only`, and is provided as a shorthand to reduce clutter.

```js
passable('formName', (test) => {...}, ['field_1', 'field_2'])
// ------
passable('formName', (test) => {...}, 'field_1')
```

## `specific` object structure:
> Since 6.0.0

As noted before, The `specific` object gives you more control on which fields should be tested and which should not. It may contain any of the following keys:

| Name   | Type             | Description
|--------|------------------|-----
| `only` | `Array`/`String` | Only these `test` functions will run. The rest will be skipped
| `not`  | `Array`/`String`  | These `test` functions will be skipped. The rest will run normally

```js
passable('formName', (test) => {...}, {only: 'field_1'})
// ------
passable('formName', (test) => {...}, {only: ['field_1', 'field_2']})
// ------
passable('formName', (test) => {...}, {not: 'field_1'})
// ------
passable('formName', (test) => {...}, {not: ['field_1', 'field_2']})
```

## Production use

The easiest way to use the `specific` argument in production, is to wrap your validation with a function that passes down the fields to include, only if needed.

In the following example, only First test is going to run. Second will be skipped.
```js
// app.js
import validate from './validate.js';
const result = validate(['First'], data);

// validation.js
function validate (specific) {
    return passable('MyForm', (test) => {
        test('First',  'should pass', () => {...});
        test('Second', 'should be skipped', () => {...});
    }, specific);
};
```