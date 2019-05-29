# Lang | isNumber

## Description
Checks if a value is of type `number`.

## Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

## usage examples:

```js
enforce(143).isNumber();
// true
```

```js
enforce(NaN).isNumber();
// true (NaN is of type 'number!')
```

```js
enforce(143).isNumber(false); // false
```