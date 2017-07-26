# largerThan

## Description
Returns true if a given value is larger than another value. The values do not have to be of the same type

## Arguments
* `value`: the value which you would like to test. can be:
* `target` the value which you woul like your initial object to be tested against

Both arguments can be of the following types:
* object: checks against count of keys
* array: checks against length
* number: checks the value of the number
* string: checks against length

## Response
The largerThan rule returns a boolean. `true` for larger values

## usage examples:

```js
enforce([1]).allOf({
    largerThan: 0
});
// true
```

```js
enforce(6).allOf({
    largerThan: 5
});
// true
```

```js
enforce({1:1, 2:2}).allOf({
    largerThan: [1]
});
// true
```

```js
enforce('hell').allOf({
    largerThan: []
});
// true
```

```js
enforce([1]).allOf({
    largerThan: 1
});
// false
```

```js
enforce({1:1, 2:2}).allOf({
    largerThan: [1, 2]
});
// false
```

```js
enforce('').allOf({
    largerThan: []
});
// false
```

```js
enforce('').allOf({
    largerThan: 0
});
// false
```