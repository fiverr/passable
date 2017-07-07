# [RULE] - sizeEquals

## Description
Returns true if a given value eauqls the size than another value. The values do not have to be of the same type

## Arguments
* `value`: the value which you would like to test. can be:
* `target` the value which you woul like your initial object to be tested against

Both arguments can be of the following types:
* object: checks against count of keys
* array: checks against length
* number: checks the value of the number
* string: checks against length

## Response
The sizeEquals rule returns a boolean. `true` for equals values

## usage examples:

```js
enforce([1]).allOf({
    sizeEquals: 0
});
// true
```

```js
enforce(5).allOf({
    sizeEquals: 5
});
// true
```

```js
enforce({1:1, 2:2}).allOf({
    sizeEquals: [1, 7]
});
// true
```

```js
enforce('hell').allOf({
    sizeEquals: [1,2,3,4]
});
// true
```

```js
enforce([1]).allOf({
    sizeEquals: 2
});
// false
```

```js
enforce({1:1, 2:2}).allOf({
    sizeEquals: [1, 2, 3]
});
// false
```

```js
enforce('wow!').allOf({
    sizeEquals: []
});
// false
```

```js
enforce('').allOf({
    sizeEquals: 7
});
// false
```