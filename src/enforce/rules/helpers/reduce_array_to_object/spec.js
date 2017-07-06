'use strict';

import chai from 'chai';
import reduceArrayToObject from './index';
import findArrayValuesInObjectKyes from '../find_array_values_in_object_keys';

const expect = chai.expect,
    reducedArray = reduceArrayToObject(['one', 'two', 'three']);

describe('reduce array to object helper', () => {

    it('Should generate an object with all array items', () => {
        expect(findArrayValuesInObjectKyes(['one', 'two', 'three'], reducedArray)).to.equal(true);
    });

    it('Should not be larger than original array', () => {
        expect(Object.keys(reducedArray).length).to.equal(3);
    });
});