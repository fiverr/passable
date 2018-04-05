# Size | sizeNotEquals

## Description
Checks that your `enforce` value does not equal the size of a given number.
Reverse implementation of [`sizeEquals` (see documentation)](../size_equals/README.md).

## usage examples:

```js
enforce([1]).sizeNotEquals(2);
// true
```

```js
enforce([1]).sizeNotEquals(0);
// false
```