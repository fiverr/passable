import passable, { WARN } from '../index.js';
import { expect } from 'chai';

describe('Test warn flag', () => {
    it('Should mark test with warning', () => {
        expect(warnPass.hasErrors()).to.equal(false);
        expect(warnPass.hasWarnings()).to.equal(true);
    });

    it('Should mark test with both warning and error', () => {
        expect(warnFail.hasErrors()).to.equal(true);
        expect(warnFail.hasWarnings()).to.equal(true);
    });

    it('Should only fail test', () => {
        expect(fail.hasErrors()).to.equal(true);
        expect(fail.hasWarnings()).to.equal(false);
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