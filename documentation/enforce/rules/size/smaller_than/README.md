# Size | smallerThan

## Description
Checks that your `enforce` value is smaller than a given number.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* object: checks against count of keys.
* array: checks against length.
* number: checks the value of the number.
* string: checks against length.

## usage examples:

```js
enforce([]).smallerThan(1);
// true
```

```js
enforce(5).smallerThan(6);
// true
```

```js
enforce([1]).smallerThan(1);
// false
```

```js
enforce('').smallerThan(0);
// false
```