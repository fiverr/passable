'use strict'

import Passable from '../src/Passable.js';
import chai from 'chai';

const expect = chai.expect;


const enforce = new Passable('oneValidationError', function(group, pass) {
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
        expect(enforce.testsPerformed).to.have.deep.property('IsFalse.failCount', 4);
    });

    it('Should pass two times', () => {
        expect(enforce.testsPerformed).to.have.deep.property('IsTrue.testCount', 2);
    });
});