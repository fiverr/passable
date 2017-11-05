'use strict';

import { expect } from 'chai';
import sizeEquals from './index';

describe('Tests sizeEquals rule', () => {

    it('Should return true for the same number', () => {
        expect(sizeEquals(5, 5)).to.equal(true);
    });

    it('Should return false for a different number', () => {
        expect(sizeEquals(6, 8)).to.equal(false);
    });
});