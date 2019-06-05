# Content | Not Equals
> Since 7.0.0

## Description
Checks if your `enforce` value does not <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Strict_equality_using" target="_blank">strictly equal</a> (`===`) another.

Reverse implementation of [`equals` (see documentation)](../equals/README.md).

## usage examples:

### Passing

```js
enforce('1').notEquals(1);

enforce([1, 2, 3]).notEquals([1, 2, 3]);
```

### failing
```js
enforce(1).notEquals(1);

enforce('hello').notEquals('hello');

const a = [1, 2, 3];

enforce(a).notEquals(a);
```