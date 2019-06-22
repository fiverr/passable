# Size | shorterThanOrEquals

## Description
Checks that your `enforce` value is shorter than or equals to a given number.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

## usage examples:

### Passing examples:
```js
enforce([]).shorterThanOrEquals(1);
// true
```

```js
enforce('a').shorterThanOrEquals(2);
// true
```

```js
enforce([]).shorterThanOrEquals(0);
// true
```

```js
enforce('a').shorterThanOrEquals(1);
// true
```

### Failing examples:
```js
enforce([1]).shorterThanOrEquals(0);
// false
```

```js
enforce('ab').shorterThanOrEquals(1);
// false
```
