# Lang | isArray

## Description
Checks if a value is of type `Array`.

## Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

## usage examples:

```js
enforce(['hello']).isArray();
// true
```

```js
enforce('hello').isArray();
// false
```

```js
enforce(['hello']).isArray(false); // false

enforce(['hello']).allOf({
    isArray: false
});
// false
```