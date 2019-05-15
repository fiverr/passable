# Size | greaterThanOrEquals

## Description
Checks that your numeric `enforce` value is larger than or equals to a given numeric value.

## Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

## Usage

### Passing examples:
```js
enforce(1).greaterThanOrEquals(0);
enforce('10').greaterThanOrEquals(0);
enforce(900).greaterThanOrEquals('100');
enforce(900).greaterThanOrEquals('100');
enforce(900).greaterThanOrEquals('900');
enforce('1337').greaterThanOrEquals(1337);
```


### Failing examples:

```js
enforce(100).greaterThanOrEquals('120');
enforce('100').greaterThanOrEquals(110);
enforce([100]).greaterThanOrEquals(1);
```