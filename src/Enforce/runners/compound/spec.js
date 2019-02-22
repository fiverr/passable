import compound from './index';
import allOf from '../../runnables/compounds/all_of';
import { expect } from 'chai';

describe('Test Passable\'s enforce - chainable - compounds function', () => {
    const allRules = { isInt: (v) => Number.isInteger(v) };
    const tests = { isInt: true };

    it('Should run passed compound against value and throw when invalid', () => {
        expect(() => compound(allRules, allOf, 't', tests)).to.throw(Error);
    });

    it('Should run passed compound against value and return silently when valid', () => {
        expect(compound(allRules, allOf, 1, tests)).to.equal(undefined);
    });
});