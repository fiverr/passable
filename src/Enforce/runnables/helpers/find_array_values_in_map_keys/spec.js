import { expect } from 'chai';
import findArrayValuesInMapKeys from './index';

describe('find array values in object keys helper', () => {

    it('Should indicate a match', () => {
        expect(findArrayValuesInMapKeys([1, 2, 3, 4],
            new Map([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]])
        )).to.equal(true);
        expect(findArrayValuesInMapKeys(['a', 'b', 'c'],
            new Map([['a', 1], ['b', 2], ['c', 3]])
        )).to.equal(true);
        expect(findArrayValuesInMapKeys(['a', 1, 'c'],
            new Map([['a', 1], ['b', 2], ['c', 3], [1, 4]])
        )).to.equal(true);
        expect(findArrayValuesInMapKeys([true, false, 0, null],
            new Map([[null, 1], [false, 2], [true, 3], [0, 4]])
        )).to.equal(true);
    });

    it('Should indicate no match', () => {
        expect(findArrayValuesInMapKeys([1, 2, 3, 4],
            new Map([['6', 1], ['7', 2], ['8', 3]])
        )).to.equal(false);
        expect(findArrayValuesInMapKeys(['a', 'b', 'c'],
            new Map([['c', 1], ['a', 2]]))
        ).to.equal(false);
    });
});