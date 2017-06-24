'use strict';

import passable from '../Passable.js';
import chai from 'chai';

const expect = chai.expect;

const oneValidationError = passable('oneValidationError', (pass, enforce) => {
    pass('IsFalse', 'Should Fail', () => false);
    pass('IsTrue', 'Should Pass', () => true);
});

const noValidationErrors = passable('noValidationErrors', (pass, enforce) => {
    pass('IsTrue', 'Should Pass', () => true);
    pass('IsTrue', 'ShouldPass', () => true);
});

const failSecondTest = passable('failSecondTest', (pass, enforce) => {
    pass('FirstTest', 'Should Pass ', () => true);
    pass('SecondTest', 'Should Fail', () => false);
    pass('ThirdTest', 'Should Pass', () => true);
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