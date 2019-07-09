# Contributing to Passable
Passable is an Isomorphic library which may run either on the server, or in the browser (or both), and it should be treated as such. Internal modules should not rely on any runtime specific environment, or assume any exists.

It provides a declarative API for writing user input validations. When adding new consumer-facing APIs, they should keep the same declarative 'style and spirit'.

## Branching guidelines
Our working branch is Master. New versions are merged to, and are published from it. Apart from master, we use a development branch called `next`. `next` is an accumulative branch, collecting all changes waiting to be published. **next pull requests are not merged directly to master**, but to `next` instead.
This also means that when working on a new feature, we branch off from `next` and not from master.

For urgent changes and bugfixes that cannot be wait until the next version, we open a `hotfix` branch (for example: `hotfix-fix-all-bugs`). It should branch off directly from master, and be merged back directly to master.

Our `next` branch needs to be constantly updated from master so current fixes and configuration changes are present there as well.

| Branch Name | Purpose                                                                                 |
|-------------|:----------------------------------------------------------------------------------------|
| master      | Working branch. Ready to publish versions go here                                       |
| next        | Development branch, accumulates future changes                                          |
| hotfix      | Descriptive term for all hotfix branches that cannot wait until the next version update |

## Version management
The version number specify `major`.`minor`.`patch`

|Type  | Content | Example |
|------|:--------|:--------|
|patch | Internal fix | Bug fix, Performance improvements, tests, small tweaks|
|minor | Interface change with full backward compatibility | Adding new features, Full backwards compatibility|
|major | Interface change without full backward compatibility | Changing a function name or interface, Removing a function|

## Commit message guidelines
Commit messages should be labeled with the version bump the changes require. For example:

* > [Patch] Fixing a broken runner
* > [Patch] Documentation update
* > [Patch] Configuration update
* > [Minor] Adding a new runner
* > [Major] Replacing all runners

This is to make it easier to determine which version bump should be done upon adding a new release.

## Documentation guidelines
Passable's documentation is present in [https://fiverr.github.io/passable](https://fiverr.github.io/passable). Its source is present as markdown(`.md`) files in the `documentation` folder of the project. Upon releasing a new version, a static html website is generated using [docpress](https://github.com/docpress/docpress). When adding a new page to the documentation, it needs to be added the the `content` first, which is present under: `/documentation/README.md`. Otherwise docpress will not know to look for it.

When modifying existing API or adding new functionality, it is important to update the documentation as well.

## Testing
There are two kinds of tests for Passable's code. All are either named or suffixed with `spec.js`.
### Unit tests
Unit tests run over the source directory. These tests check each of Passable's internal interfaces.
When testing a module, its spec file should be in the same directory, named `spec.js`:
```
.
├── module_name
│   ├── index.js
│   ├── spec.js
```
When testing a broader part of the api, a filename should be more descriptive:
```
.
├── spec
│   ├── passable.api.custom.spec.js
```
the All new code has to be tested.

### Usecase tests
Which test full Passable usecases, and run both on the source and distribution versions of Passable. When adding new functionality to Passable, make sure to add a corresponding usecase test.
If your changes are not reflected in the usecase tests, it is probably due to you having the old distribution file in your branch. Please run:
```js
npm run build
// or
yarn build
```

Usecase tests are located under:
```
.
├── spec
│   ├── usecase
│   ├── passable.usecase.spec.js
│       ├── usecase_a.js
│       ├── usecase_b.js
```

To run all tests:
```js
npm test
// or
yarn test
```

## Linting
Linting is done via eslint and Fiverr's eslint configuration.

```js
npm run eslint
// or
yarn eslint
```

### Playground
The "playground" directory is a place you can write test validations, and include __Passable__ as a module.
It's node_modules contains a symlink to the parent directory so you're working with your actual work files.

The content of this directory is gitignored (short of example file and __Passable__ virtual module) so feel free to add your sandbox files there
