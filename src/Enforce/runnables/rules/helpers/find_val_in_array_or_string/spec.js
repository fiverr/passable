'use strict';

import { expect } from 'chai';
import findValInArrayOrString from './index';

describe('find val in array or string helper', () => {

    it('Should indicate a match', () => {
        expect(findValInArrayOrString('test', 'testing, one two')).to.equal(true);
        expect(findValInArrayOrString(2, ['testing', 'one', 2])).to.equal(true);
        expect(findValInArrayOrString(true, [true, 'dat'])).to.equal(true);
        expect(findValInArrayOrString(false, [true, false])).to.equal(true);
    });

    it('Should indicate no match', () => {
        expect(findValInArrayOrString('test', 'one two')).to.equal(false);
        expect(findValInArrayOrString(2, ['testing', 1, 'two'])).to.equal(false);
        expect(findValInArrayOrString(true, ['true', 'dat'])).to.equal(false);
        expect(findValInArrayOrString(false, [true, 'false'])).to.equal(false);
    });
});