'use strict';

import passable from '../Passable.js';
import { expect } from 'chai';
import { version } from '../../package.json';

describe('Test passable\'s api misc features ', () => {
    it('Should oultput correct version number', () => {
        expect(passable.VERSION).to.equal(version);
    });
});