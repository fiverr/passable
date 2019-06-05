import { expect } from 'chai';
import isEmpty from './index';

describe('Tests isEmpty rule', () => {

    describe('Expect true', () => {
        it('Should return false for a non-empty array', () => {
            expect(isEmpty([1, 2, 3, 4, 5, 6])).to.equal(false);
        });

        it('Should return true for an empty array', () => {
            expect(isEmpty([])).to.equal(true);
        });

        it('Should return false for a non-empty objecd', () => {
            expect(isEmpty({a:1})).to.equal(false);
        });

        it('Should return true for an empty object', () => {
            expect(isEmpty({})).to.equal(true);
        });

        it('Should return true for an empty string', () => {
            expect(isEmpty('')).to.equal(true);
        });

        it('Should return false for a non empty string', () => {
            expect(isEmpty('hey')).to.equal(false);
        });

        it('Should return true for zero', () => {
            expect(isEmpty(0)).to.equal(true);
        });

        it('Should return false for one', () => {
            expect(isEmpty(1)).to.equal(false);
        });

        it('Should return true for undefined', () => {
            expect(isEmpty(undefined)).to.equal(true);
        });

        it('Should return true for null', () => {
            expect(isEmpty(null)).to.equal(true);
        });

        it('Should return true for NaN', () => {
            expect(isEmpty(NaN)).to.equal(true);
        });
    });

    it('Should expose negativeForm property', () => {
        expect(isEmpty.negativeForm).to.equal('isNotEmpty');
    });
});
