'use strict';

import chai from 'chai';
import findObjectKeysInArray from './index';

const expect = chai.expect;

describe('find object keys in array helper', () => {

    it('Should indicate a match', () => {
        expect(findObjectKeysInArray({1:1, 2:2, 3:3, 4:4, 5:5}, [1, 2, 3, 4, 5, 6])).to.equal(true);
        expect(findObjectKeysInArray({a:1, b:2, c:3}, ['a', 'b', 'c'])).to.equal(true);
        expect(findObjectKeysInArray({a:1, b:2, c:3, 1:4}, ['a', 1, 'c', 'b'])).to.equal(true);
    });

    it('Should indicate no match', () => {
        expect(findObjectKeysInArray({6:1, 7:2, 8:3}, [1, 2, 3, 4])).to.equal(false);
        expect(findObjectKeysInArray({c:1, a:2}, ['a', 'b'])).to.equal(false);
    });
});