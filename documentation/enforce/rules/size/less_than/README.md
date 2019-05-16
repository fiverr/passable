# Size | lessThan

> Since 7.0.0

- alias: `lt()`

## Description
Checks that your numeric `enforce` value is smaller than a given numeric value.

## Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

## Usage

### Passing examples:
```js
enforce(0).lessThan(1);
enforce(2).lessThan('10');
enforce('90').lt(100);
```


### Failing examples:

```js
enforce(100).lessThan(100);
enforce('110').lessThan(100);
enforce([0]).lt(1);
```