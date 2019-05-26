# Size | lengthNotEquals

## Description
Checks that your `enforce` value is not equal to the given number.
Reverse implementation of [`lengthEquals` (see documentation)](../length_equals/README.md).

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

## usage examples:

### Passing examples:
```js
enforce([1]).lengthNotEquals(0);
// true
```

```js
enforce('a').lengthNotEquals(3);
// true
```

### Failing examples:
```js
enforce([1]).lengthNotEquals(1);
// false
```

```js
enforce('').lengthNotEquals(0);
// false
```