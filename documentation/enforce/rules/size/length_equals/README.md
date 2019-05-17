# Size | lengthEquals

## Description
Checks that your `enforce` value is equal to the given number.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

## usage examples:

### Passing examples:
```js
enforce([1]).lengthEquals(1);
// true
```

```js
enforce('a').lengthEquals(1);
// true
```

### Failing examples:
```js
enforce([1, 2]).lengthEquals(1);
// false
```

```js
enforce('').lengthEquals(1);
// false
```