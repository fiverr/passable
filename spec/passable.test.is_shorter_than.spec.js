'use strict'

import chai from 'chai';
import isShorterThan from '../src/tests/size/_is_shorter_than';

const expect = chai.expect;

describe('Tests isShorterThan module', () => {

    it('Should return false for an array longer than 5', () => {
        expect(isShorterThan([1,2,3,4,5,6], 5)).to.equal(false);
    });

    it('Should return true for an array shorter than 8', () => {
        expect(isShorterThan([1,2,3,4,5,6], 8)).to.equal(true);
    });

    it('Should return false for a string longer than 3', () => {
        expect(isShorterThan("abcd", 3)).to.equal(false);
    });
});