'use strict';

import { expect } from 'chai';
import reduceArrayToObject from './index';
import findArrayValuesInObjectKeys from '../find_array_values_in_object_keys';

const reducedArray = reduceArrayToObject(['one', 'two', 'three']);

describe('reduce array to object helper', () => {

    it('Should generate an object with all array items', () => {
        expect(findArrayValuesInObjectKeys(['one', 'two', 'three'], reducedArray)).to.equal(true);
    });

    it('Should not be larger than original array', () => {
        expect(Object.keys(reducedArray).length).to.equal(3);
    });
});