'use strict';

import { expect } from 'chai';
import isString from './index';

describe('Tests isString rule', () => {

    it('Should return false for a number', () => {
        expect(isString(42, true)).to.equal(false);
    });

    it('Should return false for an array', () => {
        expect(isString([], true)).to.equal(false);
    });

    it('Should return true a string', () => {
        expect(isString('I love you', true)).to.equal(true);
    });

    it('Should return true for a number when expecting a negative result', () => {
        expect(isString(42, false)).to.equal(true);
    });

    it('Should return true for an array when expecting a negative result', () => {
        expect(isString([], false)).to.equal(true);
    });

    it('Should return false a string when expecting a negative result', () => {
        expect(isString('I love you', false)).to.equal(false);
    });
});