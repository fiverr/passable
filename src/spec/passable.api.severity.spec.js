'use strict';

import passable from '../Passable.js';
import chai from 'chai';

const expect = chai.expect;

describe('Test warn flag', () => {
    it('Should warn and not fail', () => {
        expect(warnPass).to.deep.equal(warnPassExpected);
    });

    it('Should both warn and fail', () => {
        expect(warnFail).to.deep.equal(warnFailExpected);
    });

    it('Should fail but not warn', () => {
        expect(fail).to.deep.equal(failExpected);
    });
});

// Actual test data

const warnPass = passable('WarnPass', (pass, enforce) => {
        pass('WarnPass', 'should warn', 'warn', () => false);
    }),
    warnFail = passable('WarnFail', (pass, enforce) => {
        pass('Warn', 'should warn', 'warn', () => false);
        pass('Fail', 'should Fail', () => false);
    }),
    fail = passable('Fail', (pass, enforce) => {
        pass('Warn', 'should not warn', 'warn', () => true);
        pass('Fail', 'should Fail', () => false);
    });

const warnPassExpected = {
        name: 'WarnPass',
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
        testCount: 1
    },
    warnFailExpected = {
        name: 'WarnFail',
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
        testCount: 2
    },
    failExpected = {
        name: 'Fail',
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
        testCount: 2
    };