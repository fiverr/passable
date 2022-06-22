(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.passable = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

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
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var enforce_min = createCommonjsModule(function (module, exports) {

    !function (n, r) {
      module.exports = r() ;
    }(commonjsGlobal, function () {
      function n() {
        return (n = Object.assign || function (n) {
          for (var r = 1; r < arguments.length; r++) {
            var t,
                e = arguments[r];

            for (t in e) {
              Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
            }
          }

          return n;
        }).apply(this, arguments);
      }

      function r(n) {
        return !!Array.isArray(n);
      }

      function t(n) {
        return "number" == typeof n;
      }

      function e(n) {
        return "string" == typeof n;
      }

      function o(n, r) {
        return r instanceof RegExp ? r.test(n) : "string" == typeof r && new RegExp(r).test(n);
      }

      function u(n, r) {
        return !!(Array.isArray(r) && ["string", "number", "boolean"].includes(_typeof(n)) || "string" == typeof r && "string" == typeof n) && r.includes(n);
      }

      function i(n, r) {
        return n === r;
      }

      function a(n) {
        return !(isNaN(parseFloat(n)) || isNaN(Number(n)) || !isFinite(n));
      }

      function f(n, r) {
        return a(n) && a(r) && Number(n) === Number(r);
      }

      function c(n) {
        return !n || (a(n) ? 0 === n : Object.prototype.hasOwnProperty.call(n, "length") ? 0 === n.length : "object" != _typeof(n) || 0 === Object.keys(n).length);
      }

      function s(n, r) {
        return a(n) && a(r) && Number(n) > Number(r);
      }

      function l(n, r) {
        return a(n) && a(r) && Number(n) >= Number(r);
      }

      function y(n, r) {
        return a(n) && a(r) && Number(n) < Number(r);
      }

      function g(n, r) {
        return a(n) && a(r) && Number(n) <= Number(r);
      }

      function p(n, r) {
        return n.length === r;
      }

      function m(n) {
        return !!n;
      }

      function h(n, r) {
        if ("function" == typeof n) {
          for (var t = arguments.length, e = Array(2 < t ? t - 2 : 0), o = 2; o < t; o++) {
            e[o - 2] = arguments[o];
          }

          if (!0 !== n.apply(void 0, [r].concat(e))) throw Error("[Enforce]: invalid " + _typeof(r) + " value");
        }
      }

      function v(r) {
        void 0 === r && (r = {});
        var t = n({}, d, {}, r);
        if ("function" == typeof N.Proxy) return function (n) {
          var r = new Proxy(t, {
            get: function get(t, e) {
              if (b(t, e)) return function () {
                for (var o = arguments.length, u = Array(o), i = 0; i < o; i++) {
                  u[i] = arguments[i];
                }

                return h.apply(void 0, [t[e], n].concat(u)), r;
              };
            }
          });
          return r;
        };
        var e = Object.keys(t);
        return function (r) {
          return e.reduce(function (e, o) {
            var u;
            return n(e, n({}, b(t, o) && ((u = {})[o] = function () {
              for (var n = arguments.length, u = Array(n), i = 0; i < n; i++) {
                u[i] = arguments[i];
              }

              return h.apply(void 0, [t[o], r].concat(u)), e;
            }, u)));
          }, {});
        };
      }

      var b = function b(n, r) {
        return (n = Object.prototype.hasOwnProperty.call(n, r) && "function" == typeof n[r]) || function (n) {
          setTimeout(function () {
            throw Error("[enforce]: " + n);
          });
        }('Rule "' + r + '" was not found in rules object. Make sure you typed it correctly.'), n;
      },
          N = Function("return this")();

      r.negativeForm = "isNotArray", t.negativeForm = "isNotNumber", e.negativeForm = "isNotString", o.negativeForm = "notMatches", u.negativeForm = "notInside", i.negativeForm = "notEquals", a.negativeForm = "isNotNumeric", f.negativeForm = "numberNotEquals", c.negativeForm = "isNotEmpty", s.alias = "gt", l.alias = "gte", y.alias = "lt", g.alias = "lte", p.negativeForm = "lengthNotEquals", m.negativeForm = "isFalsy";

      var d = function (n) {
        var r,
            t = function t(r) {
          var t = n[r].negativeForm,
              e = n[r].alias;
          t && (n[t] = function () {
            return !n[r].apply(n, arguments);
          }), e && (n[e] = n[r]);
        };

        for (r in n) {
          t(r);
        }

        return n;
      }({
        isArray: r,
        isNumber: t,
        isString: e,
        matches: o,
        inside: u,
        equals: i,
        numberEquals: f,
        isNumeric: a,
        isEmpty: c,
        greaterThan: s,
        greaterThanOrEquals: l,
        lessThan: y,
        lessThanOrEquals: g,
        longerThan: function longerThan(n, r) {
          return n.length > r;
        },
        longerThanOrEquals: function longerThanOrEquals(n, r) {
          return n.length >= r;
        },
        shorterThan: function shorterThan(n, r) {
          return n.length < r;
        },
        shorterThanOrEquals: function shorterThanOrEquals(n, r) {
          return n.length <= r;
        },
        lengthEquals: p,
        isOdd: function isOdd(n) {
          return !!a(n) && 0 != n % 2;
        },
        isEven: function isEven(n) {
          return !!a(n) && 0 == n % 2;
        },
        isTruthy: m
      }),
          E = new v();

      return E.Enforce = v, E;
    });
  });

  var any = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
      module.exports = factory() ;
    })(commonjsGlobal, function () {
      /**
       * Accepts a value or a function, and coerces it into a boolean value
       * @param {*|Function} [arg] Any expression or value
       * @return {Boolean}
       */

      var run = function run(arg) {
        if (typeof arg === 'function') {
          try {
            var output = arg();
            return output != false && Boolean(output); // eslint-disable-line
          } catch (err) {
            return false;
          }
        }

        return arg != false && Boolean(arg); // eslint-disable-line
      };
      /**
       * Checks that at least one passed argument evaluates to a truthy value.
       * @param  {[]*} [args] Any amount of values or expressions.
       * @returns {Boolean}
       */


      var any = function any() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return args.some(run);
      };

      return any;
    });
  });

  /**
   * @type {Object} Reference to global object.
   */
  var globalObject = Function('return this')();

  /**
   * @type {String} Passable's major version.
   */
  var PASSABLE_MAJOR = "7.6.0".split('.')[0];
  /**
   * @type {Symbol} Used to store a global instance of Passable.
   */

  var SYMBOL_PASSABLE = Symbol["for"]("PASSABLE#".concat(PASSABLE_MAJOR));

  /**
   * @param  {String[]} versions List of passable versions.
   * @throws {Error}
   */

  var throwMultiplePassableError = function throwMultiplePassableError() {
    for (var _len = arguments.length, versions = new Array(_len), _key = 0; _key < _len; _key++) {
      versions[_key] = arguments[_key];
    }

    throw new Error("[Passable]: Multiple versions of Passable detected: (".concat(versions.join(), ").\n    Most features should work regularly, but for optimal feature compatibility, you should have all running instances use the same version."));
  };
  /**
   * Registers current Passable instance on global object.
   * @param {Function} passable Reference to passable.
   * @return {Function} Global passable reference.
   */


  var register$1 = function register(passable) {
    var existing = globalObject[SYMBOL_PASSABLE];

    if (existing) {
      if (existing.VERSION !== passable.VERSION) {
        setTimeout(function () {
          return throwMultiplePassableError(passable.VERSION, existing.VERSION);
        });
      }
    } else {
      globalObject[SYMBOL_PASSABLE] = passable;
    }

    return globalObject[SYMBOL_PASSABLE];
  };

  var singletonExport = {
    use: function use() {
      return globalObject[SYMBOL_PASSABLE];
    },
    register: register$1
  };

  /**
   * Creates a new context object, and assigns it as a static property on Passable's singleton.
   * @param {Object} parent   Parent context.
   */

  var Context = function Context(parent) {
    singletonExport.use().ctx = this;

    _extends(this, parent);
  };
  /**
   * Clears stored instance from constructor function.
   */


  Context.clear = function () {
    singletonExport.use().ctx = null;
  };

  /**
   * @type {String} Version number derived from current tag.
   */
  var VERSION = "7.6.0";
  /**
   * @type {String} Keyword used for marking non failing tests.
   */

  var WARN = 'warn';
  /**
   * @type {String} Keyword used for marking failing tests.
   */

  var FAIL = 'fail';

  /**
   * Checks that a given argument qualifies as a test function
   * @param {*} testFn
   * @return {Boolean}
   */
  var isTestFn = function isTestFn(testFn) {
    if (!testFn) {
      return false;
    }

    return typeof testFn.then === 'function' || typeof testFn === 'function';
  };

  /**
   * Describes a test call inside a passable suite.
   * @param {Object} ctx                  Parent context.
   * @param {String} fieldName            Name of the field being tested.
   * @param {String} statement            The message returned when failing.
   * @param {Promise|Function} testFn     The actual test callbrack or promise.
   * @param {String} [severity]           Indicates whether the test should fail or warn.
   */
  function TestObject(ctx, fieldName, statement, testFn, severity) {
    _extends(this, {
      ctx: ctx,
      testFn: testFn,
      fieldName: fieldName,
      statement: statement,
      severity: severity,
      failed: false
    });
  }
  /**
   * @returns Current validity status of a test.
   */

  TestObject.prototype.valueOf = function () {
    return this.failed !== true;
  };
  /**
   * Sets a field to failed.
   * @returns {TestObject} Current instance.
   */


  TestObject.prototype.fail = function () {
    this.ctx.result.fail(this.fieldName, this.statement, this.severity);
    this.failed = true;
    return this;
  };
  /**
   * Adds current test to pending list.
   */


  TestObject.prototype.setPending = function () {
    this.ctx.pending.push(this);
  };
  /**
   * Removes test from pending list.
   */


  TestObject.prototype.clearPending = function () {
    var _this = this;

    this.ctx.pending = this.ctx.pending.filter(function (t) {
      return t !== _this;
    });
  };

  /**
   * Run async test.
   * @param {TestObject} testObject A TestObject instance.
   */

  var runAsync = function runAsync(testObject) {
    var fieldName = testObject.fieldName,
        testFn = testObject.testFn,
        statement = testObject.statement,
        ctx = testObject.ctx;
    ctx.result.markAsync(fieldName);

    var done = function done() {
      testObject.clearPending();

      if (!hasRemainingPendingTests(ctx, fieldName)) {
        ctx.result.markAsDone(fieldName);
      }

      if (!hasRemainingPendingTests(ctx)) {
        ctx.result.markAsDone();
      }
    };

    var fail = function fail(rejectionMessage) {
      testObject.statement = typeof rejectionMessage === 'string' ? rejectionMessage : statement;

      if (ctx.pending.includes(testObject)) {
        testObject.fail();
      }

      done();
    };

    try {
      testFn.then(done, fail);
    } catch (e) {
      fail();
    }
  };
  /**
   * Checks if there still are remaining pending tests for given criteria
   * @param {Object} ctx          Parent context
   * @param {String} [fieldName]  Name of the field to test against
   * @return {Boolean}
   */

  var hasRemainingPendingTests = function hasRemainingPendingTests(ctx, fieldName) {
    if (!ctx.pending.length) {
      return false;
    }

    if (fieldName) {
      return ctx.pending.some(function (testObject) {
        return testObject.fieldName === fieldName;
      });
    }

    return !!ctx.pending.length;
  };
  /**
   * Performs "shallow" run over test functions, assuming sync tests only.
   * @param {TestObject} testObject TestObject instance.
   * @return {*} Result from test function
   */


  var preRun = function preRun(testObject) {
    var result;

    try {
      result = testObject.testFn();
    } catch (e) {
      result = false;
    }

    if (result === false) {
      testObject.fail();
    }

    return result;
  };
  /**
   * Registers test, if async - adds to pending array
   * @param {TestObject} testObject   A TestObject Instance.
   */


  var register = function register(testObject) {
    var testFn = testObject.testFn,
        ctx = testObject.ctx,
        fieldName = testObject.fieldName;
    var pending = false;
    var result;

    if (ctx.specific.excludes(fieldName)) {
      ctx.result.addToSkipped(fieldName);
      return;
    }

    ctx.result.initFieldCounters(fieldName);
    ctx.result.bumpTestCounter(fieldName);

    if (testFn && typeof testFn.then === 'function') {
      pending = true;
    } else {
      result = preRun(testObject);
    }

    if (result && typeof result.then === 'function') {
      pending = true;
      testObject.testFn = result;
    }

    if (pending) {
      testObject.setPending();
    }
  };
  /**
   * Test function used by consumer to provide their own validations.
   * @param {String} fieldName            Name of the field to test.
   * @param {String} [statement]          The message returned in case of a failure.
   * @param {function | Promise} testFn   The actual test callback or promise.
   * @param {String} [severity]           Indicates whether the test should fail or warn.
   * @return {TestObject}                 A TestObject instance.
   */


  var test = function test(fieldName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var statement, testFn, severity;

    if (isTestFn(args[0])) {
      testFn = args[0];
      severity = args[1];
    } else if (['string', 'object'].some(function (type) {
      return _typeof(args[0]) === type;
    })) {
      statement = args[0];
      testFn = args[1];
      severity = args[2];
    }

    if (!isTestFn(testFn)) {
      return;
    }

    var testObject = new TestObject(singletonExport.use().ctx, fieldName, statement, testFn, severity || FAIL);
    register(testObject);
    return testObject;
  };

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
  var Specific = /*#__PURE__*/function () {
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
    new Context({
      specific: new Specific(specific),
      result: result,
      pending: pending
    });
    tests(test, result.output);
    Context.clear();
    [].concat(pending).forEach(runAsync);
    return result.output;
  };

  /**
   * @type {String} Error thrown when draft gets called without an active Passable context.
   */
  var ERROR_NO_CONTEXT = '[Passable]: Draft was called outside of the context of a running suite. Please make sure you call it only from your Passable suite.';

  /**
   * @return {Object} Current draft.
   */

  var draft = function draft() {
    var ctx = singletonExport.use().ctx;

    if (ctx) {
      return ctx.result.output;
    }

    setTimeout(function () {
      throw new Error(ERROR_NO_CONTEXT);
    });
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

  passable.VERSION = VERSION;
  passable.enforce = enforce_min;
  passable.draft = draft;
  passable.Enforce = enforce_min.Enforce;
  passable.test = test;
  passable.validate = validate;
  passable.any = any;
  passable.WARN = WARN;
  passable.FAIL = FAIL;
  singletonExport.register(passable);

  return passable;

})));
//# sourceMappingURL=passable.js.map
