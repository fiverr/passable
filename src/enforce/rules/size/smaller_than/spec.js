'use strict';

import chai from 'chai';
import smallerThan from './index';

const expect = chai.expect;

describe('Tests smallerThan rule', () => {

    it('Should return false for an array longer than a given integer', () => {
        expect(smallerThan([1, 2, 3, 4, 5, 6], 5)).to.equal(false);
    });

    it('Should return true for an array shorter than a given integer', () => {
        expect(smallerThan([1, 2, 3, 4, 5, 6], 8)).to.equal(true);
    });

    it('Should return false for a string longer than a given integer', () => {
        expect(smallerThan('abcd', 3)).to.equal(false);
    });
});