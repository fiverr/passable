# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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