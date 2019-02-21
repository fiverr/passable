# Size | sizeEquals

## Description
Checks that your `enforce` value equals the size of a given number.

## Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* object: checks against count of keys.
* array: checks against length.
* number: checks the value of the number.
* string: checks against length.

## usage examples:

```js
enforce([1]).sizeEquals(0);
// true
```

```js
enforce(5).sizeEquals(5);
// true
```

```js
enforce({1:1, 2:2}).sizeEquals([1, 7]);
// true
```

```js
enforce('hell').sizeEquals([1,2,3,4]);
// true
```

```js
enforce([1]).sizeEquals(2);
// false
```

```js
enforce({1:1, 2:2}).sizeEquals([1, 2, 3]);
// false
```

```js
enforce('wow!').sizeEquals([]);
// false
```

```js
enforce('').sizeEquals(7);
// false
```