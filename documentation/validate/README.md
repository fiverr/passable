# Lean tests with the `validate` function
> Since 5.10.0

Along with the more verbose `passable()` validation, passable supports a leaner syntax, aimed to bring Passable into less complex data structures, where only one field is being validated, or only a few rules are needed.

It basically serves as a simple try/catch wrapper for your code that returns a boolean.

## Usage

The `validate` function accepts one argument:

| Argument   | Type       | Required? | Description |
|------------|------------|-----------|-------------|
| `test`     | `function` | Yes       | The test function to run |

Just like the [`test`](../test/index.md) function, `validate` will fail your tests on [two situations](../test/how_to_fail.md):
* When your code throws an Error (this includes [enforce](../enforce/README.md) throws).
* When you return `false` in your test function.

If function passed, or if the function returns anything other than `false`, the test will implicitly pass.

```js

import {validate, enforce} from 'passable';

// name = 'Eve'
const valid = validate(() => {
    enforce(name).largerThanOrEquals(5);
});

// valid = false;
```

* With custom logic only
```js
import {validate} from 'passable';

// name = Danielle
const valid = validate(() => {
    return name >= 5;
});

// valid = false
```