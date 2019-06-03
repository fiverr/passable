import { expect } from 'chai';
import rule from './index';

describe('Test rule runner', () => {

    describe('When failing output', () => {
        it('Should throw', () => {
            expect(() => rule((n) => n === 2, 1)).to.throw(Error);
        });
    });

    describe('When passing output', () => {
        it('Should return silently', () => {
            expect(rule((n) => n === 1, 1)).to.equal(undefined);
        });
    });
});