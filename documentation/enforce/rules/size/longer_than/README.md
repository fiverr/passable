# Size | longerThan

## Description
Checks that your `enforce` value is longer than a given number.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

## usage examples:

### Passing examples:
```js
enforce([1]).longerThan(0);
// true
```

```js
enforce('ab').longerThan(1);
// true
```

### Failing examples:
```js
enforce([1]).longerThan(2);
// false
```

```js
enforce('').longerThan(0);
// false
```

```js
enforce(1).longerThan(0);
// undefined
```