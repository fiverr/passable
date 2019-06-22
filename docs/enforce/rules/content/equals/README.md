# Content | Equals
> Since 7.0.0

## Description
Checks if your `enforce` value <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Strict_equality_using" target="_blank">strictly equals</a> (`===`) another.

It is not recommended to use this rule to compare arrays or objects, as it does not perform any sort of deep comparison on the value.

For numeric value comparison, you should use [numberEquals](../../size/number_equals/README.md), which coerces numeric strings into numbers before comparing.

## Arguments
* `value`: Any value you wish to check your enforced value against

## usage examples:

### Passing

```js
enforce(1).equals(1);

enforce('hello').equals('hello');

const a = [1, 2, 3];

enforce(a).equals(a);
```

### failing

```js
enforce('1').equals(1);

enforce([1, 2, 3]).equals([1, 2, 3]);
```