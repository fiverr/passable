'use strict';

import { expect } from 'chai';
import isNumber from './index';

describe('Tests isNumber rule', () => {

    it('Should return true for a number', () => {
        expect(isNumber(42, true)).to.equal(true);
    });

    it('Should return true for a NaN', () => {
        expect(isNumber(NaN, true)).to.equal(true);
    });

    it('Should return false a string', () => {
        expect(isNumber('1', true)).to.equal(false);
    });

    it('Should return false an array', () => {
        expect(isNumber([1, 2, 3], true)).to.equal(false);
    });

    it('Should return false for a number when expecting a negative result', () => {
        expect(isNumber(42, false)).to.equal(false);
    });

    it('Should return false for a NaN when expecting a negative result', () => {
        expect(isNumber(NaN, false)).to.equal(false);
    });

    it('Should return false a string when expecting a negative result', () => {
        expect(isNumber('1', false)).to.equal(true);
    });

    it('Should return false an array when expecting a negative result', () => {
        expect(isNumber([1, 2, 3], false)).to.equal(true);
    });
});