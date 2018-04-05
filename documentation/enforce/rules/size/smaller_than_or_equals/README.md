# Size | smallerThanOrEquals

## Description
Checks that your `enforce` value is smaller than or equals another value.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* object: checks against count of keys.
* array: checks against length.
* number: checks the value of the number.
* string: checks against length.

## usage examples:

```js
enforce([]).smallerThanOrEquals(1);
// true
```

```js
enforce(5).smallerThanOrEquals(6);
// true
```

```js
enforce([1]).smallerThanOrEquals(1);
// true
```

```js
enforce('0').smallerThanOrEquals(0);
// false
```