# Lang | isNotArray

## Description
Checks if a value is of any type other than `Array`.
Reverse implementation of [`isArray` (see documentation)](../is_array/README.md).

## usage examples:

```js
enforce(['hello']).isNotArray();
// false
```

```js
enforce('hello').isNotArray();
// true
```
