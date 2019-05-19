import { expect } from 'chai';
import largerThanOrEquals from './index';

describe('Tests largerThanOrEquals rule', () => {

    it('Should return true for an values larger than a given value', () => {
        expect(largerThanOrEquals([1, 2, 3, 4, 5, 6], 5)).to.equal(true);
        expect(largerThanOrEquals(6, 5)).to.equal(true);
        expect(largerThanOrEquals({a:1, b:2, c:3, d:4, e:5, f:6}, 1)).to.equal(true);
        expect(largerThanOrEquals('ooh wee!', 5)).to.equal(true);
    });

    it('Should return true for an values that equal a given value', () => {
        expect(largerThanOrEquals([1, 2, 3, 4, 5], 5)).to.equal(true);
        expect(largerThanOrEquals(5, 5)).to.equal(true);
        expect(largerThanOrEquals({a:1, b:2, c:3, d:4, e:5}, 5)).to.equal(true);
        expect(largerThanOrEquals('oooh!', 5)).to.equal(true);
    });

    it('Should return false for an values smaller than a given value', () => {
        expect(largerThanOrEquals([1, 2, 3, 4], 5)).to.equal(false);
        expect(largerThanOrEquals(3, [1, 2, 3, 4, 5])).to.equal(false);
        expect(largerThanOrEquals({a:1, b:2}, 'ooh!')).to.equal(false);
        expect(largerThanOrEquals('ooh!', 5)).to.equal(false);
    });
});