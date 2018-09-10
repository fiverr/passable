# The `.done()` function

The `.done()` function is a function that can be chaind to a passable suite. It accepts a function to be run whenever the suite completes running all [tests](../test/index.md) (both sync, and async - if present), regardless of whether they passed or [failed](../test/how_to_fail.md).

`.done` calls can be infinitely chained to one another, and as the passable suite completes - they will all run synchronously - meaning that if there is an async action being performed in one of the callbacks, the next `.done` call will *not* wait for it to complete before starting.

When running, the `done` function passes down to its callback function the final passable result object, so you do not have to store it in an external variable.

```js
import passable, { enforce } from 'passable';
const email_regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gi;

passable('SendEmailForm', (test) => {

  test('UserEmail', 'must be a valid email', () => {
    enforce(data.email).matches(email_email_regex);
  });

  test('UserName', 'must not be blacklisted', new Promise((resolve, reject) => {
    fetch(`/isBlacklisted?name=${data.name}`).then(...).then((data) => {
      if (data.blackListed) {
        reject();
      } else {
        resolve();
      }
    });
  }));

  test('Content', 'must be between 5 and 500 chars', () => {
    enforce(data.content).largerThan(4).smallerThan(501);
  });
}).done((res) => {
  if (res.hasValidationErrors) {
    showValidationErrors(res.errors)
  }
}).done(reportToServer).done(promptUserQuestionnaire);
```

In the example above, whenever the validation completes, the following functions will get called, with the [validation result object](./result.md) as an argument:

1.
```js
(res) => {
  if (res.hasValidationErrors) {
    showValidationErrors(res.errors)
  }
}
```

2.
```js
reportToServer
```

3.
```js
promptUserQuestionnaire
```