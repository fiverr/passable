# Size | sizeNotEquals

## Description
Returns true if a given value does not equal the size than another value. The values do not have to be of the same type.
Reverse implementation of [`sizeEquals` (see documentation)](../size_equals/README.md).

## usage examples:

```js
enforce([1]).sizeNotEquals(2);
// true
```

```js
enforce('wow!').sizeNotEquals([]);
// true
```

```js
enforce([1]).sizeNotEquals(0);
// false
```

```js
enforce({1:1, 2:2}).sizeNotEquals([1, 7]);
// false
```