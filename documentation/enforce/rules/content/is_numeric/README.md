# Content | isNumeric

## Description
Checks if a value is a representation of a real number

## Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

## usage examples:

```js
enforce(143).isNumeric();
// true
```

```js
enforce('143').isNumeric();
// true
```

```js
enforce(143).isNumeric(false); // false

enforce("not-numeric").allOf({
    isNumeric: false
}); // true
```
