'use strict'

import Passable from '../src/Passable.js';
import chai from 'chai';

const expect = chai.expect;

const enforce = new Passable('oneValidationError', function(pass, group) {
    pass('IsFalse', 'Should Fail', () => group.enforce([1, 2, 3], {
        isLongerThan: {
            testAgainst: 4
        }
    }));
    pass('IsFalse', 'Should Fail', () => group.enforce([1, 2, 3], {
        isShorterThan: {
            testAgainst: 2
        }
    }));
    pass('IsFalse', 'Should Fail', () => group.enforce([1, 2, 3], {
        isLongerThan: {
            testAgainst: 4,
            expect: true
        }
    }));
    pass('IsFalse', 'Should Fail', () => group.enforce([1, 2, 3], {
        isShorterThan: {
            testAgainst: 2,
            expect: true
        }
    }));
    pass('IsTrue', 'Should Pass', () => group.enforce([1, 2, 3], {
        isLongerThan: {
            testAgainst: 4,
            expect: false
        }
    }));
    pass('IsTrue', 'Should Pass', () => group.enforce([1, 2, 3], {
        isShorterThan: {
            testAgainst: 2,
            expect: false
        }
    }));
});

describe('Test Passable\'s enforce function', () => {
    it('Should fail four times', () => {
        expect(enforce.testsPerformed.IsFalse.failCount).to.equal(4);
        expect(enforce.testsPerformed.IsFalse.testCount).to.equal(4);
    });

    it('Should pass two times', () => {
        expect(enforce.testsPerformed.IsTrue.testCount).to.equal(2);
        expect(enforce.testsPerformed.IsTrue.failCount).to.equal(0);
    });
});