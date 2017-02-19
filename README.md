# Passable
Isomorphic data model validations made easy.

## What is Passable
More than anything, Passable is a way to structure your data model validations in a way that's easy to manage - as small tests, grouped logically. They can be interdependant, or standalone, they can perform your own validation logic, or rely on the predefined tests you can match your data model against.

![alt tag](https://raw.githubusercontent.com/ealush/passable/diagram/passable_diagram.png)

## Why Passable
The basic notion behind Passable is that you would want to structure your data model validation in your application, in a way that's consistent and easy to follow. It isn't much of a problem in a smaller scale application, but as the application gets larger, and more complex, it gets harder to keep track of the different flows of the application and the ways data model validations are performed in each one. Passable gives you a consistent wstructure to construct your data model validations, in a way that's both reusable and easy to read.

The other, possibly more important use of Passable, is server side validations. Since most of the times we perform validations, we send the data back to the server, we would like to perform the tests there as well. This causes a great deal of confusion and error. It is hard to keep the validations in the server and the client synced, so if we update a validation in the client side, or the server, it is easy to neglet and change it on the other side as well. Even if we _do_ keep them up to date, it is easy, especially if the server and the client are written in different languages, to have a slightly different interpertation of the logic on each end, whic, eventually, causes inconsistencies and bugs.

Instead, with Passable, you could just as easily set up a data model validations server that would run the same exact validation code that runs in the browser. No duplication, no sync problems.

See [Passable-Server](https://github.com/ealush/passable-server) for server side implementation.

---

## Installation
Just `npm install passable --save` and you're all set.

# How to use Passable?

---

You construct your tests in a spec-like manner, grouping a bunch of tests together, for example, all inputs in a form.

The `pass` function is a single test inside of the group of tests. It accepts the name of the test, description of the success condition, and the actual test function.
If the test function returns true, the test has passed. If not, it is considered as failed.

You could perform multiple 'passes' on the same data object. If you do so, it is recommended to use the same name for all these passes, as the results for all tests under the same name will be grouped together.
```js

// data = {
//  userName: "test",
//  email: "test@sil.ly"
// }

const validate = new Passable('UserEditForm', function(group, pass) {
	pass('UserName', 'Must be at least 5 chars, but not longer than 20', () => {
        // this is an example using the predefined tests, using the 'enforce' method
		return group.enforce(data.userName, {
			isLongerThan: {
				testAgainst: 5,
				expect: true
			},
			isShorterThan: {
				testAgainst: 20,
				expect: true
			}
		});
	});

	pass('UserEmail', 'Must not end with the letter Y', () => {
        // this is an example for a free-style, do it yourself, validation
		return data.email.substr(-1) !== 'y';
	});
});
```

And the resulting object for these tests would be:
```js
{
    name: 'UserEditForm',
    testsPerformed: {
        UserName: {
            testCount: 1,
            failCount: 1
        },
        UserEmail: {
            testCount: 1,
            failCount: 1
        }
    },
    hasValidationErrors: true,
    validationErrors: {
        UserName: [
            'Must be at least 5 chars, but not longer than 20'
        ],
        UserEmail: [
            'Must not end with the letter Y'
        ]
    },
    failCount: 2,
    testCount: 2
}
```

## Optimistic approach
Passable is optimistic by default. If you run Passable and do not supply it with any tests, your results object will be a passing object.
You could, if you want to override this this behaviour, you could set your test to a pessimistic approach, which will fail empty tests by default.

```js
const validate = new Passable('PessimisticFail', 'pessimistic', function() {});
```
This will result with the following results object:
```js
{
	name:'PessimisticFail',
	testsPerformed:{},
	hasValidationErrors:true,
	validationErrors:{},
	failCount:0,
	testCount:0
}
```

## The enforce method
The enforce method runs predefined tests in a sequence. Its intended use is for validations logic that gets repeated over and over again and shouldn't be written manually.
For each predefined tests, the enforce method accept these two attributes:
* `testAgainst`: [optional | unless needed] the value to test your data against (for example, max length).
* `expect`: [optional | default: true] the result of the test, in case the data passes the validation.

This gives you the flexibility to write your tests the way that suites you, for example:
```js
{
   isShorterThan: {
        testAgainst: 5,
        expect: false
   }
}
```

will return the same result as
```js
{
   isLongerThan: {
        testAgainst: 5,
        expect: true
   }
}
```
