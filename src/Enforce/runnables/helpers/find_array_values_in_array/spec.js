import { expect } from 'chai';
import findArrayValuesInArray from './index';

describe('find array values in array helper', () => {

    it('Should indicate a matching array', () => {
        expect(findArrayValuesInArray([1, 2, 3, 4], [5, 4, 3, 2, 1])).to.equal(true);
        expect(findArrayValuesInArray(['a', 'b', 'c'], ['c', 'b', 'a', 'd', 'e'])).to.equal(true);
        expect(findArrayValuesInArray(['a', 'b', 'c'], ['a', 'b', 'c'])).to.equal(true);
        expect(findArrayValuesInArray(['a', 1, 'c'], ['a', 'c', 1])).to.equal(true);
    });

    it('Should indicate non matching arrays', () => {
        expect(findArrayValuesInArray([1, 2, 3, 4], [6, 7, 8, 5])).to.equal(false);
        expect(findArrayValuesInArray(['a', 'b', 'c'], ['c', 'a'])).to.equal(false);
        expect(findArrayValuesInArray(['a', 'b', 1], ['d', 'e', '8'])).to.equal(false);
        expect(findArrayValuesInArray(['a', 1, 'c'], ['n', 'c', 1])).to.equal(false);
    });
});