# Size | largerThan

## Description
Checks that your `enforce` value is larger than a given number.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* object: checks against count of keys.
* array: checks against length.
* number: checks the value of the number.
* string: checks against length.

## usage examples:

```js
enforce([1]).largerThan(0);
// true
```

```js
enforce(6).largerThan(5);
// true
```

```js
enforce([1]).largerThan(1);
// false
```

```js
enforce('').largerThan(0);
// false
```