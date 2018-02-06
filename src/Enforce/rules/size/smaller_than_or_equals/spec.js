'use strict';

import { expect } from 'chai';
import smallerThanOrEquals from './index';

describe('Tests smallerThanOrEquals rule', () => {

    it('Should return false for an array longer than a given number', () => {
        expect(smallerThanOrEquals([1, 2, 3, 4, 5, 6], 5)).to.equal(false);
    });

    it('Should return true for an array shorter than a given number', () => {
        expect(smallerThanOrEquals([1, 2, 3, 4, 5, 6], 8)).to.equal(true);
    });

    it('Should return true for a number smaller than a given number', () => {
        expect(smallerThanOrEquals(5, 8)).to.equal(true);
    });

    it('Should return true for a number which equals a given number', () => {
        expect(smallerThanOrEquals(8, 8)).to.equal(true);
    });

    it('Should return false for a number lager than a given number', () => {
        expect(smallerThanOrEquals(9, 8)).to.equal(false);
    });

    it('Should return false for a string longer than a given number', () => {
        expect(smallerThanOrEquals('abcd', 3)).to.equal(false);
    });

    it('Should return true for an array in the size of a given number', () => {
        expect(smallerThanOrEquals([1, 2, 3, 4, 5, 6], 6)).to.equal(true);
    });

    it('Should return true for a string in the size of a given number', () => {
        expect(smallerThanOrEquals('abc', 3)).to.equal(true);
    });
});