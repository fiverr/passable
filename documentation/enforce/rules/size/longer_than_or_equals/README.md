# Size | longerThanOrEquals

## Description
Checks that your `enforce` value is longer than or equals to a given number.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

## usage examples:

### Passing examples:
```js
enforce([1]).longerThanOrEquals(0);
// true
```

```js
enforce('ab').longerThanOrEquals(1);
// true
```

```js
enforce([1]).longerThanOrEquals(1);
// true
```

```js
enforce('a').longerThanOrEquals(1);
// true
```

### Failing examples:
```js
enforce([1]).longerThanOrEquals(2);
// false
```

```js
enforce('').longerThanOrEquals(1);
// false
```

```js
enforce(1).longerThanOrEquals(0);
// undefined
```