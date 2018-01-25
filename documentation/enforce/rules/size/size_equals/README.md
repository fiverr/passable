# Size | sizeEquals

## Description
Returns true if a given value equals the size than another value. The values do not have to be of the same type

## Arguments
* `value`: the value which you would like to test. can be:
* `target` the value which you would like your initial object to be tested against

Both arguments can be of the following types:
* object: checks against count of keys
* array: checks against length
* number: checks the value of the number
* string: checks against length

## Response
The sizeEquals rule returns a boolean. `true` for equals values

## usage examples:

```js
enforce([1]).sizeEquals(0);
// true
```

```js
enforce(5).sizeEquals(5);
// true
```

```js
enforce({1:1, 2:2}).sizeEquals([1, 7]);
// true
```

```js
enforce('hell').sizeEquals([1,2,3,4]);
// true
```

```js
enforce([1]).sizeEquals(2);
// false
```

```js
enforce({1:1, 2:2}).sizeEquals([1, 2, 3]);
// false
```

```js
enforce('wow!').sizeEquals([]);
// false
```

```js
enforce('').sizeEquals(7);
// false
```