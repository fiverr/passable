'use strict';

import { expect } from 'chai';
import reduceArrayToMap from './index';
import findArrayValuesInMapKeys from '../find_array_values_in_map_keys';

const reducedArray = reduceArrayToMap(['one', 'two', 'three']);

describe('reduce array to object helper', () => {

    it('Should generate an object with all array items', () => {
        expect(findArrayValuesInMapKeys(['one', 'two', 'three'], reducedArray)).to.equal(true);
    });

    it('Should be smaller than or equal original array in size', () => {
        expect(reducedArray.size).to.equal(3);
    });
});