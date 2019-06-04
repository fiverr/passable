# Lang | isNotString

## Description
Checks if a value is of any type other than `String`.
Reverse implementation of [`isString` (see documentation)](../is_string/README.md).

## usage examples:

```js
enforce('hello').isNotString();
// false
```

```js
enforce(['hello']).isNotString();
// true
```
