'use strict'

import Passable from '../src/Passable.js';
import chai from 'chai';

const expect = chai.expect;

const oneValidationError = new Passable('oneValidationError', function (group, pass) {
    pass('IsFalse', 'Should Fail', () => false);
    pass('IsTrue', 'Should Pass', () => true);
});

const noValidationErrors = new Passable('noValidationErrors', function (group, pass) {
    pass('IsTrue', 'Should Pass', () => true);
    pass('IsTrue', 'ShouldPass', () => true);
});

const failSecondTest = new Passable('failSecondTest', function (group, pass) {
    pass('FirstTest', 'Should Pass ', () => true);
    pass('SecondTest', 'Should Fail', () => false);
    pass('ThirdTest', 'Should Pass', () => true);
});

describe('Test Passable\'s api ', () => {
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