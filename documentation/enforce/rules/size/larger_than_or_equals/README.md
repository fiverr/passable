# Size | largerThanOrEquals

## Description
Checks that your `enforce` value is larger than or equals a given number.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* object: checks against count of keys.
* array: checks against length.
* number: checks the value of the number.
* string: checks against length.

## usage examples:

```js
enforce([1]).largerThanOrEquals(1);
// true
```

```js
enforce(5).largerThanOrEquals(4);
// true
```

```js
enforce([1]).largerThanOrEquals(0);
// true
```

```js
enforce(0).largerThanOrEquals(1);
// false
```