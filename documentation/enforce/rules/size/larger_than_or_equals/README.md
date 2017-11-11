# Size | largerThanOrEquals

## Description
Returns true if a given value is larger than or equals another value. The values do not have to be of the same type

## Arguments
* `value`: the value which you would like to test. can be:
* `target` the value which you would like your initial object to be tested against

Both arguments can be of the following types:
* object: checks against count of keys
* array: checks against length
* number: checks the value of the number
* string: checks against length

## Response
The largerThanOrEquals rule returns a boolean. `true` for larger or equal values

## usage examples:

```js
enforce([1]).allOf({
    largerThanOrEquals: 1
});
// true
```

```js
enforce(5).allOf({
    largerThanOrEquals: 4
});
// true
```

```js
enforce({1:1, 2:2, 3:3}).allOf({
    largerThanOrEquals: [1,2,3]
});
// true
```

```js
enforce('hell').allOf({
    largerThanOrEquals: [1,2,3]
});
// true
```

```js
enforce([1]).allOf({
    largerThanOrEquals: 0
});
// true
```

```js
enforce({1:1}).allOf({
    largerThanOrEquals: [1, 2]
});
// false
```

```js
enforce('yo').allOf({
    largerThanOrEquals: ['y', 'o', 'u']
});
// false
```

```js
enforce(0).allOf({
    largerThanOrEquals: 1
});
// false
```