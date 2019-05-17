# Size | shorterThan

## Description
Checks that your `enforce` value is shorter than a given number.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

## usage examples:

### Passing examples:
```js
enforce([]).shorterThan(1);
// true
```

```js
enforce('a').shorterThan(2);
// true
```

### Failing examples:
```js
enforce([1]).shorterThan(0);
// false
```

```js
enforce('').shorterThan(0);
// false
```

```js
enforce(1).shorterThan(0);
// undefined
```