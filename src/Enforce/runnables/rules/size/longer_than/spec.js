'use strict';

import { expect } from 'chai';
import longerThan from './index';

describe('Tests longerThan rule', () => {

    describe('First argument is array or string', () => {

        describe('When first argument is longer', () => {

            it('Should return true for an array longer than 5', () => {
                expect(longerThan([1, 2, 3, 4, 5, 6], 5)).to.equal(true);
            });

            it('Should return true for a string longer than 3', () => {
                expect(longerThan('abcd', 3)).to.equal(true);
            });
        });

        describe('When first argument is shorter', () => {

            it('Should return false for an array shorter than 5', () => {
                expect(longerThan([1, 2, 3, 4], 5)).to.equal(false);
            });

            it('Should return false for a string shorter than 3', () => {
                expect(longerThan('ab', 3)).to.equal(false);
            });
        });

        describe('When first argument is equal to a given value', () => {

            it('Should return false for an array equal to 5', () => {
                expect(longerThan([1, 2, 3, 4, 5], 5)).to.equal(false);
            });

            it('Should return false for a string equal to 3', () => {
                expect(longerThan('abc', 3)).to.equal(false);
            });
        });
    });

    describe('First argument isn\'t array or string', () => {

        it('Should return undefined', () => {
            expect(() => longerThan(undefined, 0)).to.throw(TypeError);
        });
    });
});