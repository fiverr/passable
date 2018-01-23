# Size | smallerThan

## Description
Returns true if a given value is smaller than another value. The values do not have to be of the same type

## Arguments
* `value`: the value which you would like to test. can be:
* `target` the value which you would like your initial object to be tested against

Both arguments can be of the following types:
* object: checks against count of keys
* array: checks against length
* number: checks the value of the number
* string: checks against length

## Response
The smallerThan rule returns a boolean. `true` for smaller values

## usage examples:

```js
enforce([]).smallerThan(1);
// true
```

```js
enforce(5).smallerThan(6);
// true
```

```js
enforce({1:1, 2:2}).smallerThan([1,2,3]);
// true
```

```js
enforce('hell').smallerThan([1,2,3,4,5,6]);
// true
```

```js
enforce([1]).smallerThan(1);
// false
```

```js
enforce({1:1, 2:2}).smallerThan([1, 2]);
// false
```

```js
enforce('').smallerThan([]);
// false
```

```js
enforce('').smallerThan(0);
// false
```