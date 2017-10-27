'use strict';

import { expect } from 'chai';
import rules from '../../rules';
import run from './index';

describe('Test Run Function', () => {
    it('Should return false when test is not a function', () => {
        expect(run('emily', 'howell', {}, rules)).to.equal(false);
    });

    it('Should return false when test returns false', () => {
        expect(run('howell', 'largerThan', { largerThan: 7 }, rules)).to.equal(false);
    });

    it('Should return true when test returns true', () => {
        expect(run('cope', 'largerThan', { largerThan: 3 }, rules)).to.equal(true);
    });
});