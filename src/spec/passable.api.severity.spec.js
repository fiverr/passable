'use strict';

import passable, { WARN } from '../index.js';
import { expect } from 'chai';

describe('Test warn flag', () => {
    it('Should mark test with warning', () => {
        expect(warnPass).to.deep.equal(warnPassExpected);
    });

    it('Should mark test with both warning and error', () => {
        expect(warnFail).to.deep.equal(warnFailExpected);
    });

    it('Should only fail test', () => {
        expect(fail).to.deep.equal(failExpected);
    });
});

// Actual test data

const warnPass = passable('WarnPass', (test) => {
        test('WarnPass', 'should warn', () => false, WARN);
    }),
    warnFail = passable('WarnFail', (test) => {
        test('Warn', 'should warn', () => false, WARN);
        test('Fail', 'should Fail', () => false);
    }),
    fail = passable('Fail', (test) => {
        test('Warn', 'should not warn', () => true, WARN);
        test('Fail', 'should Fail', () => false);
    });

const warnPassExpected = {
        name: 'WarnPass',
        async: false,
        skipped: [],
        hasValidationErrors: false,
        hasValidationWarnings: true,
        testsPerformed: {
            WarnPass: { testCount: 1, failCount: 0, warnCount: 1 }
        },
        validationErrors: {},
        validationWarnings: { WarnPass: ['should warn'] },
        failCount: 0,
        warnCount: 1,
        testCount: 1,
        completionCallbacks: []
    },
    warnFailExpected = {
        name: 'WarnFail',
        async: false,
        skipped: [],
        hasValidationErrors: true,
        hasValidationWarnings: true,
        testsPerformed: {
            Warn: { testCount: 1, failCount: 0, warnCount: 1 },
            Fail: { testCount: 1, failCount: 1, warnCount: 0 }
        },
        validationErrors: { Fail: ['should Fail'] },
        validationWarnings: { Warn: ['should warn'] },
        failCount: 1,
        warnCount: 1,
        testCount: 2,
        completionCallbacks: []
    },
    failExpected = {
        name: 'Fail',
        async: false,
        skipped: [],
        hasValidationErrors: true,
        hasValidationWarnings: false,
        testsPerformed: {
            Warn: { testCount: 1, failCount: 0, warnCount: 0 },
            Fail: { testCount: 1, failCount: 1, warnCount: 0 }
        },
        validationErrors: { Fail: ['should Fail'] },
        validationWarnings: {},
        failCount: 1,
        warnCount: 0,
        testCount: 2,
        completionCallbacks: []
    };