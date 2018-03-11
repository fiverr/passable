# Content | notInside

## Description
Checks if a given value is not contained in another array or string.
Reverse implementation of [`inside` (see documentation)](../inside/README.md).

## usage examples:

```js
enforce('hello').notInside(['hello', 'world']);
// false
```

```js
enforce('hello!').notInside(['hello', 'world']);
// true
```

```js
enforce('da').notInside('tru dat.');
// false
```

```js
enforce('ad').notInside('tru dat.');
// true
```