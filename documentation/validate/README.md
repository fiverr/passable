# Lean tests with the `validate` function
> Since 5.10.0

Along with the more verbose `Passable()` validation, passable supports a leaner syntax, aimed to bring Passable into less complex forms, where only one field is being validated, or that only a few rules are needed.

## Usage

The `validate` function accepts two arguments:

| Argument   | Type       | Required? | Description |
|------------|------------|-----------|-------------|
| `message`  | `string`   | No        | The error to display on failure |
| `test`     | `function` | Yes       | The test function to run |

Just like the [test](../test/index.md) function, `validate` will fail your tests on [three situations](../test/how_to_fail.md):
* When your enforce statement fails.
* When your code throws an Error.
* When you return `false` in your test function.

If function passed, or if the function returns anything other than `false`, the test will implicitly pass.

* With [enforce](../enforce/README.md)
```js

import {validate, enforce} from 'passable';

// name = 'Eve'
const validity = validate('Must be at least 5 chars', () => {
    enforce(name).largerThanOrEquals(5);
});

// validity = {
//     valid: false,
//     message: 'Must be at least 5 chars'
// }

--

// without a message:
const validity = validate(() => {
    enforce(name).largerThanOrEquals(5);
});

// validity = {
//     valid: false
// }
```

* With custom logic only
```js
import {validate} from 'passable';

// name = Danielle
const validity = validate('Must be at least 5 chars', () => {
    return name >= 5;
});

// validity = {
//     valid: true
// }
```

## The response object
`validate`'s response object can have two properties:

| Property | Type    | Description |
|----------|---------|-------------|
| `valid`    | `boolean` | Whether the validation passed successfully or not |
| `message`  | `string`  | Displays the error message specified by the consumer when the validation fails. Omitted on success. |