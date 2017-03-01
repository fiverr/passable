(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Passable", [], factory);
	else if(typeof exports === 'object')
		exports["Passable"] = factory();
	else
		root["Passable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _get_size = __webpack_require__(2);

var _get_size2 = _interopRequireDefault(_get_size);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    getSize: _get_size2.default
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @module enforce
                                                                                                                                                                                                                                                                               */

var _rules = __webpack_require__(3);

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Registers custom rules and exposes an api
 *
 * @param  {Object} custom - An Object containing custom rules
 * @return {Function} the 'enforce' function, which is accessed in the validation proccess
 *
 * @example Enforce({
 *  is_larger_than: (a, b) => a > b;
 * });
 */
var Enforce = function Enforce(custom) {

    var registered = {};

    /** Registers rules and makes them available */
    var register = function register() {
        custom = custom || {};
        Object.assign(registered, (0, _rules2.default)(), custom);
    };

    /** Provides an API for running tests (using registered rules) */
    var enforce = function enforce(value, tests) {

        var isValid = true;
        for (var rule in tests) {

            var expect = true,
                options = tests[rule];

            if (!options) {
                expect = false;
                options = {};
            } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                expect = options.hasOwnProperty('expect') ? options.expect : true;
            } else {
                // options === true
                expect = true;
                options = {};
            }

            var result = run(value, rule, options);

            if (expect !== result) {
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    /** Called by 'enforce' to run tests */
    var run = function run(value, rule, options) {

        if (typeof registered[rule] === "function") {
            return registered[rule](value, options);
        }
    };

    register();

    return enforce;
};

exports.default = Enforce;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getSize = function getSize(value) {

    if (!value) {
        return 0;
    } else if (typeof value === 'number' && !isNaN(value)) {
        return value;
    } else if (value.hasOwnProperty('length')) {
        return value.length;
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        return Object.keys(value).length;
    } else {
        return 0;
    }
};

exports.default = getSize;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _is_array = __webpack_require__(4);

var _is_array2 = _interopRequireDefault(_is_array);

var _is_number = __webpack_require__(5);

var _is_number2 = _interopRequireDefault(_is_number);

var _is_string = __webpack_require__(6);

var _is_string2 = _interopRequireDefault(_is_string);

var _is_empty = __webpack_require__(7);

var _is_empty2 = _interopRequireDefault(_is_empty);

var _size_equals = __webpack_require__(9);

var _size_equals2 = _interopRequireDefault(_size_equals);

var _larger_than = __webpack_require__(8);

var _larger_than2 = _interopRequireDefault(_larger_than);

var _smaller_than = __webpack_require__(10);

var _smaller_than2 = _interopRequireDefault(_smaller_than);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return {
        isArray: _is_array2.default,
        isNumber: _is_number2.default,
        isString: _is_string2.default,
        isEmpty: _is_empty2.default,
        largerThan: _larger_than2.default,
        smallerThan: _smaller_than2.default,
        sizeEquals: _size_equals2.default
    };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isArray = function isArray(value) {
  return Array.isArray(value);
};

exports.default = isArray;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isNumber = function isNumber(value) {
  return typeof value === "number";
};

exports.default = isNumber;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isString = function isString(value) {
  return typeof value === "string";
};

exports.default = isString;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

var isEmpty = function isEmpty(value) {
  return (0, _helpers.getSize)(value) === 0;
};

exports.default = isEmpty;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

var largerThan = function largerThan(value, _ref) {
  var testAgainst = _ref.testAgainst;
  return (0, _helpers.getSize)(value) > (0, _helpers.getSize)(testAgainst);
};

exports.default = largerThan;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

var smallerThan = function smallerThan(value, _ref) {
  var testAgainst = _ref.testAgainst;
  return (0, _helpers.getSize)(value) === (0, _helpers.getSize)(testAgainst);
};

exports.default = smallerThan;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

var smallerThan = function smallerThan(value, _ref) {
  var testAgainst = _ref.testAgainst;
  return (0, _helpers.getSize)(value) < (0, _helpers.getSize)(testAgainst);
};

exports.default = smallerThan;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _enforce = __webpack_require__(1);

var _enforce2 = _interopRequireDefault(_enforce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WARN = 'warn',
    FAIL = 'fail',
    FUNCTION = 'function';

/**
 * Runs a group of validation tests
 *
 * @param  {String}   name   - A name for the group of tests which is being run
 * @param  {function} passes - A function that contains the validation logic
 * @param  {Object}   custom - (optional) Custom rules, extensions for the predefined rules
 * @return validation result
 *
 * @example Passable('UserEdit', (pass, enforce) => {...}, {
 *  is_larger_than: (a, b) => a > b;
 * });
 */
var Passable = function Passable(name, passes, custom) {

    var hasValidationErrors = false,
        hasValidationWarnings = false,
        failCount = 0,
        warnCount = 0,
        testCount = 0,
        success = void 0;

    var testsPerformed = {},
        validationErrors = {},
        validationWarnings = {};

    /**
     * Runs a single test within the validation process
     *
     * @param  {String}   dataName  - A name for the test (unit) which is being run
     * @param  {String}   statement - A description for the test which is being run
     * @param  {String}   severity  - (optional) warn instead of fail (expects 'warn')
     * @param  {Function} callback  - The specific test's validation logic
     * @return {Boolean}  whether the unit is valid or not
     *
     * @example pass('UserName', 'Must be longer than 5 chars', () => {...});
     */
    var pass = function pass(dataName, statement) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
        }

        // callback is always the last argument
        var callback = args.slice(-1)[0];

        var severity = FAIL,
            isValid = void 0;

        if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === FUNCTION) {
            // run the validation logic
            try {
                isValid = callback();
            } catch (e) {
                isValid = false;
            }
        }

        if (typeof args[0] === 'string') {
            // warn rather than fail
            severity = args[0] === WARN ? WARN : FAIL;
        }

        if (!testsPerformed.hasOwnProperty(dataName)) {
            testsPerformed[dataName] = {
                testCount: 0,
                failCount: 0,
                warnCount: 0
            };
        }

        if (!isValid) {
            // on failure/error, bump up the counters
            severity === FAIL ? onError(dataName, statement) : onWarn(dataName, statement);
        }

        // bump overall counters
        testsPerformed[dataName].testCount++;
        testCount++;

        return isValid;
    };

    var done = function done(callback) {
        success = callback(generateResultObject());
    };

    var onError = function onError(dataName, statement) {
        hasValidationErrors = true;
        validationErrors[dataName] = validationErrors[dataName] || [];
        validationErrors[dataName].push(statement);
        failCount++;
        testsPerformed[dataName].failCount++;
    };

    var onWarn = function onWarn(dataName, statement) {
        hasValidationWarnings = true;
        validationWarnings[dataName] = validationWarnings[dataName] || [];
        validationWarnings[dataName].push(statement);
        warnCount++;
        testsPerformed[dataName].warnCount++;
    };

    var generateResultObject = function generateResultObject() {
        var result = {
            name: name,
            hasValidationErrors: hasValidationErrors,
            hasValidationWarnings: hasValidationWarnings,
            testsPerformed: testsPerformed,
            validationErrors: validationErrors,
            validationWarnings: validationWarnings,
            failCount: failCount,
            warnCount: warnCount,
            testCount: testCount
        };

        if (typeof success !== 'undefined') {
            result.success = success;
        }

        return result;
    };

    if ((typeof passes === 'undefined' ? 'undefined' : _typeof(passes)) === FUNCTION) {
        // register all the tests
        var enforce = (0, _enforce2.default)(custom);

        // run all units in the group
        passes(pass, enforce, done);
    }

    return generateResultObject();
};

module.exports = Passable;

/***/ })
/******/ ]);
});
//# sourceMappingURL=Passable.js.map