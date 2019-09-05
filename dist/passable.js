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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
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

  var Context = function Context() {}; // eslint-disable-line


  Context.prototype.set = function (parent) {
    this.parent = parent;
    return this;
  };

  var context = new Context();

  /**
   * Runs all async tests, updates output object with result
   * @param {Promise} testPromise the actual test callback or promise
   */

  var runAsync = function runAsync(testPromise) {
    var fieldName = testPromise.fieldName,
        statement = testPromise.statement,
        severity = testPromise.severity,
        parent = testPromise.parent;
    parent.result.markAsync(fieldName);

    var done = function done() {
      clearPendingTest(testPromise);

      if (!hasRemainingPendingTests(parent, fieldName)) {
        parent.result.markAsDone(fieldName);
      }

      if (!hasRemainingPendingTests(parent)) {
        parent.result.markAsDone();
      }
    };

    var fail = function fail(customStatement) {
      var failStatement = customStatement || statement;

      if (parent.pending.includes(testPromise)) {
        parent.result.fail(fieldName, failStatement, severity);
      }

      done();
    };

    try {
      testPromise.then(done, fail);
    } catch (e) {
      fail();
    }
  };
  /**
   * Clears pending test from parent context
   * @param {Promise} testPromise the actual test callback or promise
   */

  var clearPendingTest = function clearPendingTest(testPromise) {
    testPromise.parent.pending = testPromise.parent.pending.filter(function (t) {
      return t !== testPromise;
    });
  };
  /**
   * Checks if there still are remaining pending tests for given criteria
   * @param {Object} parent Parent context
   * @param {String} fieldName name of the field to test against
   * @return {Boolean}
   */


  var hasRemainingPendingTests = function hasRemainingPendingTests(parent, fieldName) {
    if (!parent.pending.length) {
      return false;
    }

    if (fieldName) {
      return parent.pending.some(function (testPromise) {
        return testPromise.fieldName === fieldName;
      });
    }

    return !!parent.pending.length;
  };
  /**
   * Performs shallow run over test functions, assuming sync tests only. Returning result
   * @param {function | Promise} testFn the actual test callback or promise
   * @return {*} result from test function
   */


  var preRun = function preRun(testFn) {
    var result;

    try {
      result = testFn();
    } catch (e) {
      result = false;
    }

    if (result === false) {
      testFn.parent.result.fail(testFn.fieldName, testFn.statement, testFn.severity);
    }

    return result;
  };
  /**
   * Registers all supplied tests, if async - adds to pending array
   * @param {function | Promise} testFn the actual test callback or promise
   */


  var register = function register(testFn) {
    var _testFn = testFn,
        parent = _testFn.parent,
        fieldName = _testFn.fieldName;
    var pending = false;
    var result;

    if (parent.specific.excludes(fieldName)) {
      parent.result.addToSkipped(fieldName);
      return;
    }

    parent.result.initFieldCounters(fieldName);
    parent.result.bumpTestCounter(fieldName);

    if (testFn && typeof testFn.then === 'function') {
      pending = true;
    } else {
      result = preRun(testFn);
    }

    if (result && typeof result.then === 'function') {
      pending = true;
      testFn = _extends(result, testFn);
    }

    if (pending) {
      parent.pending.push(testFn);
    }
  };
  /**
   * The function used by the consumer
   * @param {String} fieldName name of the field to test against
   * @param {String} statement the message shown to the user in case of a failure
   * @param {function | Promise} testFn the actual test callback or promise
   * @param {String} Severity indicates whether the test should fail or warn
   */


  var test = function test(fieldName, statement, testFn, severity) {
    if (!testFn) {
      return;
    }

    if (typeof testFn.then === 'function' || typeof testFn === 'function') {
      _extends(testFn, {
        fieldName: fieldName,
        statement: statement,
        severity: severity,
        parent: context.parent
      });

      register(testFn);
    }
  };

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
     * @param {string} fieldName - The name of the field.
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
     * @param {string} fieldName - The name of the field.
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
     * @param {string} fieldName - The name of the field.
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
     * @param {string} fieldName - The name of the field.
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
     * @param {string} fieldName - The name of the field.
     * @return {array | object} The field's errors, or all errors
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
     * @return {array | object} The field's warnings, or all warnings
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
     * @param {string} [fieldName] - The name of the field.
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
      skipped: []
    };
    Object.defineProperties(output, {
      hasErrors: {
        value: hasErrors,
        writable: true,
        configurable: true,
        enumerable: false
      },
      hasWarnings: {
        value: hasWarnings,
        writable: true,
        configurable: true,
        enumerable: false
      },
      getErrors: {
        value: getErrors,
        writable: true,
        configurable: true,
        enumerable: false
      },
      getWarnings: {
        value: getWarnings,
        writable: true,
        configurable: true,
        enumerable: false
      },
      done: {
        value: done,
        writable: true,
        configurable: true,
        enumerable: false
      },
      after: {
        value: after,
        writable: true,
        configurable: true,
        enumerable: false
      },
      cancel: {
        value: cancel,
        writable: true,
        configurable: true,
        enumerable: false
      }
    });
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

  var initError = function initError(name, value, doc) {
    return "[Passable]: failed during suite initialization. Unexpected '".concat(_typeof(value), "' for '").concat(name, "' argument.\n    See: ").concat(doc ? doc : 'https://fiverr.github.io/passable/getting_started/writing_tests.html');
  };

  var passable = function passable(name, tests, specific) {
    if (typeof name !== 'string') {
      throw new TypeError(initError('suite name', name));
    }

    if (typeof tests !== 'function') {
      throw new TypeError(initError('tests', tests));
    }

    if (specific && !Specific.is(specific)) {
      throw new TypeError(initError('specific', tests, 'https://fiverr.github.io/passable/test/specific.html'));
    }

    var result = passableResult(name);
    var pending = [];
    var parent = {
      specific: new Specific(specific),
      result: result,
      pending: pending
    };
    context.set(parent);
    tests(test, result.output);
    context.set(null);
    [].concat(pending).forEach(runAsync);
    return result.output;
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

  /**
   * Runs given functions and returns true if any of them passes
   * @param  {[]Function} args array of assertion functions
   * @return {Function} A function which, when called, invokes all arguments
   */
  var any = function any() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function () {
      return args.some(function (fn) {
        try {
          return fn() !== false;
        } catch (err) {
          return false;
        }
      });
    };
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var enforce_min = createCommonjsModule(function (module, exports) {
    !function (n, e) {
       module.exports = e() ;
    }(commonjsGlobal, function () {

      function n(e) {
        return (n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (n) {
          return _typeof(n);
        } : function (n) {
          return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : _typeof(n);
        })(e);
      }

      function e(n, e, t) {
        return e in n ? Object.defineProperty(n, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : n[e] = t, n;
      }

      function t(n, e) {
        var t = Object.keys(n);

        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(n);
          e && (r = r.filter(function (e) {
            return Object.getOwnPropertyDescriptor(n, e).enumerable;
          })), t.push.apply(t, r);
        }

        return t;
      }

      function r(n) {
        for (var r = 1; r < arguments.length; r++) {
          var o = null != arguments[r] ? arguments[r] : {};
          r % 2 ? t(o, !0).forEach(function (t) {
            e(n, t, o[t]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : t(o).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
        }

        return n;
      }

      var o = function o(n, e) {
        return Object.prototype.hasOwnProperty.call(n, e) && "function" == typeof n[e];
      },
          u = Function("return this")(),
          i = function i() {
        return "function" == typeof u.Proxy;
      };

      function a(n) {
        return Boolean(Array.isArray(n));
      }

      function c(n) {
        return Boolean("number" == typeof n);
      }

      function f(n) {
        return Boolean("string" == typeof n);
      }

      function s(n, e) {
        return e instanceof RegExp ? e.test(n) : "string" == typeof e && new RegExp(e).test(n);
      }

      function l(e, t) {
        return Array.isArray(t) && ["string", "number", "boolean"].includes(n(e)) ? t.includes(e) : "string" == typeof t && "string" == typeof e && t.includes(e);
      }

      function y(n, e) {
        return n === e;
      }

      function p(n) {
        var e = !isNaN(parseFloat(n)) && !isNaN(Number(n)) && isFinite(n);
        return Boolean(e);
      }

      function g(n, e) {
        return p(n) && p(e) && Number(n) === Number(e);
      }

      function b(e) {
        return !e || (p(e) ? 0 === e : Object.prototype.hasOwnProperty.call(e, "length") ? 0 === e.length : "object" !== n(e) || 0 === Object.keys(e).length);
      }

      function m(n, e) {
        return p(n) && p(e) && Number(n) > Number(e);
      }

      function v(n, e) {
        return p(n) && p(e) && Number(n) >= Number(e);
      }

      function h(n, e) {
        return p(n) && p(e) && Number(n) < Number(e);
      }

      function O(n, e) {
        return p(n) && p(e) && Number(n) <= Number(e);
      }

      function N(n, e) {
        return n.length === e;
      }

      a.negativeForm = "isNotArray", c.negativeForm = "isNotNumber", f.negativeForm = "isNotString", s.negativeForm = "notMatches", l.negativeForm = "notInside", y.negativeForm = "notEquals", p.negativeForm = "isNotNumeric", g.negativeForm = "numberNotEquals", b.negativeForm = "isNotEmpty", m.alias = "gt", v.alias = "gte", h.alias = "lt", O.alias = "lte", N.negativeForm = "lengthNotEquals";

      var d = function (n) {
        var e = function e(_e) {
          var t = n[_e].negativeForm,
              r = n[_e].alias;
          t && (n[t] = function () {
            return !n[_e].apply(n, arguments);
          }), r && (n[r] = n[_e]);
        };

        for (var t in n) {
          e(t);
        }

        return n;
      }({
        isArray: a,
        isNumber: c,
        isString: f,
        matches: s,
        inside: l,
        equals: y,
        numberEquals: g,
        isNumeric: p,
        isEmpty: b,
        greaterThan: m,
        greaterThanOrEquals: v,
        lessThan: h,
        lessThanOrEquals: O,
        longerThan: function longerThan(n, e) {
          return n.length > e;
        },
        longerThanOrEquals: function longerThanOrEquals(n, e) {
          return n.length >= e;
        },
        shorterThan: function shorterThan(n, e) {
          return n.length < e;
        },
        shorterThanOrEquals: function shorterThanOrEquals(n, e) {
          return n.length <= e;
        },
        lengthEquals: N,
        isOdd: function isOdd(n) {
          return !!p(n) && n % 2 != 0;
        },
        isEven: function isEven(n) {
          return !!p(n) && n % 2 == 0;
        }
      });

      function E(e, t) {
        if ("function" == typeof e) {
          for (var r = arguments.length, o = new Array(r > 2 ? r - 2 : 0), u = 2; u < r; u++) {
            o[u - 2] = arguments[u];
          }

          if (!0 !== e.apply(void 0, [t].concat(o))) throw new Error("[Enforce]: invalid ".concat(n(t), " value"));
        }
      }

      function j() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = r({}, d, {}, n);
        if (i()) return function (n) {
          var e = new Proxy(t, {
            get: function get(t, r) {
              if (o(t, r)) return function () {
                for (var o = arguments.length, u = new Array(o), i = 0; i < o; i++) {
                  u[i] = arguments[i];
                }

                return E.apply(void 0, [t[r], n].concat(u)), e;
              };
            }
          });
          return e;
        };
        var u = Object.keys(t);
        return function (n) {
          return u.reduce(function (u, i) {
            return _extends(u, r({}, o(t, i) && e({}, i, function () {
              for (var e = arguments.length, r = new Array(e), o = 0; o < e; o++) {
                r[o] = arguments[o];
              }

              return E.apply(void 0, [t[i], n].concat(r)), u;
            })));
          }, {});
        };
      }

      var w = new j();
      return w.Enforce = j, w;
    });
  });

  passable.VERSION = "7.2.4";
  passable.enforce = enforce_min;
  passable.Enforce = enforce_min.Enforce;
  passable.test = test;
  passable.validate = validate;
  passable.any = any;
  passable.WARN = WARN;
  passable.FAIL = FAIL;

  return passable;

}));
//# sourceMappingURL=passable.js.map
