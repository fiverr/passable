'use strict';

import chai from 'chai';
import findArrayValuesInObjectKyes from './index';

const expect = chai.expect;

describe('find array values in object keys helper', () => {

    it('Should indicate a match', () => {
        expect(findArrayValuesInObjectKyes([1, 2, 3, 4], {1:1, 2:2, 3:3, 4:4, 5:5})).to.equal(true);
        expect(findArrayValuesInObjectKyes(['a', 'b', 'c'], {a:1, b:2, c:3})).to.equal(true);
        expect(findArrayValuesInObjectKyes(['a', 1, 'c'], {a:1, b:2, c:3, 1:4})).to.equal(true);
    });

    it('Should indicate no match', () => {
        expect(findArrayValuesInObjectKyes([1, 2, 3, 4], {6:1, 7:2, 8:3})).to.equal(false);
        expect(findArrayValuesInObjectKyes(['a', 'b', 'c'], {c:1, a:2})).to.equal(false);
    });
});