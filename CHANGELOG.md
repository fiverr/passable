# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [7.0.0] - ?

### Changed
- [Major] Lowercased library name when imported on global object.

### Added
- [Minor] `.after()` callback that can run after a specific field finished execution.
- [Minor] new size rules (lessThan, greaterThan, lessThanOrEquals, greaterThanOrEquals).
- [Minor] new size rules (longerThan, shorterThan, longerThanOrEquals, shorterThanOrEquals, hasLengthOf).

## [6.3.4] - 2019-05-01

### Changed
- [Patch] Reduce bundle size

## [6.3.1] - 2019-02-22

### Added
- [Patch] Fix documentation typo (#107)
- [Patch] Add type hints to passable (#106 + #107)

## [6.3.0] - 2019-01-06

### Added
- [Minor] access intermediate validation result via draft (#103)
- [Patch] Publish next tag separately from feature branch (#104)
- [Minor] add hasErrors and hasWarnings functions (#105)

## [6.2.0] - 2018-12-27

### Added
- [Minor] mark field as async

## [6.1.3] - 2018-12-27

### Fixed
- [PATCH] run done callback in sync mode

## [6.1.0] - 2018-10-20

### Added
- [Minor] Async test support + done callback chaining (#100)

### Changed
- [Patch] Update github configuration

## [6.0.0] - 2018-04-16

### Added
- [Major] Extract Enforce as standalone API
- [Patch] Create `Specific` Object
- [Patch] Auto deploy next branch
- [Minor] Add isNumeric check
- [Minor] Initialize proxy with all keys. Add support for proxy-polyfill
- [Minor] Negative rules support
- [Patch] Use proxy polyfill when proxy is not supported
- [Minor] Add isTruthy and isFalsy enforce rules

### Changed
- [Major] `specific` field filter: Introduce `only` and `not`
- [Major] Refactor rules to follow convention (Size compares against number only)
- [Major] Pass - move to be the last argument
- [Patch] Rename `pass` to `test`
- [Major] Move specific to last argument, make optional

### Removed
- [Major] Make validate leaner by removing `message` arg

### Fixed
- [Patch] Type-checking errors ignores

## [5.10.3] - 2018-01-29

### Added
- [Minor] Validate function
- [PATCH] Commonjs require support for enforce
- [Minor] Add default expect=true to rules
- [Minor] export enforce as a standalone module
- [Minor] Allow chaining rules directly under enforce