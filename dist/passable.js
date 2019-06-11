(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.passable = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var WARN = 'warn';
  var FAIL = 'fail';

  var severities = [WARN, FAIL];

  var passableResult = function passableResult(name) {
    var completionCallbacks = [];
    var asyncObject = null;
    var hasValidationErrors = false;
    var hasValidationWarnings = false;
    var cancelled = false;
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
      hasValidationWarnings = true;
      output.warnings[fieldName] = output.warnings[fieldName] || [];
      output.warnings[fieldName].push(statement);
      output.warnCount++;
      output.testsPerformed[fieldName].warnCount++;
    };
    /**
     * Bumps field's error counts and adds error string
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     */


    var bumpTestError = function bumpTestError(fieldName, statement) {
      hasValidationErrors = true;
      output.errors[fieldName] = output.errors[fieldName] || [];
      output.errors[fieldName].push(statement);
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
        return !cancelled && cb(output);
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
      if (!fieldName) {
        return runCompletionCallbacks();
      }

      if (asyncObject !== null && asyncObject[fieldName]) {
        asyncObject[fieldName].done = true; // run field callbacks set in `after`

        if (asyncObject[fieldName].callbacks) {
          asyncObject[fieldName].callbacks.forEach(function (callback) {
            return !cancelled && callback(output);
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
     * cancels done/after callbacks. They won't invoke when async operations complete
     */


    var cancel = function cancel() {
      cancelled = true;
      return output;
    };
    /**
     * Gets all the errors of a field, or of the whole object
     * @param {string} [fieldName] - The name of the field.
     * @return {Array | Object} The field's errors, or all errors
     */


    var getErrors = function getErrors(fieldName) {
      if (!fieldName) {
        return output.errors;
      }

      if (output.errors[fieldName]) {
        return output.errors[fieldName];
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
        return output.warnings;
      }

      if (output.warnings[fieldName]) {
        return output.warnings[fieldName];
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
        return hasValidationErrors;
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
        return hasValidationWarnings;
      }

      return Boolean(output.getWarnings(fieldName).length);
    };

    var output = {
      name: name,
      failCount: 0,
      warnCount: 0,
      testCount: 0,
      testsPerformed: {},
      errors: {},
      warnings: {},
      skipped: [],
      hasErrors: hasErrors,
      hasWarnings: hasWarnings,
      getErrors: getErrors,
      getWarnings: getWarnings,
      done: done,
      after: after,
      cancel: cancel
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

  var constructorError = function constructorError(name, value, doc) {
    return "[Passable]: failed during suite initialization. Unexpected '".concat(_typeof(value), "' for '").concat(name, "' argument.\n    See: ").concat(doc ? doc : 'https://fiverr.github.io/passable/getting_started/writing_tests.html');
  };
  /**
   * Describes a passable validation suite
   */


  var Passable =
  /**
   * Initializes a validation suite, creates a new passableResult instance and runs pending tests
   */
  function Passable(name, tests, specific) {
    var _this = this;

    _classCallCheck(this, Passable);

    _defineProperty(this, "pending", []);

    _defineProperty(this, "addPendingTest", function (test) {
      return _this.pending.push(test);
    });

    _defineProperty(this, "clearPendingTest", function (test) {
      _this.pending = _this.pending.filter(function (t) {
        return t !== test;
      });
    });

    _defineProperty(this, "hasRemainingPendingTests", function (fieldName) {
      if (!_this.pending.length) {
        return false;
      }

      if (fieldName) {
        return _this.pending.some(function (test) {
          return test.fieldName === fieldName;
        });
      }

      return !!_this.pending.length;
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

      test.fieldName = fieldName;
      test.statement = statement;
      test.severity = severity;
      operation(test);
    });

    _defineProperty(this, "runTest", function (test) {
      var fieldName = test.fieldName,
          statement = test.statement,
          severity = test.severity;
      var isAsync = typeof test.then === 'function';
      var testResult;

      if (isAsync) {
        _this.res.markAsync(fieldName);

        var done = function done() {
          _this.clearPendingTest(test);

          if (!_this.hasRemainingPendingTests(fieldName)) {
            _this.res.markAsDone(fieldName);
          }

          if (!_this.hasRemainingPendingTests()) {
            _this.res.markAsDone();
          }
        };

        var fail = function fail() {
          // order is important here! fail needs to be called before `done`.
          if (_this.pending.includes(test)) {
            _this.res.fail(fieldName, statement, severity);
          }

          done();
        };

        try {
          // $FlowFixMe
          test.then(done, fail);
        } catch (e) {
          fail(test);
        }
      } else {
        try {
          testResult = test();
        } catch (e) {
          testResult = false;
        } // if is async after all


        if (testResult && typeof testResult.then === 'function') {
          testResult.fieldName = fieldName;
          testResult.statement = statement;
          testResult.severity = severity; // $FlowFixMe

          return _this.addPendingTest(testResult);
        } // explicitly false


        if (testResult === false) {
          _this.res.fail(fieldName, statement, severity);
        }

        _this.clearPendingTest(test);
      }

      _this.res.bumpTestCounter(fieldName);
    });

    _defineProperty(this, "runPendingTests", function () {
      _toConsumableArray(_this.pending).forEach(_this.runTest);
    });

    if (typeof name !== 'string') {
      throw new TypeError(constructorError('suite name', name));
    }

    if (typeof tests !== 'function') {
      throw new TypeError(constructorError('tests', tests));
    }

    if (specific && !Specific.is(specific)) {
      throw new TypeError(constructorError('specific', tests, 'https://fiverr.github.io/passable/test/specific.html'));
    }

    this.specific = new Specific(specific);
    this.res = passableResult(name);
    tests(this.test, this.res.output);
    this.runPendingTests();
  };

  function isArray(value) {
    return Boolean(Array.isArray(value));
  }

  isArray.negativeForm = 'isNotArray';

  function isNumber(value) {
    return Boolean(typeof value === 'number');
  }

  isNumber.negativeForm = 'isNotNumber';

  function isString(value) {
    return Boolean(typeof value === 'string');
  }

  isString.negativeForm = 'isNotString';

  function matches(value, regex) {
    if (regex instanceof RegExp) {
      return regex.test(value);
    } else if (typeof regex === 'string') {
      return new RegExp(regex).test(value);
    } else {
      return false;
    }
  }

  matches.negativeForm = 'notMatches';

  function inside(value, arg1) {
    if (Array.isArray(arg1) && ['string', 'number', 'boolean'].includes(_typeof(value))) {
      return arg1.includes(value);
    } // both value and arg1 are strings


    if (typeof arg1 === 'string' && typeof value === 'string') {
      return arg1.includes(value);
    }

    return false;
  }

  inside.negativeForm = 'notInside';

  function equals(value, arg1) {
    return value === arg1;
  }

  equals.negativeForm = 'notEquals';

  function isNumeric(value) {
    var result = !isNaN(parseFloat(value)) && !isNaN(Number(value)) && isFinite(value);
    return Boolean(result);
  }

  isNumeric.negativeForm = 'isNotNumeric';

  function isEmpty(value) {
    if (!value) {
      return true;
    } else if (isNumeric(value)) {
      return value === 0;
    } else if (value.hasOwnProperty('length')) {
      return value.length === 0;
    } else if (_typeof(value) === 'object') {
      return Object.keys(value).length === 0;
    } else {
      return true;
    }
  }
  isEmpty.negativeForm = 'isNotEmpty';

  function greaterThan(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) > Number(arg1);
  }

  greaterThan.alias = 'gt';

  function greaterThanOrEquals(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) >= Number(arg1);
  }

  greaterThanOrEquals.alias = 'gte';

  function lessThan(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) < Number(arg1);
  }

  lessThan.alias = 'lt';

  function lessThanOrEquals(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) <= Number(arg1);
  }

  lessThanOrEquals.alias = 'lte';

  function longerThan(value, arg1) {
    return value.length > arg1;
  }

  function longerThanOrEquals(value, arg1) {
    return value.length >= arg1;
  }

  function shorterThan(value, arg1) {
    return value.length < arg1;
  }

  function shorterThanOrEquals(value, arg1) {
    return value.length <= arg1;
  }

  function lengthEquals(value, arg1) {
    return value.length === arg1;
  }

  lengthEquals.negativeForm = 'lengthNotEquals';

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

  // // 
  var rules = {
    isArray: isArray,
    isNumber: isNumber,
    isString: isString,
    matches: matches,
    inside: inside,
    equals: equals,
    isNumeric: isNumeric,
    isEmpty: isEmpty,
    greaterThan: greaterThan,
    greaterThanOrEquals: greaterThanOrEquals,
    lessThan: lessThan,
    lessThanOrEquals: lessThanOrEquals,
    longerThan: longerThan,
    longerThanOrEquals: longerThanOrEquals,
    shorterThan: shorterThan,
    shorterThanOrEquals: shorterThanOrEquals,
    lengthEquals: lengthEquals
  };
  var rules$1 = extendRules(rules);

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
      throw new Error("[Enforce]: invalid ".concat(_typeof(value), " value"));
    }
  }

  var glob = Function('return this')();

  var isRule = function isRule(rulesObject, name) {
    return rulesObject.hasOwnProperty(name) && typeof rulesObject[name] === 'function';
  };

  var Enforce = function Enforce() {
    var customRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var rulesObject = _objectSpread({}, rules$1, customRules);

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

              rule.apply(void 0, [rules[fnName], value].concat(args));
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

          rule.apply(void 0, [rulesObject[fnName], value].concat(args));
          return allRules;
        };

        return allRules;
      }, {});
    };
  };

  /**
   * Run tests and catch errors
   *
   * @param {function} callback The test content
   * @return {boolean}
   */
  function validate(test) {
    if (typeof test !== 'function' && !(test instanceof Promise)) {
      throw new TypeError("[Validate]: expected ".concat(_typeof(test), " to be a function."));
    }

    try {
      return test() !== false;
    } catch (_) {
      return false;
    }
  }

  function passable(name, tests, specific) {
    var suite = new Passable(name, tests, specific);
    return suite.res.output;
  }

  passable.VERSION = "6.3.5";
  passable.enforce = new Enforce({});
  passable.Enforce = Enforce;
  passable.validate = validate;
  passable.WARN = WARN;
  passable.FAIL = FAIL;

  return passable;

}));
//# sourceMappingURL=passable.js.map
