'use strict';

import passable from '../Passable.js';
import { expect } from 'chai';

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
    it('Should throw a TypeError for a non-string form name', () => {
        expect(passable.bind(null, 1)).to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected number, expected string.");
        expect(passable.bind(null, {})).to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected object, expected string.");
        expect(passable.bind(null, passable)).to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected function, expected string.");
    });

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