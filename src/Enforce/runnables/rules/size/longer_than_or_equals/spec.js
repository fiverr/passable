'use strict';

import { expect } from 'chai';
import longerThanOrEquals from './index';

describe('Tests longerThanOrEquals rule', () => {

    describe('First argument is array or string', () => {

        describe('When first argument is longer', () => {

            it('Should return true for an array longer than 5', () => {
                expect(longerThanOrEquals([1, 2, 3, 4, 5, 6], 5)).to.equal(true);
            });

            it('Should return true for a string longer than 3', () => {
                expect(longerThanOrEquals('abcd', 3)).to.equal(true);
            });
        });

        describe('When first argument is equal to a given value', () => {

            it('Should return true for an array equal to 5', () => {
                expect(longerThanOrEquals([1, 2, 3, 4, 5], 5)).to.equal(true);
            });

            it('Should return true for a string equal to 3', () => {
                expect(longerThanOrEquals('abc', 3)).to.equal(true);
            });
        });

        describe('When first argument is shorter', () => {

            it('Should return false for an array shorter than 5', () => {
                expect(longerThanOrEquals([1, 2, 3, 4], 5)).to.equal(false);
            });

            it('Should return false for a string shorter than 3', () => {
                expect(longerThanOrEquals('ab', 3)).to.equal(false);
            });
        });
    });

    describe('First argument isn\'t array or string', () => {

        it('Should return undefined', () => {
            expect(() => longerThanOrEquals(undefined, 0)).to.throw(TypeError);
        });
    });
});