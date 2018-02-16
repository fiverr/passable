'use strict';

import { expect } from 'chai';
import isArray from './index';

describe('Tests isArray rule', () => {

    it('Should return true for an empty array', () => {
        expect(isArray([], true)).to.equal(true);
    });

    it('Should return true for an array with elements', () => {
        expect(isArray([1, 2, 3], true)).to.equal(true);
    });

    it('Should return false a string', () => {
        expect(isArray('1', true)).to.equal(false);
    });

    it('Should return false for an empty array when expecting a negative result', () => {
        expect(isArray([], false)).to.equal(false);
    });

    it('Should return false for an array with elements when expecting a negative result', () => {
        expect(isArray([1, 2, 3], false)).to.equal(false);
    });

    it('Should return true a string when expecting a negative result', () => {
        expect(isArray('1', false)).to.equal(true);
    });
});