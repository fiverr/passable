'use strict'

import Passable from '../src/Passable.js';
import chai from 'chai';

const expect = chai.expect;

describe('Test running specific tests', () => {
    it('Should only run first test', () => {
        const result = SpecificTests(['First']);

        expect(result.skipped).to.deep.equal(['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
        expect(result.testCount).to.equal(1);
    });

    it('Should run Second, Third and Seventh Test', () => {
        const result = SpecificTests(['Second', 'Third', 'Seventh']);

        expect(result.skipped).to.deep.equal(['First', 'Fourth', 'Fifth', 'Sixth']);
        expect(result.testCount).to.equal(3);
    });

    it('Should Not run any test', () => {
        const result = SpecificTests(['IDoNotExist']);

        expect(result.skipped).to.deep.equal(['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
        expect(result.testCount).to.equal(0);
    });

    it('Should run all tests', () => {
        const result = SpecificTests([]);

        expect(result.skipped).to.deep.equal([]);
        expect(result.testCount).to.equal(7);
    });
});


function SpecificTests (specific) {
    return Passable('SpecificTests', specific, (pass, enforce) => {
        pass('First',   'should pass', () => true);
        pass('Second',  'should pass', () => true);
        pass('Third',   'should fail', () => false);
        pass('Fourth',  'should fail', () => false);
        pass('Fifth',   'should fail', () => false);
        pass('Sixth',   'should pass', () => true);
        pass('Seventh', 'should pass', () => true);
    });
};
