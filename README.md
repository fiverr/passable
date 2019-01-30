# ![Passable](https://cdn.rawgit.com/fiverr/passable/master/documentation/assets/img/logo.png?raw=true "Passable")

Declarative data validations.

[![npm version](https://badge.fury.io/js/passable.svg)](https://badge.fury.io/js/passable) [![Build Status](https://travis-ci.org/fiverr/passable.svg?branch=master)](https://travis-ci.org/fiverr/passable)


Learn more at:
* [Documentation](https://fiverr.github.io/passable/)

## What is Passable?
Passable is a system for javascript applications that allows you to write structured data model validations in a way that's consistent all across your app, and fully reusable.

Inspired by the world of unit testing, Passable validations are written like actual specs that need to be passed, and are considered to be an enforceable contract between the backend and the client. The syntax is very similar, adapted to be more suitable for testing data model, and runs in production code - not in testing environment.

![passable diagram](https://cdn.rawgit.com/fiverr/passable/master/documentation/assets/img/passable_diagram.png?raw=true)

## Key Benefits
### Structured Validations

The basic notion behind Passable is that you would want to structure your data model validation in your application, in a way that's consistent and easy to follow. It isn't much of a problem in a smaller scale application, but as the application gets larger, and more complex, it gets harder to keep track of the different flows of the application and the ways data model validations are performed in each one. Passable gives you a consistent structure to construct your data model validations, in a way that's both reusable and easy to read.

### Isomorphic Validations

The other use of Passable is server side validations. Since most of the times we perform validations, we send the data back to the server, we would like to perform the tests there as well. This causes a great deal of confusion and error. It is hard to keep the validations in the server and the client synced, so if we update a validation in the client side, or the server, it is easy to neglect and change it on the other side as well. Even if we do keep them up to date, it is easy, especially if the server and the client are written in different languages, to have a slightly different interpretation of the logic on each end, which, eventually, causes inconsistencies and bugs.

Instead, with Passable, you could just as easily set up a data model validations server that would run the same exact validation code that runs in the browser. No duplication, no sync problems.

## Contributers
Thanks goes to these people:
* [Evyatar Alush (ealush)](https://github.com/ealush)
* [Ronen Elster (ronen-e)](https://github.com/ronen-e)
* [Sahar Brodbeker (sahariko)](https://github.com/sahariko)
* [Omri Lotan (omrilotan)](https://github.com/omrilotan)
* [Netanel Ben (netanelben)](https://github.com/netanelben)
