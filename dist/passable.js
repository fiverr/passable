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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

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


// CONCATENATED MODULE: ./src/constants.js
var WARN = 'warn';
var FAIL = 'fail';
// CONCATENATED MODULE: ./src/core/passableResult/index.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


var severities = [WARN, FAIL];

var passableResult_passableResult = function passableResult(name) {
  var completionCallbacks = [];
  var asyncObject = null;
  /**
   * Initializes specific field's counters
   * @param {string} fieldName - The name of the field.
   */

  var initFieldCounters = function initFieldCounters(fieldName) {
    if (output.testsPerformed[fieldName]) {
      return output;
    }

    output.testsPerformed[fieldName] = {
      testCount: 0,
      failCount: 0,
      warnCount: 0
    };
  };
  /**
   * Bumps test counters to indicate tests that's being performed
   * @param {string} fieldName - The name of the field.
   */


  var bumpTestCounter = function bumpTestCounter(fieldName) {
    if (!output.testsPerformed[fieldName]) {
      return output;
    }

    output.testsPerformed[fieldName].testCount++;
    output.testCount++;
  };
  /**
   * Bumps field's warning counts and adds warning string
   * @param {string} fieldName - The name of the field.
   * @param {string} statement - The error string to add to the object.
   */


  var bumpTestWarning = function bumpTestWarning(fieldName, statement) {
    output.hasValidationWarnings = true;
    output.validationWarnings[fieldName] = output.validationWarnings[fieldName] || [];
    output.validationWarnings[fieldName].push(statement);
    output.warnCount++;
    output.testsPerformed[fieldName].warnCount++;
  };
  /**
   * Bumps field's error counts and adds error string
   * @param {string} fieldName - The name of the field.
   * @param {string} statement - The error string to add to the object.
   */


  var bumpTestError = function bumpTestError(fieldName, statement) {
    output.hasValidationErrors = true;
    output.validationErrors[fieldName] = output.validationErrors[fieldName] || [];
    output.validationErrors[fieldName].push(statement);
    output.failCount++;
    output.testsPerformed[fieldName].failCount++;
  };
  /**
   * Fails a field and updates output accordingly
   * @param {string} fieldName - The name of the field.
   * @param {string} statement - The error string to add to the object.
   * @param {string} severity - Whether it is a `fail` or `warn` test.
   */


  var fail = function fail(fieldName, statement, severity) {
    if (!output.testsPerformed[fieldName]) {
      return output;
    }

    var selectedSeverity = severity && severities.includes(severity) ? severity : FAIL;
    selectedSeverity === WARN ? bumpTestWarning(fieldName, statement) : bumpTestError(fieldName, statement);
  };
  /**
   * Uniquely add a field to the `skipped` list
   * @param {string} fieldName
   */


  var addToSkipped = function addToSkipped(fieldName) {
    !output.skipped.includes(fieldName) && output.skipped.push(fieldName);
  };
  /**
   * Runs completion callbacks aggregated by `done`
   * regardless of success or failure
   */


  var runCompletionCallbacks = function runCompletionCallbacks() {
    completionCallbacks.forEach(function (cb) {
      return cb(output);
    });
  };
  /**
   * Marks a field as async
   * @param {string} fieldName the name of the field marked as async
  */


  var markAsync = function markAsync(fieldName) {
    asyncObject = asyncObject || {};
    asyncObject[fieldName] = asyncObject[fieldName] || {};
    asyncObject[fieldName] = {
      done: false,
      callbacks: asyncObject[fieldName].callbacks || []
    };
  };
  /**
   * Marks an async field as done
   * @param {string} fieldName the name of the field marked as done
  */


  var markAsDone = function markAsDone(fieldName) {
    if (asyncObject !== null && asyncObject[fieldName]) {
      asyncObject[fieldName].done = true; // run field callbacks set in `after`

      if (asyncObject[fieldName].callbacks) {
        asyncObject[fieldName].callbacks.forEach(function (callback) {
          return callback(output);
        });
      }
    }
  };
  /**
   * Registers callback functions to be run when test suite is done running
   * If current suite is not async, runs the callback immediately
   * @param {function} callback the function to be called on done
   * @return {object} output object
   */


  var done = function done(callback) {
    if (typeof callback !== 'function') {
      return output;
    }

    if (!asyncObject) {
      callback(output);
    }

    completionCallbacks.push(callback);
    return output;
  };
  /**
   * Registers callback functions to be run when a certain field is done running
   * If field is not async, runs the callback immediately
   * @param {function} callback the function to be called on done
   * @return {object} output object
   */


  var after = function after(fieldName, callback) {
    if (typeof callback !== 'function') {
      return output;
    }

    asyncObject = asyncObject || {};

    if (!asyncObject[fieldName] && output.testsPerformed[fieldName]) {
      callback(output);
    } else if (asyncObject[fieldName]) {
      asyncObject[fieldName].callbacks = [].concat(_toConsumableArray(asyncObject[fieldName].callbacks || []), [callback]);
    }

    return output;
  };
  /**
   * Gets all the errors of a field, or of the whole object
   * @param {string} [fieldName] - The name of the field.
   * @return {Array | Object} The field's errors, or all errors
   */


  var getErrors = function getErrors(fieldName) {
    if (!fieldName) {
      return output.validationErrors;
    }

    if (output.validationErrors[fieldName]) {
      return output.validationErrors[fieldName];
    }

    return [];
  };
  /**
   * Gets all the warnings of a field, or of the whole object
   * @param {string} [fieldName] - The name of the field.
   * @return {Array | Object} The field's warnings, or all warnings
   */


  var getWarnings = function getWarnings(fieldName) {
    if (!fieldName) {
      return output.validationWarnings;
    }

    if (output.validationWarnings[fieldName]) {
      return output.validationWarnings[fieldName];
    }

    return [];
  };
  /**
   * Checks if a certain field (or the whole suite) has errors
   * @param {string} [fieldName]
   * @return {boolean}
   */


  var hasErrors = function hasErrors(fieldName) {
    if (!fieldName) {
      return output.hasValidationErrors;
    }

    return Boolean(output.getErrors(fieldName).length);
  };
  /**
   * Checks if a certain field (or the whole suite) has warnings
   * @param {string} [fieldName]
   * @return {boolean}
   */


  var hasWarnings = function hasWarnings(fieldName) {
    if (!fieldName) {
      return output.hasValidationWarnings;
    }

    return Boolean(output.getWarnings(fieldName).length);
  };

  var output = {
    name: name,
    hasValidationErrors: false,
    hasValidationWarnings: false,
    failCount: 0,
    warnCount: 0,
    testCount: 0,
    testsPerformed: {},
    validationErrors: {},
    validationWarnings: {},
    skipped: [],
    hasErrors: hasErrors,
    hasWarnings: hasWarnings,
    getErrors: getErrors,
    getWarnings: getWarnings,
    done: done,
    after: after
  };
  return {
    initFieldCounters: initFieldCounters,
    bumpTestError: bumpTestError,
    bumpTestWarning: bumpTestWarning,
    bumpTestCounter: bumpTestCounter,
    fail: fail,
    addToSkipped: addToSkipped,
    runCompletionCallbacks: runCompletionCallbacks,
    markAsync: markAsync,
    markAsDone: markAsDone,
    output: output
  };
};

/* harmony default export */ var core_passableResult = (passableResult_passableResult);
// CONCATENATED MODULE: ./src/core/Specific/index.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    _classCallCheck(this, Specific);

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


  _createClass(Specific, [{
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
 * Initializes a validation suite, creates a new passableResult instance and runs pending tests
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
  this.res = core_passableResult(name);
  tests(this.test, this.res.output);
  this.runPendingTests();
};

/* harmony default export */ var core_Passable = (Passable_Passable);
// CONCATENATED MODULE: ./src/Enforce/runnables/helpers/is_type/index.js
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
// CONCATENATED MODULE: ./src/Enforce/runnables/helpers/expect_type/index.js


function expectType(value, type, functionName) {
  if (!is_type(value, type)) {
    var val = Array.isArray(value) ? JSON.stringify(value) : value;
    throw new TypeError("[Passable]: Failed to execute '".concat(functionName, "': expected ").concat(val, " to be a ").concat(type, "."));
  }

  return true;
}

/* harmony default export */ var expect_type = (expectType);
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
// CONCATENATED MODULE: ./src/Enforce/runnables/helpers/reduce_array_to_map/index.js
function reduceArrayToMap(array) {
  return array.reduce(function (acc, val) {
    acc.set(val, true);
    return acc;
  }, new Map());
}

/* harmony default export */ var reduce_array_to_map = (reduceArrayToMap);
// CONCATENATED MODULE: ./src/Enforce/runnables/helpers/find_array_values_in_map_keys/index.js
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
// CONCATENATED MODULE: ./src/Enforce/runnables/helpers/find_array_values_in_array/index.js



function findArrayValuesInArray(values, array) {
  var reducedArray = reduce_array_to_map(array),
      allItemsFound = find_array_values_in_map_keys(values, reducedArray);
  return allItemsFound;
}

/* harmony default export */ var find_array_values_in_array = (findArrayValuesInArray);
// CONCATENATED MODULE: ./src/Enforce/runnables/helpers/find_val_in_array_or_string/index.js
function findValInArrayOrString(value, container) {
  return container.indexOf(value) > -1;
}

/* harmony default export */ var find_val_in_array_or_string = (findValInArrayOrString);
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
// CONCATENATED MODULE: ./src/Enforce/runnables/helpers/get_size/index.js
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
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/longer_than/index.js
function longerThan(value, arg1) {
  return value.length > arg1;
}

/* harmony default export */ var longer_than = (longerThan);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/longer_than_or_equals/index.js
function longerThanOrEquals(value, arg1) {
  return value.length >= arg1;
}

/* harmony default export */ var longer_than_or_equals = (longerThanOrEquals);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/shorter_than/index.js
function shorterThan(value, arg1) {
  return value.length < arg1;
}

/* harmony default export */ var shorter_than = (shorterThan);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/shorter_than_or_equals/index.js
function shorterThanOrEquals(value, arg1) {
  return value.length <= arg1;
}

/* harmony default export */ var shorter_than_or_equals = (shorterThanOrEquals);
// CONCATENATED MODULE: ./src/Enforce/runnables/rules/size/length_equals/index.js
function lengthEquals(value, arg1) {
  return value.length === arg1;
}

lengthEquals.negativeForm = 'lengthNotEquals';
/* harmony default export */ var length_equals = (lengthEquals);
// CONCATENATED MODULE: ./src/Enforce/runnables/helpers/extend_rules/index.js
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
  lessThanOrEquals: less_than_or_equals,
  longerThan: longer_than,
  longerThanOrEquals: longer_than_or_equals,
  shorterThan: shorter_than,
  shorterThanOrEquals: shorter_than_or_equals,
  lengthEquals: length_equals
};
/* harmony default export */ var runnables_rules = (extend_rules(rules_rules));
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
    throw new Error("[Enforce]: ".concat(rule.name, " invalid ").concat(rule_typeof(value), " value"));
  }
}

/* harmony default export */ var runners_rule = (rule);
// CONCATENATED MODULE: ./src/Enforce/index.js

 // $FlowFixMe

var glob = Function('return this')();

var isRule = function isRule(rulesObject, name) {
  return rulesObject.hasOwnProperty(name) && typeof rulesObject[name] === 'function';
};

var Enforce_Enforce = function Enforce() {
  var customRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rulesObject = Object.assign({}, runnables_rules, customRules);

  if (typeof Proxy === 'function') {
    return function (value) {
      var proxy = new Proxy(rulesObject, {
        get: function get(rules, fnName) {
          if (!isRule(rules, fnName)) {
            return;
          }

          return function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            runners_rule.apply(void 0, [rules[fnName], value].concat(args));
            return proxy;
          };
        }
      });
      return proxy;
    };
  } // This is relatively heavier, and preferably should only be done when lacking proxy support


  return function (value) {
    return Object.keys(rulesObject).reduce(function (allRules, fnName) {
      if (!isRule(rulesObject, fnName)) {
        return allRules;
      }

      allRules[fnName] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        runners_rule.apply(void 0, [rulesObject[fnName], value].concat(args));
        return allRules;
      };

      return allRules;
    }, {});
  };
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
// CONCATENATED MODULE: ./src/index.js





function passable(name, tests, specific) {
  var suite = new core_Passable(name, tests, specific);
  return suite.res.output;
}

passable.VERSION = "6.3.5";
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