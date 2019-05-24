(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["passable"] = factory();
	else
		root["passable"] = factory();
})(Function('return this')(), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
module.exports = function proxyPolyfill() {
  var lastRevokeFn = null;
  var ProxyPolyfill;
  /**
   * @param {*} o
   * @return {boolean} whether this is probably a (non-null) Object
   */

  function isObject(o) {
    return o ? _typeof(o) === 'object' || typeof o === 'function' : false;
  }
  /**
   * @constructor
   * @param {!Object} target
   * @param {{apply, construct, get, set}} handler
   */


  ProxyPolyfill = function ProxyPolyfill(target, handler) {
    if (!isObject(target) || !isObject(handler)) {
      throw new TypeError('Cannot create proxy with a non-object as target or handler');
    } // Construct revoke function, and set lastRevokeFn so that Proxy.revocable can steal it.
    // The caller might get the wrong revoke function if a user replaces or wraps scope.Proxy
    // to call itself, but that seems unlikely especially when using the polyfill.


    var throwRevoked = function throwRevoked() {};

    lastRevokeFn = function lastRevokeFn() {
      throwRevoked = function throwRevoked(trap) {
        throw new TypeError("Cannot perform '".concat(trap, "' on a proxy that has been revoked"));
      };
    }; // Fail on unsupported traps: Chrome doesn't do this, but ensure that users of the polyfill
    // are a bit more careful. Copy the internal parts of handler to prevent user changes.


    var unsafeHandler = handler;
    handler = {
      'get': null,
      'set': null,
      'apply': null,
      'construct': null
    };

    for (var k in unsafeHandler) {
      if (!(k in handler)) {
        throw new TypeError("Proxy polyfill does not support trap '".concat(k, "'"));
      }

      handler[k] = unsafeHandler[k];
    }

    if (typeof unsafeHandler === 'function') {
      // Allow handler to be a function (which has an 'apply' method). This matches what is
      // probably a bug in native versions. It treats the apply call as a trap to be configured.
      handler.apply = unsafeHandler.apply.bind(unsafeHandler);
    } // Define proxy as this, or a Function (if either it's callable, or apply is set).
    // TODO(samthor): Closure compiler doesn't know about 'construct', attempts to rename it.


    var proxy = this;
    var isMethod = false;
    var isArray = false;

    if (typeof target === 'function') {
      proxy = function ProxyPolyfill() {
        var usingNew = this && this.constructor === proxy;
        var args = Array.prototype.slice.call(arguments);
        throwRevoked(usingNew ? 'construct' : 'apply');

        if (usingNew && handler['construct']) {
          return handler['construct'].call(this, target, args);
        } else if (!usingNew && handler.apply) {
          return handler.apply(target, this, args);
        } // since the target was a function, fallback to calling it directly.


        if (usingNew) {
          // inspired by answers to https://stackoverflow.com/q/1606797
          args.unshift(target); // pass class as first arg to constructor, although irrelevant
          // nb. cast to convince Closure compiler that this is a constructor

          var f =
          /** @type {!Function} */
          target.bind.apply(target, args);
          return new f();
        }

        return target.apply(this, args);
      };

      isMethod = true;
    } else if (target instanceof Array) {
      proxy = [];
      isArray = true;
    } // Create default getters/setters. Create different code paths as handler.get/handler.set can't
    // change after creation.


    var getter = handler.get ? function (prop) {
      throwRevoked('get');
      return handler.get(this, prop, proxy);
    } : function (prop) {
      throwRevoked('get');
      return this[prop];
    };
    var setter = handler.set ? function (prop, value) {
      throwRevoked('set');
      var status = handler.set(this, prop, value, proxy); // TODO(samthor): If the calling code is in strict mode, throw TypeError.
      // if (!status) {
      // It's (sometimes) possible to work this out, if this code isn't strict- try to load the
      // callee, and if it's available, that code is non-strict. However, this isn't exhaustive.
      // }
    } : function (prop, value) {
      throwRevoked('set');
      this[prop] = value;
    }; // Clone direct properties (i.e., not part of a prototype).

    var propertyNames = Object.getOwnPropertyNames(target);
    var propertyMap = {};
    propertyNames.forEach(function (prop) {
      if ((isMethod || isArray) && prop in proxy) {
        return; // ignore properties already here, e.g. 'bind', 'prototype' etc
      }

      var real = Object.getOwnPropertyDescriptor(target, prop);
      var desc = {
        enumerable: !!real.enumerable,
        get: getter.bind(target, prop),
        set: setter.bind(target, prop)
      };
      Object.defineProperty(proxy, prop, desc);
      propertyMap[prop] = true;
    }); // Set the prototype, or clone all prototype methods (always required if a getter is provided).
    // TODO(samthor): We don't allow prototype methods to be set. It's (even more) awkward.
    // An alternative here would be to _just_ clone methods to keep behavior consistent.

    var prototypeOk = true;

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(proxy, Object.getPrototypeOf(target));
    } else if (proxy.__proto__) {
      proxy.__proto__ = target.__proto__;
    } else {
      prototypeOk = false;
    }

    if (handler.get || !prototypeOk) {
      for (var _k in target) {
        if (propertyMap[_k]) {
          continue;
        }

        Object.defineProperty(proxy, _k, {
          get: getter.bind(target, _k)
        });
      }
    } // The Proxy polyfill cannot handle adding new properties. Seal the target and proxy.


    Object.seal(target);
    Object.seal(proxy);
    return proxy; // nb. if isMethod is true, proxy != this
  };

  ProxyPolyfill.revocable = function (target, handler) {
    var p = new ProxyPolyfill(target, handler);
    return {
      'proxy': p,
      'revoke': lastRevokeFn
    };
  };

  return ProxyPolyfill;
};

/***/ }),
/* 1 */
/***/ (function(module) {

module.exports = {"a":"7.0.0"};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var runners_namespaceObject = {};
__webpack_require__.r(runners_namespaceObject);
__webpack_require__.d(runners_namespaceObject, "compound", function() { return runners_compound; });
__webpack_require__.d(runners_namespaceObject, "rule", function() { return runners_rule; });

// CONCATENATED MODULE: ./src/core/testRunner/index.js
function testRunner(test) {
  var isValid = null;

  try {
    var res = test();

    if (typeof res !== 'undefined' && res !== null && res.hasOwnProperty('valid')) {
      isValid = res.valid;
    } else if (typeof res === 'boolean') {
      isValid = res || false;
    } else {
      isValid = true;
    }
  } catch (e) {
    isValid = false;
  }

  return !!isValid;
}

function testRunnerAsync(test, done, fail) {
  try {
    test.then(done, fail);
  } catch (e) {
    fail();
  }
}


// CONCATENATED MODULE: ./src/core/ResultObject/index.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var WARN = 'warn';
var FAIL = 'fail';
var severities = [WARN, FAIL];
/** Class representing validation state. */

var ResultObject =
/*#__PURE__*/
function () {
  /**
   * Initialize validation object
   * @param {string} name - The name of the current data object.
   * @return {Object} Current instance
   */
  function ResultObject(name) {
    _classCallCheck(this, ResultObject);

    _async.set(this, {
      writable: true,
      value: null
    });

    _completionCallbacks.set(this, {
      writable: true,
      value: []
    });

    this.name = name;
    this.hasValidationErrors = false;
    this.hasValidationWarnings = false;
    this.failCount = 0;
    this.warnCount = 0;
    this.testCount = 0;
    this.testsPerformed = {};
    this.validationErrors = {};
    this.validationWarnings = {};
    this.skipped = [];
  }

  _createClass(ResultObject, [{
    key: "initFieldCounters",

    /**
     * Initializes specific field's counters
     * @param {string} fieldName - The name of the field.
     * @return {Object} Current instance
     */
    value: function initFieldCounters(fieldName) {
      if (this.testsPerformed[fieldName]) {
        return this;
      }

      this.testsPerformed[fieldName] = {
        testCount: 0,
        failCount: 0,
        warnCount: 0
      };
      return this;
    }
    /**
     * Bumps test counters
     * @param {string} fieldName - The name of the field.
     * @return {Object} Current instance
     */

  }, {
    key: "bumpTestCounter",
    value: function bumpTestCounter(fieldName) {
      if (!this.testsPerformed[fieldName]) {
        return this;
      }

      this.testsPerformed[fieldName].testCount++;
      this.testCount++;
      return this;
    }
    /**
     * Bumps field's warning counts and adds warning string
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     */

  }, {
    key: "bumpTestWarning",
    value: function bumpTestWarning(fieldName, statement) {
      this.hasValidationWarnings = true;
      this.validationWarnings[fieldName] = this.validationWarnings[fieldName] || [];
      this.validationWarnings[fieldName].push(statement);
      this.warnCount++;
      this.testsPerformed[fieldName].warnCount++;
    }
    /**
     * Bumps field's error counts and adds error string
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     */

  }, {
    key: "bumpTestError",
    value: function bumpTestError(fieldName, statement) {
      this.hasValidationErrors = true;
      this.validationErrors[fieldName] = this.validationErrors[fieldName] || [];
      this.validationErrors[fieldName].push(statement);
      this.failCount++;
      this.testsPerformed[fieldName].failCount++;
    }
    /**
     * Fails a field and updates object accordingly
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     * @param {string} severity - Whether it is a `fail` or `warn` test.
     * @return {Object} Current instance
     */

  }, {
    key: "fail",
    value: function fail(fieldName, statement, severity) {
      if (!this.testsPerformed[fieldName]) {
        return this;
      }

      var selectedSeverity = severity && severities.includes(severity) ? severity : FAIL;
      selectedSeverity === WARN ? this.bumpTestWarning(fieldName, statement) : this.bumpTestError(fieldName, statement);
      return this;
    }
    /**
     * Uniquely add a field to the `skipped` list
     * @param {string} fieldName
     * @return {Object} Current instance
     */

  }, {
    key: "addToSkipped",
    value: function addToSkipped(fieldName) {
      !this.skipped.includes(fieldName) && this.skipped.push(fieldName);
      return this;
    }
    /**
     * Runs completion callbacks aggregated by `done`
     * regardless of success or failure
     */

  }, {
    key: "runCompletionCallbacks",
    value: function runCompletionCallbacks() {
      var _this = this;

      _classPrivateFieldGet(this, _completionCallbacks).forEach(function (cb) {
        return cb(_this);
      });
    }
    /**
     * Registers callback function to be run when test suite is done running
     * If current suite is not async, runs the callback immediately
     * @param {Function} callback the function to be called on done
     * @return {Object} Current instance
     */

  }, {
    key: "done",
    value: function done(callback) {
      if (typeof callback !== 'function') {
        return this;
      }

      if (!_classPrivateFieldGet(this, _async)) {
        callback(this);
      }

      _classPrivateFieldGet(this, _completionCallbacks).push(callback);

      return this;
    }
    /**
     * Registers a callback function to be run after a certain field finished running
     * If given field is sync, runs immediately
     * @param {String} fieldName name of the field to register the callback to
     * @param {Function} callback the function to be registered
     * @return {Object} Current instance
     */

  }, {
    key: "after",
    value: function after(fieldName, callback) {
      if (typeof callback !== 'function') {
        return this;
      }

      _classPrivateFieldSet(this, _async, _classPrivateFieldGet(this, _async) || {});

      if (!_classPrivateFieldGet(this, _async)[fieldName] && this.testsPerformed[fieldName]) {
        callback(this);
      } else if (_classPrivateFieldGet(this, _async)[fieldName]) {
        _classPrivateFieldGet(this, _async)[fieldName].callbacks = [].concat(_toConsumableArray(_classPrivateFieldGet(this, _async)[fieldName].callbacks || []), [callback]);
      }

      return this;
    }
    /**
     * Marks a field as async
     * @param {string} fieldName the name of the field marked as async
     * @return {Object} Current instance
    */

  }, {
    key: "markAsync",
    value: function markAsync(fieldName) {
      _classPrivateFieldSet(this, _async, _classPrivateFieldGet(this, _async) || {});

      _classPrivateFieldGet(this, _async)[fieldName] = {
        done: false
      };
      return this;
    }
    /**
     * Marks an async field as done
     * @param {string} fieldName the name of the field marked as done
     * @return {Object} Current instance
    */

  }, {
    key: "markAsDone",
    value: function markAsDone(fieldName) {
      var _this2 = this;

      if (_classPrivateFieldGet(this, _async) !== null && _classPrivateFieldGet(this, _async)[fieldName]) {
        _classPrivateFieldGet(this, _async)[fieldName].done = true; // run field callbacks set in `after`

        if (_classPrivateFieldGet(this, _async)[fieldName].callbacks) {
          _classPrivateFieldGet(this, _async)[fieldName].callbacks.forEach(function (callback) {
            return callback(_this2);
          });
        }
      }

      return this;
    }
    /**
     * Gets all the errors of a field, or of the whole object
     * @param {string} [fieldName] - The name of the field.
     * @return {Array | Object} The field's errors, or all errors
     */

  }, {
    key: "getErrors",
    value: function getErrors(fieldName) {
      if (!fieldName) {
        return this.validationErrors;
      }

      if (this.validationErrors[fieldName]) {
        return this.validationErrors[fieldName];
      }

      return [];
    }
    /**
     * Gets all the warnings of a field, or of the whole object
     * @param {string} [fieldName] - The name of the field.
     * @return {Array | Object} The field's warnings, or all warnings
     */

  }, {
    key: "getWarnings",
    value: function getWarnings(fieldName) {
      if (!fieldName) {
        return this.validationWarnings;
      }

      if (this.validationWarnings[fieldName]) {
        return this.validationWarnings[fieldName];
      }

      return [];
    }
    /**
     * Returns whether a field (or the whole suite, if none passed) contains errors
     * @param {string} [fieldName]
     */

  }, {
    key: "hasErrors",
    value: function hasErrors(fieldName) {
      if (!fieldName) {
        return this.hasValidationErrors;
      }

      return Boolean(this.getErrors(fieldName).length);
    }
    /**
     * Returns whether a field (or the whole suite, if none passed) contains warnings
     * @param {string} [fieldName]
     */

  }, {
    key: "hasWarnings",
    value: function hasWarnings(fieldName) {
      if (!fieldName) {
        return this.hasValidationWarnings;
      }

      return Boolean(this.getWarnings(fieldName).length);
    }
  }]);

  return ResultObject;
}();

var _async = new WeakMap();

var _completionCallbacks = new WeakMap();

/* harmony default export */ var core_ResultObject = (ResultObject);
// CONCATENATED MODULE: ./src/core/Specific/index.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Specific_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Specific_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Specific_createClass(Constructor, protoProps, staticProps) { if (protoProps) Specific_defineProperties(Constructor.prototype, protoProps); if (staticProps) Specific_defineProperties(Constructor, staticProps); return Constructor; }

/** Class representing validation inclusion and exclusion groups */
var Specific =
/*#__PURE__*/
function () {
  /**
   * Initialize Specific object
   *
   * @param {String | Array | Object | undefined} specific
   */
  function Specific(specific) {
    Specific_classCallCheck(this, Specific);

    if (!specific) {
      return;
    }

    if (!Specific.is(specific)) {
      throw new TypeError();
    }

    if (typeof specific === 'string' || Array.isArray(specific)) {
      if (specific.length === 0) {
        return;
      }

      this.only = this.populateGroup(this.only, specific);
      return;
    }

    if (specific.only) {
      this.only = this.populateGroup(this.only, specific.only);
    }

    if (specific.not) {
      this.not = this.populateGroup(this.not, specific.not);
    }
  }
  /**
   * Populate inclusion and exclusion groups
   *
   * @param {Object} group - the group to populate.
   * @param {String | Array} field - the field to add to the group
   * @return {Object} modified group
   */


  Specific_createClass(Specific, [{
    key: "populateGroup",
    value: function populateGroup(group, field) {
      group = group || {};

      if (typeof field === 'string') {
        group[field] = true;
      } else if (Array.isArray(field)) {
        field.forEach(function (item) {
          return group[item] = true;
        });
      }

      return group;
    }
    /**
     * Checkes whether a given field name is in exclusion group
     * or not a member of inclusion group (when present)
     *
     * @param {String} fieldName
     * @return {Boolean}
     */

  }, {
    key: "excludes",
    value: function excludes(fieldName) {
      if (this.only && !this.only[fieldName]) {
        return true;
      }

      if (this.not && this.not[fieldName]) {
        return true;
      }

      return false;
    }
    /**
     * Test whether a given argument matches
     * the `specific` filter convention
     *
     * @param {Any} item
     * @return {boolean}
     */

  }], [{
    key: "is",
    value: function is(item) {
      if (Array.isArray(item)) {
        return item.every(function (item) {
          return typeof item === 'string';
        });
      }

      if (typeof item === 'string') {
        return true;
      }

      if (item !== null && _typeof(item) === 'object' && (item.hasOwnProperty('only') || item.hasOwnProperty('not'))) {
        return true;
      }

      return false;
    }
  }]);

  return Specific;
}();

/* harmony default export */ var core_Specific = (Specific);
// CONCATENATED MODULE: ./src/core/Passable/index.js
function Passable_toConsumableArray(arr) { return Passable_arrayWithoutHoles(arr) || Passable_iterableToArray(arr) || Passable_nonIterableSpread(); }

function Passable_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Passable_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Passable_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Passable_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Passable_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Passable_typeof = function _typeof(obj) { return typeof obj; }; } else { Passable_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Passable_typeof(obj); }





var constructorError = function constructorError(name, value, doc) {
  return "[Passable]: failed during suite initialization. Unexpected '".concat(Passable_typeof(value), "' for '").concat(name, "' argument.\n    See: ").concat(doc ? doc : 'https://fiverr.github.io/passable/getting_started/writing_tests.html');
};
/**
 * Describes a passable validation suite
 */


var Passable_Passable =
/**
 * Initializes a validation suite, creates a new ResultObject instance and runs pending tests
 */
function Passable(name, tests, specific) {
  var _this = this;

  Passable_classCallCheck(this, Passable);

  _defineProperty(this, "pending", []);

  _defineProperty(this, "addPendingTest", function (test) {
    return _this.pending.push(test);
  });

  _defineProperty(this, "clearPendingTest", function (test) {
    _this.pending = _this.pending.filter(function (t) {
      return t !== test;
    });

    if (_this.pending.length === 0) {
      _this.res.runCompletionCallbacks();
    }
  });

  _defineProperty(this, "hasRemainingPendingTests", function (fieldName) {
    return _this.pending.some(function (test) {
      return test.fieldName === fieldName;
    });
  });

  _defineProperty(this, "test", function (fieldName, statement, test, severity) {
    if (_this.specific.excludes(fieldName)) {
      _this.res.addToSkipped(fieldName);

      return;
    }

    _this.res.initFieldCounters(fieldName);

    var operation;

    if (typeof test === 'function') {
      operation = _this.runTest;
    } else if (test instanceof Promise) {
      operation = _this.addPendingTest;
    } else {
      return;
    }

    operation(Object.assign(test, {
      fieldName: fieldName,
      statement: statement,
      severity: severity
    }));
  });

  _defineProperty(this, "runTest", function (test) {
    if (test instanceof Promise) {
      _this.res.markAsync(test.fieldName);

      var done = function done() {
        _this.clearPendingTest(test);

        if (!_this.hasRemainingPendingTests(test.fieldName)) {
          _this.res.markAsDone(test.fieldName);
        }
      };

      var fail = function fail() {
        // order is important here! fail needs to be called before `done`.
        _this.res.fail(test.fieldName, test.statement, test.severity);

        done();
      };

      testRunnerAsync(test, done, fail);
    } else {
      var isValid = testRunner(test);

      if (!isValid) {
        _this.res.fail(test.fieldName, test.statement, test.severity);
      }

      _this.clearPendingTest(test);
    }

    _this.res.bumpTestCounter(test.fieldName);
  });

  _defineProperty(this, "runPendingTests", function () {
    Passable_toConsumableArray(_this.pending).forEach(_this.runTest);
  });

  if (typeof name !== 'string') {
    throw new TypeError(constructorError('suite name', name));
  }

  if (typeof tests !== 'function') {
    throw new TypeError(constructorError('tests', tests));
  }

  if (specific && !core_Specific.is(specific)) {
    throw new TypeError(constructorError('specific', tests, 'https://fiverr.github.io/passable/test/specific.html'));
  }

  this.specific = new core_Specific(specific);
  this.res = new core_ResultObject(name);
  tests(this.test, this.res);
  this.runPendingTests();
};

/* harmony default export */ var core_Passable = (Passable_Passable);
// CONCATENATED MODULE: ./src/Enforce/runnables/compounds/all_of/index.js

function allOf(value, tests, rules) {
  var validations = Object.keys(tests);

  if (validations.length === 0) {
    return false;
  }

  return validations.every(function (key) {
    return run(value, key, tests, rules) === true;
  });
}
// CONCATENATED MODULE: ./src/Enforce/runnables/compounds/any_of/index.js

function anyOf(value, tests, rules) {
  var validations = Object.keys(tests);
  return validations.some(function (key) {
    return run(value, key, tests, rules) === true;
  });
}
// CONCATENATED MODULE: ./src/Enforce/runnables/compounds/none_of/index.js

function noneOf(value, tests, rules) {
  var validations = Object.keys(tests);

  if (validations.length === 0) {
    return false;
  }

  return validations.every(function (key) {
    return run(value, key, tests, rules) !== true;
  });
}
// CONCATENATED MODULE: ./src/Enforce/runnables/compounds/index.js



var compounds = {
  allOf: allOf,
  anyOf: anyOf,
  noneOf: noneOf
};
/**
 * A function which returns whether a combination of
 * rule + value is true or false
 *
 * @param {any} value - the value being tested
 * @param {string} key the name of the rule being run
 * @param {Object} tests an object containing the group of tests in the current run
 * @param {Object} rules an object containing all the rules available for the current test
 * @return {boolean} value validation result
 */

function run(value, key, tests, rules) {
  if (typeof rules[key] !== 'function') {
    if (typeof tests[key] === 'function') {
      return tests[key](value);
    }

    return false;
  }

  var args = tests[key];
  return rules[key](value, args);
}
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/helpers/expect_type/index.js


function expectType(value, type, functionName) {
  if (!is_type(value, type)) {
    var val = Array.isArray(value) ? JSON.stringify(value) : value;
    throw new TypeError("[Passable]: Failed to execute '".concat(functionName, "': expected ").concat(val, " to be a ").concat(type, "."));
  }

  return true;
}

/* harmony default export */ var expect_type = (expectType);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/helpers/find_array_values_in_array/index.js


function findArrayValuesInArray(values, array) {
  var reducedArray = reduce_array_to_map(array),
      allItemsFound = find_array_values_in_map_keys(values, reducedArray);
  return allItemsFound;
}

/* harmony default export */ var find_array_values_in_array = (findArrayValuesInArray);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/helpers/find_array_values_in_map_keys/index.js
function findArrayValuesInMapKeys(array, map) {
  // eslint-disable-line flowtype/no-weak-types
  if (!map) {
    return false;
  }

  return array.every(function (element) {
    return map && map.has(element);
  });
}

/* harmony default export */ var find_array_values_in_map_keys = (findArrayValuesInMapKeys);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/helpers/find_val_in_array_or_string/index.js
function findValInArrayOrString(value, container) {
  return container.indexOf(value) > -1;
}

/* harmony default export */ var find_val_in_array_or_string = (findValInArrayOrString);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/helpers/get_size/index.js
function get_size_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { get_size_typeof = function _typeof(obj) { return typeof obj; }; } else { get_size_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return get_size_typeof(obj); }

function getSize(value) {
  if (!value) {
    return 0;
  } else if (typeof value === 'number' && !isNaN(value)) {
    return value;
  } else if (value.hasOwnProperty('length')) {
    return value.length;
  } else if (get_size_typeof(value) === 'object') {
    return Object.keys(value).length;
  } else {
    return 0;
  }
}

;
/* harmony default export */ var get_size = (getSize);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/helpers/is_type/index.js
function is_type_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { is_type_typeof = function _typeof(obj) { return typeof obj; }; } else { is_type_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return is_type_typeof(obj); }

/**
 * Check if value type matches any of provided types
 * Allows checking agains custom type 'array' for array values
 *
 * @example
 * // returns false
 * isType(5, 'string')
 * @example
 * // returns true
 * isType([], 'string', 'array')
 * @param {any} value Value to match
 * @param {...string} types
 * @return {boolean} true if value matches against any type, false otherwise
 */
function isType(value) {
  for (var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    types[_key - 1] = arguments[_key];
  }

  return types.some(function (type) {
    return type === 'array' ? Array.isArray(value) : is_type_typeof(value) === type;
  });
}

/* harmony default export */ var is_type = (isType);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/helpers/reduce_array_to_map/index.js
function reduceArrayToMap(array) {
  return array.reduce(function (acc, val) {
    acc.set(val, true);
    return acc;
  }, new Map());
}

/* harmony default export */ var reduce_array_to_map = (reduceArrayToMap);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/helpers/index.js








// CONCATENATED MODULE: ./src/Enforce/runnables/rules/lang/is_array/index.js


function isArray(value) {
  var expect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  expect_type(expect, 'boolean', 'isArray');
  return is_type(value, 'array') === expect;
}

isArray.negativeForm = 'isNotArray';
/* harmony default export */ var is_array = (isArray);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/lang/is_number/index.js


function isNumber(value) {
  var expect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  expect_type(expect, 'boolean', 'isNumber');
  return is_type(value, 'number') === expect;
}

isNumber.negativeForm = 'isNotNumber';
/* harmony default export */ var is_number = (isNumber);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/lang/is_string/index.js


function isString(value) {
  var expect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  expect_type(expect, 'boolean', 'isString');
  return is_type(value, 'string') === expect;
}

isString.negativeForm = 'isNotString';
/* harmony default export */ var is_string = (isString);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/content/matches/index.js


function matches(value, regex) {
  if (regex instanceof RegExp) {
    return regex.test(value);
  } else if (is_type(regex, 'string')) {
    return new RegExp(regex).test(value);
  } else {
    return false;
  }
}

matches.negativeForm = 'notMatches';
/* harmony default export */ var content_matches = (matches);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/content/inside/index.js


function inside(value, arg1) {
  if (Array.isArray(arg1)) {
    if (is_type(value, 'string', 'number', 'boolean')) {
      return find_val_in_array_or_string(value, arg1);
    }

    if (Array.isArray(value)) {
      return find_array_values_in_array(value, arg1);
    }
  } // both value and arg1 are strings


  if (is_type(arg1, 'string') && is_type(value, 'string')) {
    return find_val_in_array_or_string(value, arg1);
  }

  return false;
}

inside.negativeForm = 'notInside';
/* harmony default export */ var content_inside = (inside);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/content/is_numeric/index.js


function isNumeric(value) {
  var expect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  expect_type(expect, 'boolean', 'isNumeric');
  var result = !isNaN(parseFloat(value)) && !isNaN(Number(value)) && isFinite(value);
  return result === expect;
}

isNumeric.negativeForm = 'isNotNumeric';
/* harmony default export */ var is_numeric = (isNumeric);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/is_empty/index.js


function isEmpty(value) {
  var expect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  expect_type(expect, 'boolean', 'isEmpty');
  return get_size(value) === 0 === expect;
}

;
isEmpty.negativeForm = 'isNotEmpty';
/* harmony default export */ var is_empty = (isEmpty);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/size_equals/index.js


function sizeEquals(value, arg1) {
  return get_size(value) === arg1;
}

sizeEquals.negativeForm = 'sizeNotEquals';
/* harmony default export */ var size_equals = (sizeEquals);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/larger_than/index.js


function largerThan(value, arg1) {
  return get_size(value) > arg1;
}

/* harmony default export */ var larger_than = (largerThan);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/smaller_than/index.js


function smallerThan(value, arg1) {
  return get_size(value) < arg1;
}

/* harmony default export */ var smaller_than = (smallerThan);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/smaller_than_or_equals/index.js


function smallerThanOrEquals(value, arg1) {
  return get_size(value) <= arg1;
}

/* harmony default export */ var smaller_than_or_equals = (smallerThanOrEquals);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/larger_than_or_equals/index.js


function largerThanOrEquals(value, arg1) {
  return get_size(value) >= arg1;
}

/* harmony default export */ var larger_than_or_equals = (largerThanOrEquals);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/greater_than/index.js


function greaterThan(value, arg1) {
  return is_numeric(value) && is_numeric(arg1) && Number(value) > Number(arg1);
}

greaterThan.alias = 'gt';
/* harmony default export */ var greater_than = (greaterThan);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/greater_than_or_equals/index.js


function greaterThanOrEquals(value, arg1) {
  return is_numeric(value) && is_numeric(arg1) && Number(value) >= Number(arg1);
}

greaterThanOrEquals.alias = 'gte';
/* harmony default export */ var greater_than_or_equals = (greaterThanOrEquals);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/less_than/index.js


function lessThan(value, arg1) {
  return is_numeric(value) && is_numeric(arg1) && Number(value) < Number(arg1);
}

lessThan.alias = 'lt';
/* harmony default export */ var less_than = (lessThan);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/less_than_or_equals/index.js


function lessThanOrEquals(value, arg1) {
  return is_numeric(value) && is_numeric(arg1) && Number(value) <= Number(arg1);
}

lessThanOrEquals.alias = 'lte';
/* harmony default export */ var less_than_or_equals = (lessThanOrEquals);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/helpers/extend_rules/index.js
/**
 * Collects rules with `negativeForm` or `alias` attributes.
 * Adds a rule with the correct configuration.
 * @param {Object} rules - enforce rules object
 * @returns {Object} extended rules object
 */
function extendRules(rules) {
  var _loop = function _loop(rule) {
    var negativeForm = rules[rule].negativeForm;
    var alias = rules[rule].alias;

    if (negativeForm) {
      rules[negativeForm] = function () {
        return !rules[rule].apply(rules, arguments);
      };
    }

    if (alias) {
      rules[alias] = rules[rule];
    }
  };

  for (var rule in rules) {
    _loop(rule);
  }

  return rules;
}

/* harmony default export */ var extend_rules = (extendRules);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/index.js

















var rules_rules = {
  isArray: is_array,
  isNumber: is_number,
  isString: is_string,
  matches: content_matches,
  inside: content_inside,
  isNumeric: is_numeric,
  isEmpty: is_empty,
  largerThan: larger_than,
  smallerThan: smaller_than,
  smallerThanOrEquals: smaller_than_or_equals,
  largerThanOrEquals: larger_than_or_equals,
  sizeEquals: size_equals,
  greaterThan: greater_than,
  greaterThanOrEquals: greater_than_or_equals,
  lessThan: less_than,
  lessThanOrEquals: less_than_or_equals
};
/* harmony default export */ var runnables_rules = (extend_rules(rules_rules));
// CONCATENATED MODULE: ./src/Enforce/runnables/index.js



// CONCATENATED MODULE: ./src/Enforce/runners/compound/index.js
function compound_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { compound_typeof = function _typeof(obj) { return typeof obj; }; } else { compound_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return compound_typeof(obj); }

/**
 * Run group of tests using test runner. (e.g. `anyOf`)
 *
 * @param {Object} allRules
 * @param {Function} runner - test runner
 * @param {Any} value
 * @param {Object} tests
 * @return {object} enforce object
 */
function compound(allRules, runner, value, tests) {
  if (typeof runner !== 'function') {
    return;
  }

  if (runner(value, tests, allRules) !== true) {
    throw new Error("[Enforce]: ".concat(runner.name, "  invalid ").concat(compound_typeof(value), " value"));
  }
}

/* harmony default export */ var runners_compound = (compound);
// CONCATENATED MODULE: ./src/Enforce/runners/rule/index.js
function rule_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { rule_typeof = function _typeof(obj) { return typeof obj; }; } else { rule_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return rule_typeof(obj); }

/**
 * Run a single rule against enforced value (e.g. `isNumber()`)
 *
 * @param {Function} rule - rule to run
 * @param {Any} value
 * @param {Array} args list of arguments sent from consumer
 */
function rule(rule, value) {
  if (typeof rule !== 'function') {
    return;
  }

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (rule.apply(void 0, [value].concat(args)) !== true) {
    throw new Error("[Enforce]: ".concat(rule.name, "  invalid ").concat(rule_typeof(value), " value"));
  }
}

/* harmony default export */ var runners_rule = (rule);
// CONCATENATED MODULE: ./src/Enforce/runners/index.js



// EXTERNAL MODULE: ./node_modules/proxy-polyfill/src/proxy.js
var src_proxy = __webpack_require__(0);
var proxy_default = /*#__PURE__*/__webpack_require__.n(src_proxy);

// CONCATENATED MODULE: ./src/Enforce/helpers/safe_proxy.js

var glob = Function('return this')();

function safeProxy(target, handler) {
  if (!glob.Proxy) {
    var ProxyPolyfill = proxy_default()();
    return new ProxyPolyfill(target, handler);
  }

  return new Proxy(target, handler);
}

/* harmony default export */ var safe_proxy = (safeProxy);
// CONCATENATED MODULE: ./src/Enforce/index.js




var Enforce_Enforce = function Enforce() {
  var customRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rules = Object.assign({}, runnables_rules, customRules);
  var allRunnables = Object.assign({}, compounds, rules);

  var enforce = function enforce(value) {
    var proxy = safe_proxy(allRunnables, {
      get: function get(allRunnables, fnName) {
        if (rules.hasOwnProperty(fnName) && typeof rules[fnName] === 'function') {
          return function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            runners_rule.apply(runners_namespaceObject, [rules[fnName], value].concat(args));
            return proxy;
          };
        } else if (compounds.hasOwnProperty(fnName) && typeof compounds[fnName] === 'function') {
          return function (tests) {
            runners_compound(rules, compounds[fnName], value, tests);
            return proxy;
          };
        } else {
          return allRunnables[fnName];
        }
      }
    });
    return proxy;
  };

  return enforce;
};

/* harmony default export */ var src_Enforce = (Enforce_Enforce);
// CONCATENATED MODULE: ./src/validate/index.js
function validate_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { validate_typeof = function _typeof(obj) { return typeof obj; }; } else { validate_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return validate_typeof(obj); }

/**
 * Run tests and catch errors
 *
 * @param {function} callback The test content
 * @return {boolean}
 */
function validate(test) {
  if (typeof test !== 'function' && !(test instanceof Promise)) {
    throw new TypeError("[Validate]: expected ".concat(validate_typeof(test), " to be a function."));
  }

  try {
    return test() !== false;
  } catch (_) {
    return false;
  }
}

/* harmony default export */ var src_validate = (validate);
// EXTERNAL MODULE: ./version.json
var version = __webpack_require__(1);

// CONCATENATED MODULE: ./src/index.js






function passable(name, tests, specific) {
  var suite = new core_Passable(name, tests, specific);
  return suite.res;
}

passable.VERSION = version["a" /* version */];
passable.enforce = new src_Enforce({});
passable.Enforce = src_Enforce;
passable.validate = src_validate;
passable.WARN = WARN;
passable.FAIL = FAIL;
/* harmony default export */ var src = __webpack_exports__["default"] = (passable);

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=passable.js.map