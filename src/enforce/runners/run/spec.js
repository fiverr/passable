'use strict';

import { expect } from 'chai';
import rules from '../../rules';
import run from './index';

describe('Test Run Function', () => {
    it('Should return false when test is not a function and not present in rules', () => {
        expect(run('emily', 'howell', {}, rules)).to.equal(false);
    });

    it('Should return false when test returns false', () => {
        expect(run('howell', 'largerThan', { largerThan: 7 }, rules)).to.equal(false);
    });

    it('Should return true when test returns true', () => {
        expect(run('cope', 'largerThan', { largerThan: 3 }, rules)).to.equal(true);
    });

    it('Should correctly evaluate inline function if not present in rules', () => {
        const tests_1 = { isEmily: (value) => value === 'emily' };
        const tests_2 = { isAnArray: (value) => Array.isArray(value) };
        expect(run('emily', 'isEmily', tests_1, rules)).to.equal(true);
        expect(run('howell', 'isEmily', tests_1, rules)).to.equal(false);
        expect(run([], 'isAnArray', tests_2, rules)).to.equal(true);
        expect(run({}, 'isAnArray', tests_2, rules)).to.equal(false);
        expect(run(1, 'isAnArray', tests_2, rules)).to.equal(false);
    });
});