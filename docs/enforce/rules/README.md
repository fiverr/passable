# `enforce` rules
Enforce rules are functions that allow you to test your data against different criteria. The following rules are supported out-of-the-box

## Equals
> Since 7.0.0
### Description
Checks if your `enforce` value <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Strict_equality_using" target="_blank">strictly equals</a> (`===`) another.

It is not recommended to use this rule to compare arrays or objects, as it does not perform any sort of deep comparison on the value.

For numeric value comparison, you should use `numberEquals`, which coerces numeric strings into numbers before comparing.

### Arguments
* `value`: Any value you wish to check your enforced value against

### usage examples:

#### Passing

```js
enforce(1).equals(1);

enforce('hello').equals('hello');

const a = [1, 2, 3];

enforce(a).equals(a);
```

#### failing

```js
enforce('1').equals(1);

enforce([1, 2, 3]).equals([1, 2, 3]);
```


## Not Equals
> Since 7.0.0
### Description
Checks if your `enforce` value does not <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Strict_equality_using" target="_blank">strictly equal</a> (`===`) another.

Reverse implementation of `equals`.

### usage examples:

#### Passing

```js
enforce('1').notEquals(1);

enforce([1, 2, 3]).notEquals([1, 2, 3]);
```

#### failing
```js
enforce(1).notEquals(1);

enforce('hello').notEquals('hello');

const a = [1, 2, 3];

enforce(a).notEquals(a);
```


## isEmpty
### Description
Checks if your `enforce` value is empty, false, zero, null or undefined.

Expected results are:
* object: checks against count of keys (`0` is empty)
* array/string: checks against length. (`0` is empty)
* number: checks the value of the number. (`0` and `NaN` are empty)
* boolean: `false` is empty.
* undefined/null: are both empty.

### Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

### usage examples:

```js
enforce([]).isEmpty();
// true
```

```js
enforce('').isEmpty();
// true
```

```js
enforce({}).isEmpty();
// true
```

```js
enforce(0).isEmpty();
// true
```

```js
enforce(NaN).isEmpty();
// true
```

```js
enforce(undefined).isEmpty();
// true
```

```js
enforce(null).isEmpty();
// true
```

```js
enforce(false).isEmpty();
// true
```

```js
enforce([1]).isEmpty();
// false
```

```js
enforce('1').isEmpty();
// false
```

```js
enforce({1:1}).isEmpty();
// false
```

```js
enforce(1).isEmpty();
// false
```

```js
enforce(true).isEmpty();
// false
```

```js
enforce([]).isEmpty(false); // false
```


## isNotEmpty
### Description
Checks that your `enforce` value is not empty, false, or zero.
Reverse implementation of `isEmpty`.

### usage examples:

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


## isNumeric
### Description
Checks if a value is a representation of a real number

### Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

### usage examples:

```js
enforce(143).isNumeric();
// true
```

```js
enforce('143').isNumeric();
// true
```

```js
enforce(143).isNumeric(false); // false
```


## isNotNumeric
### Description
Checks if a value is not a representation of a real number.
Reverse implementation of `isNumeric`.

### usage examples:

```js
enforce(143).isNotNumeric();
// false
```

```js
enforce(NaN).isNotNumeric();
// true
```


## greaterThan

> Since 7.0.0

- alias: `gt()`
### Description
Checks that your numeric `enforce` value is larger than a given numeric value.

### Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

### Usage

#### Passing examples:
```js
enforce(1).greaterThan(0);
enforce('10').greaterThan(0);
enforce(900).gt('100');
```

#### Failing examples:

```js
enforce(100).greaterThan(100);
enforce('100').greaterThan(110);
enforce([100]).gt(1);
```


## greaterThanOrEquals

> Since 7.0.0

- alias: `gte()`
### Description
Checks that your numeric `enforce` value is larger than or equals to a given numeric value.

### Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

### Usage

#### Passing examples:
```js
enforce(1).greaterThanOrEquals(0);
enforce('10').greaterThanOrEquals(0);
enforce(900).greaterThanOrEquals('100');
enforce(100).greaterThanOrEquals('100');
enforce(900).gte('900');
enforce('1337').gte(1337);
```

#### Failing examples:

```js
enforce(100).greaterThanOrEquals('120');
enforce('100').greaterThanOrEquals(110);
enforce([100]).gte(1);
```


## lengthEquals
### Description
Checks that your `enforce` value is equal to the given number.

### Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

### usage examples:

#### Passing examples:
```js
enforce([1]).lengthEquals(1);
// true
```

```js
enforce('a').lengthEquals(1);
// true
```

#### Failing examples:
```js
enforce([1, 2]).lengthEquals(1);
// false
```

```js
enforce('').lengthEquals(1);
// false
```


## lengthNotEquals
### Description
Checks that your `enforce` value is not equal to the given number.
Reverse implementation of `lengthEquals`.

### Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

### usage examples:

#### Passing examples:
```js
enforce([1]).lengthNotEquals(0);
// true
```

```js
enforce('a').lengthNotEquals(3);
// true
```

#### Failing examples:
```js
enforce([1]).lengthNotEquals(1);
// false
```

```js
enforce('').lengthNotEquals(0);
// false
```


## lessThan

> Since 7.0.0

- alias: `lt()`
### Description
Checks that your numeric `enforce` value is smaller than a given numeric value.

### Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

### Usage

#### Passing examples:
```js
enforce(0).lessThan(1);
enforce(2).lessThan('10');
enforce('90').lt(100);
```

#### Failing examples:

```js
enforce(100).lessThan(100);
enforce('110').lessThan(100);
enforce([0]).lt(1);
```


## lessThanOrEquals

> Since 7.0.0

- alias: `lte()`
### Description
Checks that your numeric `enforce` value is smaller than or equals to a given numeric value.

### Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

### Usage

#### Passing examples:
```js
enforce(0).lessThanOrEquals(1);
enforce(2).lessThanOrEquals('10');
enforce('90').lte(100);
enforce(100).lte('100');
```

#### Failing examples:

```js
enforce(100).lessThanOrEquals(90);
enforce('110').lessThanOrEquals(100);
enforce([0]).lte(1);
```


## longerThan
### Description
Checks that your `enforce` value is longer than a given number.

### Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

### usage examples:

#### Passing examples:
```js
enforce([1]).longerThan(0);
// true
```

```js
enforce('ab').longerThan(1);
// true
```

#### Failing examples:
```js
enforce([1]).longerThan(2);
// false
```

```js
enforce('').longerThan(0);
// false
```


## longerThanOrEquals
### Description
Checks that your `enforce` value is longer than or equals to a given number.

### Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

### usage examples:

#### Passing examples:
```js
enforce([1]).longerThanOrEquals(0);
// true
```

```js
enforce('ab').longerThanOrEquals(1);
// true
```

```js
enforce([1]).longerThanOrEquals(1);
// true
```

```js
enforce('a').longerThanOrEquals(1);
// true
```

#### Failing examples:
```js
enforce([1]).longerThanOrEquals(2);
// false
```

```js
enforce('').longerThanOrEquals(1);
// false
```


## numberEquals

> Since 7.0.0
### Description
Checks that your numeric `enforce` value is equals another value.

### Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

### Usage

#### Passing examples:

```js
enforce(0).numberEquals(0);
enforce(2).numberEquals('2');
```

#### Failing examples:

```js
enforce(100).numberEquals(10);
enforce('110').numberEquals(100);
enforce([0]).numberEquals(1);
```


## numberNotEquals

> Since 7.0.0
### Description
Checks that your numeric `enforce` value does not equal another value.
Reverse implementation of `numberEquals`.

### Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

### Usage

#### Passing examples:

```js
enforce(2).numberNotEquals(0);
enforce('11').numberNotEquals('10');
```

#### Failing examples:

```js
enforce(100).numberNotEquals(100);
enforce('110').numberNotEquals(100);
```


## shorterThan
### Description
Checks that your `enforce` value is shorter than a given number.

### Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

### usage examples:

#### Passing examples:
```js
enforce([]).shorterThan(1);
// true
```

```js
enforce('a').shorterThan(2);
// true
```

#### Failing examples:
```js
enforce([1]).shorterThan(0);
// false
```

```js
enforce('').shorterThan(0);
// false
```


## shorterThanOrEquals
### Description
Checks that your `enforce` value is shorter than or equals to a given number.

### Arguments
* `size`: `number` | the number which you would like your initial value to be tested against.

The `value` argument can be of the following types:
* array: checks against length.
* string: checks against length.

### usage examples:

#### Passing examples:
```js
enforce([]).shorterThanOrEquals(1);
// true
```

```js
enforce('a').shorterThanOrEquals(2);
// true
```

```js
enforce([]).shorterThanOrEquals(0);
// true
```

```js
enforce('a').shorterThanOrEquals(1);
// true
```

#### Failing examples:
```js
enforce([1]).shorterThanOrEquals(0);
// false
```

```js
enforce('ab').shorterThanOrEquals(1);
// false
```


## matches
### Description
Checks if a value contains a regex match.

### Arguments
* `regexp`: either a `RegExp` object, or a RegExp valid string

### usage examples:

```js
enforce(1984).matches(/[0-9]/);
// true
```

```js
enforce(1984).matches('[0-9]');
// true
```

```js
enforce('1984').matches(/[0-9]/);
// true
```

```js
enforce('1984').matches('[0-9]');
// true
```

```js
enforce('198four').matches(/[0-9]/);
// true
```

```js
enforce('198four').matches('[0-9]');
// true
```

```js
enforce('ninety eighty four').matches(/[0-9]/);
// false
```

```js
enforce('ninety eighty four').matches('[0-9]');
// false
```


## notMatches
### Description
Checks if a value does not contain a regex match.
Reverse implementation of `matches`.

### usage examples:

```js
enforce(1984).notMatches(/[0-9]/);
// false
```

```js
enforce('ninety eighty four').notMatches('[0-9]');
// true
```


## Inside
### Description
Checks if your `enforce` value is contained in another array or string.
Your `enforce` value can be of the following types:
* `string`
* `number`
* `boolean`

### Arguments
* `container`: a `string` or an `array` which may contain the value specified.

### usage examples:

#### inside: array
Checks for membership in an array.

string: checks if a string is an element in an array

```js
enforce('hello').inside(['hello', 'world']);
//true
```

```js
enforce('hello!').inside(['hello', 'world']);
//false
```
number: checks if a number is an element in an array

```js
enforce(1).inside([1, 2]);
//true
```

```js
enforce(3).inside([1, 2]);
//false
```

boolean: checks if a number is an element in an array

```js
enforce(false).inside([true, false]);
//true
```

```js
enforce(true).inside([1,2,3]);
//false
```

#### inside: string
string: checks if a string is inside another string

```js
enforce('da').inside('tru dat.');
//true
```

```js
enforce('ad').inside('tru dat.');
//false
```


## notInside
### Description
Checks if a given value is not contained in another array or string.
Reverse implementation of `inside`.

### usage examples:

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


## isTruthy
### Description
Checks if a value is truthy; Meaning: if it can be coerced into boolean `true`.
Anything not in the following list is considered to be truthy.

* `undefined`
* `null`
* `false`
* `0`
* `NaN`
* empty string (`""`)

### Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

### usage examples:

```js
enforce(true).isTruthy();
// true
```

```js
enforce(1).isTruthy();
// true
```

```js
enforce(null).isTruthy();
// false
```

```js
enforce(undefined).isTruthy();
// false
```

```js
enforce(0).isTruthy();
// false
```

```js
enforce(true).isTruthy(false); // false
```


## isFalsy
### Description
Checks if a value is falsy; Meaning: if it can be coerced into boolean `false`.
Reverse implementation of `isTruthy`.

Anything not in the following list is considered to be truthy:
* `undefined`
* `null`
* `false`
* `0`
* `NaN`
* empty string (`""`)

### usage examples:

```js
enforce(1).isFalsy();
// false
```

```js
enforce(true).isFalsy();
// false
```

```js
enforce('hi').isFalsy();
// false
```

```js
enforce(false).isFalsy();
// true
```

```js
enforce(0).isFalsy();
// true
```

```js
enforce(undefined).isFalsy();
// true
```


## isArray
### Description
Checks if a value is of type `Array`.

### Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

### usage examples:

```js
enforce(['hello']).isArray();
// true
```

```js
enforce('hello').isArray();
// false
```

```js
enforce(['hello']).isArray(false); // false
```


## isNotArray
### Description
Checks if a value is of any type other than `Array`.
Reverse implementation of `isArray`.

### usage examples:

```js
enforce(['hello']).isNotArray();
// false
```

```js
enforce('hello').isNotArray();
// true
```


## isNumber
### Description
Checks if a value is of type `number`.

### Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

### usage examples:

```js
enforce(143).isNumber();
// true
```

```js
enforce(NaN).isNumber();
// true (NaN is of type 'number!')
```

```js
enforce(143).isNumber(false); // false
```


## isNotNumber
### Description
Checks if a value is of any type other than `number`.
Reverse implementation of `isNumber`.

### usage examples:

```js
enforce(143).isNotNumber();
// false
```

```js
enforce(NaN).isNotNumber();
// false (NaN is of type 'number!')
```

```js
enforce('143').isNotNumber();
// true
```

```js
enforce(143).isNotNumber();
// true
```


## isString
### Description
Checks if a value is of type `String`.

### Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

### usage examples:

```js
enforce('hello').isString();
// true
```

```js
enforce(['hello']).isString();
// false
```

```js
enforce(1984).isString();
// false
```

```js
enforce('hello').isString(false); // false
```


## isNotString
### Description
Checks if a value is of any type other than `String`.
Reverse implementation of `isString`.

### usage examples:

```js
enforce('hello').isNotString();
// false
```

```js
enforce(['hello']).isNotString();
// true
```


## isOdd
### Description
Checks if a value is an odd numeric value.

### usage examples:

```js
enforce('1').isOdd();
enforce(9).isOdd();
// true
```

```js
enforce(2).isOdd();
enforce('4').isOdd();
enforce('1withNumber').isOdd();
enforce([1]).isOdd();
// false
```


## isEven
### Description
Checks if a value is an odd numeric value.

### usage examples:

```js
enforce(0).isEven();
enforce('2').isEven();
// true
```

```js
enforce(1).isEven();
enforce('3').isEven();
enforce('2withNumber').isEven();
enforce([0]).isEven();
// false
```
