# The response object

## Properties
| Name                             | Type       | Description                                         |
|----------------------------------|------------|-----------------------------------------------------|
| `name`                           | `String`   | The name of the form being validated                |
| `hasValidationErrors`            | `Boolean`  | Whether there are validation errors or not          |
| `hasValidationWarnings`          | `Boolean`  | Whether there are validation warnings or not        |
| `failCount`                      | `Number`   | Overall errors count for this form                  |
| `warnCount`                      | `Number`   | Overall warnings count for this form                |
| `testCount`                      | `Number`   | Overall test count in this form                     |
| `testsPerformed`                 | `Object{}` | Detailed stats per field (structure detailed below) |
| `validationErrors`               | `Object[]` | Actual errors per each field                        |
| `validationErrors[field-name]`   | `Object[]` | All error strings for this field                    |
| `validationWarnings`             | `Object[]` | Actual errors per each field                        |
| `validationWarnings[field-name]` | `Object[]` | All warning strings for this field                  |
| `skipped`                        | `Array`    | All skipped fields (empty, unless the `specific` option is used) |

### `testsPerformed` field structure
| Name        | Type     | Description                           |
|-------------|----------|---------------------------------------|
| `failCount` | `Number` | Overall errors count for this field   |
| `warnCount` | `Number` | Overall warnings count for this field |
| `testCount` | `Number` | Overall test count in this field      |

## Why No `isValid` prop?
There is **no** `isValid` prop, this is by design. Passable cannot know your business logic, nor can it ever assume that `0` errors means valid response. `0` errors can be due to skipped fields. Same goes for isInvalid. Even though, usually, errors mean invalidity, it is not always the case. This is why Passable gives you all the information about the tests, but it is your job to decide whether it means that the validation failed or not.

## ![success](../assets/img/success.svg "success") Passing Example
```js
{
  "name": "NewUserForm",
  "hasValidationErrors": false,
  "hasValidationWarnings": false,
  "failCount": 0,
  "warnCount": 0,
  "testCount": 2,
  "testsPerformed": {
    "username": {
      "testCount": 1,
      "failCount": 0,
      "warnCount": 0
    },
    "age": {
      "testCount": 1,
      "failCount": 0,
      "warnCount": 0
    }
  },
  "validationErrors": {},
  "validationWarnings": {},
  "skipped": []
}
```

## ![error](../assets/img/error.svg "error") Failing Example
```js
{
  "name": "NewUserForm",
  "hasValidationErrors": true,
  "hasValidationWarnings": false,
  "failCount": 2,
  "warnCount": 0,
  "testCount": 2,
  "testsPerformed": {
    "username": {
      "testCount": 1,
      "failCount": 1,
      "warnCount": 0
    },
    "age": {
      "testCount": 1,
      "failCount": 1,
      "warnCount": 0
    }
  },
  "validationErrors": {
    "username": [
      "Must be a string between 2 and 10 chars"
    ],
    "age": [
      "Can either be empty, or larger than 18"
    ]
  },
  "validationWarnings": {},
  "skipped": []
}
```
