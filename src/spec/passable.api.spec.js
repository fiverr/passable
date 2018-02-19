'use strict';

import passable from '../index.js';
import { expect } from 'chai';

const oneValidationError = passable('oneValidationError', null, (test) => {
    test('IsFalse', 'Should Fail', () => false);
    test('IsTrue', 'Should Pass', () => true);
});

const noValidationErrors = passable('noValidationErrors', null, (test) => {
    test('IsTrue', 'Should Pass', () => true);
    test('IsTrue', 'ShouldPass', () => true);
});

const failSecondTest = passable('failSecondTest', null, (test) => {
    test('FirstTest', 'Should Pass ', () => true);
    test('SecondTest', 'Should Fail', () => false);
    test('ThirdTest', 'Should Pass', () => true);
});

describe('Test passable\'s api ', () => {
    it('Should have one validation error', () => {
        expect(oneValidationError.failCount).to.equal(1);
    });

    it('Should perform two tests', () => {
        expect(oneValidationError.testCount).to.equal(2);
    });

    it('Should pass with no validation errors', () => {
        expect(noValidationErrors.failCount).to.equal(0);
    });

    it('Should perform two tests', () => {
        expect(noValidationErrors.testCount).to.equal(2);
    });

    it('Should only fail to validate SecondTest', () => {

        expect(failSecondTest.validationErrors)
            .to.have.all.keys('SecondTest')
            .and.not.have.all.keys('ThirdTest', 'FirstTest');
    });

    it('Should perform three tests', () => {
        expect(failSecondTest.testCount).to.equal(3);
    });
});