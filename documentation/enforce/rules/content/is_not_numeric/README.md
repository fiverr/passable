# Content | isNotNumeric

## Description
Checks if a value is not a representation of a real number.
Reverse implementation of [`isNumeric` (see documentation)](../isNumeric/README.md).

## usage examples:

```js
enforce(143).isNotNumeric();
// false
```

```js
enforce(NaN).isNotNumeric();
// true
```