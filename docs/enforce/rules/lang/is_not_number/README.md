# Lang | isNotNumber

## Description
Checks if a value is of any type other than `number`.
Reverse implementation of [`isNumber` (see documentation)](../is_number/README.md).

## usage examples:

```js
enforce(143).isNotNumber();
// false
```

```js
enforce(NaN).isNotNumber();
// false (NaN is of type 'number!')
```

```js
enforce('143').isNotNumber();
// true
```

```js
enforce(143).isNotNumber();
// true
```

