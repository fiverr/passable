'use strict';

import { expect } from 'chai';
import { random } from 'faker';

import shorterThan from './index';

describe('Tests shorterThan rule', () => {

    describe('First argument is array or string', () => {

        describe('When first argument is shorter', () => {

            it('Should return true for an array shorter than 5', () => {
                expect(shorterThan([1, 2, 3, 4], 5)).to.equal(true);
            });

            it('Should return true for a string shorter than 3', () => {
                expect(shorterThan('ab', 3)).to.equal(true);
            });
        });

        describe('When first argument is longer', () => {

            it('Should return false for an array longer than 5', () => {
                expect(shorterThan([1, 2, 3, 4, 5, 6], 5)).to.equal(false);
            });

            it('Should return false for a string longer than 3', () => {
                expect(shorterThan('abcd', 3)).to.equal(false);
            });
        });

        describe('When first argument is equal to a given value', () => {

            it('Should return false for an array equal to 5', () => {
                expect(shorterThan([1, 2, 3, 4, 5], 5)).to.equal(false);
            });

            it('Should return false for a string equal to 3', () => {
                expect(shorterThan('abc', 3)).to.equal(false);
            });
        });
    });

    describe('First argument isn\'t array or string', () => {
        const arg0 = random.number();

        it('Should return undefined', () => {
            expect(shorterThan(arg0, arg0 - 1)).to.be.undefined;
        });
    });
});