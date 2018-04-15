# Lang | isString

## Description
Checks if a value is of type `String`.

## Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

## usage examples:

```js
enforce('hello').isString();
// true
```

```js
enforce(['hello']).isString();
// false
```

```js
enforce(1984).isString();
// false
```

```js
enforce('hello').isString(false); // false
enforce([]).allOf({
    isString: false
}); // true
```
