'use strict'

import Passable from '../src/Passable.js';
import chai from 'chai';

const expect = chai.expect;

const shouldSucceed = Passable('Success', (pass, enforce, done) =>  {
    done((result) => true);
});

const shouldNotSucceed = Passable('NoSuccess', (pass, enforce, done) =>  {
    done((result) => false);
});

const shouldHaveNoSuccess = Passable('NoSuccessKey', (pass, enforce, done) =>  {
    pass('IsTrue', 'Should Pass', () => true);
});

let testResult;
const shouldHaveAccessToResult = Passable('ShouldHaveAccessToResult', (pass, enforce, done) =>  {
    pass('IsTrue', 'Should Pass', () => true);
    done((result) => {
        testResult = result;
    });
});

describe('Test done callback', () => {

    it('Should have success value of "true"', () => {
        expect(shouldSucceed.success).to.equal(true);
    });

    it('Should have success value of "false"', () => {
        expect(shouldNotSucceed.success).to.equal(false);
    });

    it('Should have the key "success"', () => {
        expect(shouldHaveNoSuccess).to.not.haveOwnProperty('success');
    });

    it('Should have access to test result', () => {
        expect(testResult.testCount).to.equal(1);
        expect(testResult.failCount).to.equal(0);
    });
});