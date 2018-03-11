# Size | isNotEmpty

## Description
Returns true if a given value is not empty, false, or zero.
Reverse implementation of [`isEmpty` (see documentation)](../is_empty/README.md).

## usage examples:

```js
enforce([1]).isNotEmpty();
// true
```

```js
enforce('1').isNotEmpty();
// true
```

```js
enforce({1:1}).isNotEmpty();
// true
```

```js
enforce([]).isNotEmpty();
// false
```

```js
enforce('').isNotEmpty();
// false
```

```js
enforce({}).isNotEmpty();
// false
```

```js
enforce(0).isNotEmpty();
// false
```