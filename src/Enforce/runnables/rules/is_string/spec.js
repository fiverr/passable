import { expect } from 'chai';
import isString from './index';

describe('Tests isString rule', () => {

    it('Should return false for a number', () => {
        expect(isString(42)).to.equal(false);
    });

    it('Should return false for an array', () => {
        expect(isString([])).to.equal(false);
    });

    it('Should return true a string', () => {
        expect(isString('I love you')).to.equal(true);
    });

    it('Should expose negativeForm property', () => {
        expect(isString.negativeForm).to.equal('isNotString');
    });
});
