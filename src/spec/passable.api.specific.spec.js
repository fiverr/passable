'use strict';

import passable from '../Passable.js';
import { expect } from 'chai';

describe('Test running specific tests', () => {
    it('Should only run first test', () => {
        const result = specificTests(['First']);

        expect(result.skipped).to.deep.equal(['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
        expect(result.testCount).to.equal(1);
    });

    it('Should run Second, Third and Seventh Test', () => {
        const result = specificTests(['Second', 'Third', 'Seventh']);

        expect(result.skipped).to.deep.equal(['First', 'Fourth', 'Fifth', 'Sixth']);
        expect(result.testCount).to.equal(3);
    });

    it('Should Not run any test', () => {
        const result = specificTests(['IDoNotExist']);

        expect(result.skipped).to.deep.equal(['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
        expect(result.testCount).to.equal(0);
    });

    it('Should run all tests', () => {
        const result = specificTests([]);

        expect(result.skipped).to.deep.equal([]);
        expect(result.testCount).to.equal(7);
    });
});

function specificTests(specific) {
    return passable('specificTests', specific, (pass, enforce) => {
        pass('First', 'should pass', () => true);
        pass('Second', 'should pass', () => true);
        pass('Third', 'should fail', () => false);
        pass('Fourth', 'should fail', () => false);
        pass('Fifth', 'should fail', () => false);
        pass('Sixth', 'should pass', () => true);
        pass('Seventh', 'should pass', () => true);
    });
};
