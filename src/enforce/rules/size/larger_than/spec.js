'use strict';

import chai from 'chai';
import largerThan from './index';

const expect = chai.expect;

describe('Tests largerThan rule', () => {

    it('Should return true for an array longer than 5', () => {
        expect(largerThan([1, 2, 3, 4, 5, 6], 5)).to.equal(true);
    });

    it('Should return false for an array shorter than 8', () => {
        expect(largerThan([1, 2, 3, 4, 5, 6], 8)).to.equal(false);
    });

    it('Should return true for a string longer than 3', () => {
        expect(largerThan('abcd', 3)).to.equal(true);
    });
});