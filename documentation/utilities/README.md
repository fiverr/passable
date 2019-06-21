# Passable utilities and helpers

Using Passable on its own usually covers most of your needs, but sometimes you could use the following utility functions to cover the less common use cases.

## `any()`

> Since 7.1.0

Sometimes you need to have `OR` (`||`) relationship in your validations, this is tricky to do on your own, and `any()` simplifies this process.

The general rule for using `any()` in your validation is when you can say: "At least one of the following has to pass".

A good example would be: When your validated field can be either empty (not required), but when field - has to pass some validation.

### Usage
`any()` accepts an infinite number of arguments, all of which are functions. It returns a function, that when called - behaves just like a passable [`test`](../test/index.md) function callback, and it fails on [these conditions](../test/how_to_fail.md).

The only difference is - if any of the supplied tests passes, the success condition is met and `any()` returns true.

```js
import passable, { test, enforce, any } from 'passable';

const validation = (data) => passable('Checkout', () => {

    test('coupon', 'When filled, must be at least 5 chars', any(
        () => enforce(data.coupon).isEmpty(),
        () => enforce(data.coupon).longerThanOrEquals(5)
    ));
});

```

## `validate()`

> Since 5.10.0

In cases where you have only a handful of fields to validate, you might want to use `enforce`, but not wrap it with a whole passable suite. For these cases, you can use `valiate`, which can wrap enforce, and gives you back a boolean result.

### Usage

`validate` accepts one argument:

| Argument   | Type       | Required? | Description |
|------------|------------|-----------|-------------|
| `test`     | `function` | Yes       | The test function to run |

Just like the [`test`](../test/index.md) function callback, `validate` will fail your tests on [these conditions](../test/how_to_fail.md).

```js

import { validate, enforce } from 'passable';

// name = 'Eve'
const valid = validate(() => {
    enforce(name).longerThanOrEquals(5);
});

// valid = false;
```