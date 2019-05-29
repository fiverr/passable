# Size | isEmpty

## Description
Checks if your `enforce` value is empty, false, zero, null or undefined.

Expected results are:
* object: checks against count of keys (`0` is empty)
* array/string: checks against length. (`0` is empty)
* number: checks the value of the number. (`0` and `NaN` are empty)
* boolean: `false` is empty.
* undefined/null: are both empty.

## Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested


## usage examples:

```js
enforce([]).isEmpty();
// true
```

```js
enforce('').isEmpty();
// true
```

```js
enforce({}).isEmpty();
// true
```

```js
enforce(0).isEmpty();
// true
```

```js
enforce(NaN).isEmpty();
// true
```

```js
enforce(undefined).isEmpty();
// true
```

```js
enforce(null).isEmpty();
// true
```

```js
enforce(false).isEmpty();
// true
```

```js
enforce([1]).isEmpty();
// false
```

```js
enforce('1').isEmpty();
// false
```

```js
enforce({1:1}).isEmpty();
// false
```

```js
enforce(1).isEmpty();
// false
```

```js
enforce(true).isEmpty();
// false
```

```js
enforce([]).isEmpty(false); // false
```
