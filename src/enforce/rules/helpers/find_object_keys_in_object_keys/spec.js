'use strict';

import chai from 'chai';
import findObjectKeysInObject from './index';

const expect = chai.expect;

describe('find object keys in array helper', () => {

    it('Should indicate a match', () => {
        expect(findObjectKeysInObject({1:1, 5:5}, {1:1, 2:2, 3:3, 4:4, 5:5})).to.equal(true);
        expect(findObjectKeysInObject({a:1, b:2, c:3}, {a:1, b:'a', c:'d'})).to.equal(true);
        expect(findObjectKeysInObject({a:1, b:2, c:3, 1:4}, {a:1, b:2, c:3, 1:4})).to.equal(true);
    });

    it('Should indicate no match', () => {
        expect(findObjectKeysInObject({6:1, 7:2, 8:3}, {5:5})).to.equal(false);
        expect(findObjectKeysInObject({c:1, a:2}, {d:1, b:2, c:3})).to.equal(false);
    });
});