import { expect } from 'chai';
import getSize from './index';

describe('Tests getSize helper', () => {

    it('Should return the given integer', () => {
        expect(getSize(6)).to.equal(6);
    });

    it('Should return a length of a string (3)', () => {
        expect(getSize('abc')).to.equal(3);
    });

    it('Should return the length of an array (4)', () => {
        expect(getSize([1, 2, 3, 4])).to.equal(4);
    });

    it('Should return the length of an empty array (0)', () => {
        expect(getSize([])).to.equal(0);
    });

    it('Should return the size of an object (2)', () => {
        expect(getSize({a: 1, b:2})).to.equal(2);
    });

    it('Should return the size of an empty object (0)', () => {
        expect(getSize({})).to.equal(0);
    });

    it('Should return 0 for a non enumerable', () => {
        expect(getSize(true)).to.equal(0);
    });

    it('Should return 0 for an undefined value', () => {
        expect(getSize(undefined)).to.equal(0);
    });

    it('Should return 0 for null value', () => {
        expect(getSize(null)).to.equal(0);
    });
});