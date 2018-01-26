'use strict';

import fail from './index';
import ResultObject from '../../index';
import { expect } from 'chai';

describe('Test fail function', () => {

    let testObject;

    beforeEach(() => {
        testObject = new ResultObject('FormName');
        testObject.testsPerformed = {
            f1: {
                failCount: 0,
                warnCount: 0
            }
        };
    });

    it('Should return correct failing object', () => {
        const fail = testObject.fail('f1', 'should fail', 'fail');

        expect(fail).to.deep.equal({
            name: 'FormName',
            testCount: 0,
            failCount: 1,
            warnCount: 0,
            hasValidationErrors: true,
            hasValidationWarnings: false,
            testsPerformed: {
                f1: { failCount: 1, warnCount: 0 }
            },
            validationErrors: { f1: ['should fail'] },
            validationWarnings: {},
            skipped: []
        });
    });

    it('Should return correct warning object', () => {
        const warn = testObject.fail('f1', 'should warn', 'warn');
        expect(warn).to.deep.equal({
            name: 'FormName',
            testCount: 0,
            failCount: 0,
            warnCount: 1,
            hasValidationErrors: false,
            hasValidationWarnings: true,
            testsPerformed: {
                f1: { failCount: 0, warnCount: 1 }
            },
            validationErrors: {},
            validationWarnings: { f1: ['should warn'] },
            skipped: []
        });
    });
});