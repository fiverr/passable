# `.after()`

> Since 7.0.0

The after callback is a function that can be chained to a passable suite and allows invoking a callback whenever a certain field has finished running, regardless of whether it passed or failed. It accepts two arguments: `fieldName` and `callback`. You may chain multiple callbacks to the same field.

When running, the `.after()` function passes down to its callback argument the current result object, **note** it might not be final yet, as there may be other async fields still being processed.

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
    enforce(data.content).longerThan(4).shorterThan(501);
  });
}).after((res) => {
  if (res.hasErrors('username')) {
    showUserNameErrors(res.errors)
  }
});
```

# `.done()`

> Since 6.1.0

The `.done()` callback is a function that can be chained to a passable suite. It accepts a function to be run whenever the suite completes running all [tests](../test/index.md) (both sync, and async - if present), regardless of whether they passed or [failed](../test/how_to_fail.md).

`.done()` calls can be infinitely chained to one another, and as the passable suite completes - they will all run synchronously - meaning that if there is an async action being performed in one of the callbacks, the next `.done()` call will *not* wait for it to complete before starting.

When running, the `done()` function passes down to its callback function the final passable result object, so you do not have to store it in an external variable.

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
    enforce(data.content).longerThan(4).shorterThan(501);
  });
}).done((res) => {
  if (res.hasErrors()) {
    showValidationErrors(res.errors)
  }
}).done(reportToServer).done(promptUserQuestionnaire);
```

# `.cancel()`

> Since 7.0.0

When running your validation suite multiple times in a short amount of time - for example, when validating user inputs upon change, your async validations may finish after you already started running the suite again. This will cause the `.done()` and `.after()` callbacks of the previous run to be run in proximity to the `.done()` and `.after()` callbacks of the current run.

Depending on what you do in your callbacks, this can lead to wasteful action, or to validation state rapidly changing in front of the user's eyes.

To combat this, there's the `.cancel()` callback, which cancels any pending `.done()` and `.after()` callbacks.

You can use it in many ways, but the simplistic way to look at it is this: You need to keep track of your cancel callback in a scope that's still going to be accessible in the next run.

Example:

```js
let cancel = null;

// this is a simple event handler
const handleChange = (e) => {

  if (cancel) {
    cancel(); // now, if cancel already exists, it will cancel any pending callbacks
  }

  // you should ideally import your suite from somewhere else, this is here just for the demonstration
  const result = passable('MyForm', (test) => {
    // some async validations go here
  });

  result.done((res) => {
    // do something
  });

  cancel = result.cancel; // save the cancel callback aside
}
```