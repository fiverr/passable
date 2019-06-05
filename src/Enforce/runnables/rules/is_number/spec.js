import { expect } from 'chai';
import isNumber from './index';

describe('Tests isNumber rule', () => {

    it('Should return true for a number', () => {
        expect(isNumber(42)).to.equal(true);
    });

    it('Should return true for a NaN', () => {
        expect(isNumber(NaN)).to.equal(true);
    });

    it('Should return false a string', () => {
        expect(isNumber('1')).to.equal(false);
    });

    it('Should return false an array', () => {
        expect(isNumber([1, 2, 3])).to.equal(false);
    });

    it('Should expose negativeForm property', () => {
        expect(isNumber.negativeForm).to.equal('isNotNumber');
    });
});